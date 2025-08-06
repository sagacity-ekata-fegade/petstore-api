
console.log('🟢 Server starting...');
const express = require('express');          
const app = express();     
app.use(express.json());                 

const { getPet, getAllPets, createPet,deletePet, updatePet  } = require('./helper.js'); 


app.get('/petstore', (req, res) => {
  res.send('ok');
});

app.get('/petstore/pet', async (req, res) => {
   
  try {
    const pets = await getAllPets();  
    res.json(pets);
  } catch (error) {
    console.error('Error fetching pets:', error);
    res.status(500).json({
      message: 'Something went wrong',
      error: error.message
    });
  }
});

// 👇 New route to get a pet by ID
app.get('/petstore/pet/:id', async (req, res) => {
  const petId = req.params.id;  // Get pet ID from the URL

  try {
    const pet = await getPet(petId);  // Calling the function to get the pet from database

    if (!pet) {
      
      return res.status(404).json({ message: 'Pet not found' });
    }

   res.json(pet);

  } catch (error) {
    
    console.error('Error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});
app.post('/petstore/pet', async (req, res) => {
  const petData = req.body; 

  try {
   
    if (!petData.name || !petData.type || !petData.age || !petData.breed) {
      return res.status(400).json({ message: 'Missing pet data fields' });
    }

    const newPet = await createPet(petData);
    res.status(201).json(newPet);

  } catch (error) {
    console.error('Error creating pet:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

app.delete('/petstore/:id', async (req, res) => {
  const petId = req.params.id;
  try {
    const deleted = await deletePet(petId);
    res.json({ message: 'Pet deleted successfully', deleted });
  } catch (error) {
    console.error('Error deleting pet:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

app.put('/petstore/:id', async (req, res) => {
  const petId = req.params.id;
  const updateData = req.body;

  try {
    const updated = await updatePet(petId, updateData);
    res.json({ message: 'Pet updated successfully', updated });
  } catch (error) {
    console.error('Error updating pet:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});

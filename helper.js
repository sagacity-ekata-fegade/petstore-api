// petService.js
const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();


async function getPet(id) {
  return prisma.pet.findUnique({
    where: { id: Number(id) },
  });
}
async function getAllPets() {
  
  return prisma.pet.findMany();  // Returns array of all pets
}

async function createPet(data) {
  return prisma.pet.create({
    data,
  });
}
async function deletePet(id) {
  return prisma.pet.delete({
    where: { id: Number(id) },
  });
}


async function updatePet(id, data) {
  return prisma.pet.update({
    where: { id: Number(id) },
    data,
  });
}

module.exports = { getPet, getAllPets, createPet, deletePet, updatePet };

const { PrismaClient } = require("@prisma/client");
const data = require("./data");
const prisma = new PrismaClient();

const load = async () => {
  try {
    await prisma.THICKNESS.deleteMany();
    await prisma.TEST_POINT.deleteMany();
    await prisma.CML.deleteMany(); 
    await prisma.INFO.deleteMany();

    await prisma.INFO.createMany({ data: data.INFO });
    await prisma.CML.createMany({ data: data.CML });
    await prisma.TEST_POINT.createMany({ data: data.TEST_POINT });
    await prisma.THICKNESS.createMany({ data: data.THICKNESS });

    console.log("All data successfully inserted!");
  } catch (e) {
    console.error("Error loading data:", e);
  } finally {
    await prisma.$disconnect();
  }
};

load();

import {
  describe,
  expect,
  it,
  afterAll,
  beforeAll,
  beforeEach,
  afterEach,
} from "@jest/globals";
import prisma from "../../src/config/prisma.js";

describe("Prisma client", () => {
  beforeAll(async () => {
    await prisma.order.deleteMany();
  });

  it("connects to the database", async () => {
    await prisma.order.create({
      data: {
        customer: "Mamadou Diallo",
        items: {
          create: [
            { article: "Clavier mecanique", qty: 1, price: 45.5 },
            { article: "Souris sans fil", qty: 2, price: 18.99 },
          ],
        },
        total: 200.0,
      },
    });
    await prisma.order.create({
      data: {
        customer: "Mamadou Diallo",
        items: {
          create: [
            { article: "Clavier mecanique", qty: 1, price: 45.5 },
            { article: "Souris sans fil", qty: 2, price: 18.99 },
          ],
        },
        total: 200.0,
      },
    });
    const nbrOrders = await prisma.order.count();
    expect(nbrOrders).toBeGreaterThan(1);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});

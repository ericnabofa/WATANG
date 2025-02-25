import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// ✅ Create a new product
router.post('/', async (req, res) => {
  try {
    const { name, categoryId, brandId, flavorId, volumeId, packSizeId, price, stock } = req.body;
    
    const newProduct = await prisma.product.create({
      data: { name, categoryId, brandId, flavorId, volumeId, packSizeId, price, stock },
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// ✅ Get all products (Fix: Explicitly select name, price, and stock)
router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        stock: true,
        category: { select: { id: true, name: true } },
        brand: { select: { id: true, name: true } },
        flavor: { select: { id: true, name: true } },
        volume: { select: { id: true, name: true } },
        packSize: { select: { id: true, name: true } },
      },
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// ✅ Get a single product by ID (Fix: Explicitly select name, price, and stock)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        price: true,
        stock: true,
        category: { select: { id: true, name: true } },
        brand: { select: { id: true, name: true } },
        flavor: { select: { id: true, name: true } },
        volume: { select: { id: true, name: true } },
        packSize: { select: { id: true, name: true } },
      },
    });

    if (!product) return res.status(404).json({ error: 'Product not found' });

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// ✅ Update a product by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, categoryId, brandId, flavorId, volumeId, packSizeId, price, stock } = req.body;

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { name, categoryId, brandId, flavorId, volumeId, packSizeId, price, stock },
    });

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// ✅ Delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({ where: { id } });

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default router;
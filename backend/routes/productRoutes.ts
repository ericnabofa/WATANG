import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// ✅ Create a new product
router.post('/', async (req, res) => {
  try {
    const { name, categoryId, brandId, flavorId, volumeId, packSizeId, price, stock } = req.body;

    const data: any = {
      name,
      price: Number(price),
      stock: Number(stock),
    };

    if (categoryId !== undefined) data.categoryId = Number(categoryId);
    if (brandId !== undefined) data.brandId = Number(brandId);
    if (flavorId !== undefined) data.flavorId = Number(flavorId);
    if (volumeId !== undefined) data.volumeId = Number(volumeId);
    if (packSizeId !== undefined) data.packSizeId = Number(packSizeId);

    const newProduct = await prisma.product.create({ data });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// ✅ Get all products with filtering, sorting, searching, and pagination
router.get('/', async (req, res) => {
  try {
    const { search, categoryId, brandId, flavorId, volumeId, packSizeId, sort, page, limit } = req.query;

    const whereClause: any = {};

    // Search by product name (case-insensitive)
    if (search) {
      whereClause.name = { contains: search as string, mode: "insensitive" };
    }

    // Filtering by category, brand, flavor, volume, packSize
    if (categoryId) whereClause.categoryId = Number(categoryId);
    if (brandId) whereClause.brandId = Number(brandId);
    if (flavorId) whereClause.flavorId = Number(flavorId);
    if (volumeId) whereClause.volumeId = Number(volumeId);
    if (packSizeId) whereClause.packSizeId = Number(packSizeId);

    // Validate sorting options
    const validSortOptions = ["price-asc", "price-desc", "name-asc", "name-desc"];
    const sortOption = validSortOptions.includes(sort as string) ? sort : undefined;

    // Sorting logic
    let orderBy: any = {};
    if (sortOption === "price-asc") orderBy = { price: "asc" };
    if (sortOption === "price-desc") orderBy = { price: "desc" };
    if (sortOption === "name-asc") orderBy = { name: "asc" };
    if (sortOption === "name-desc") orderBy = { name: "desc" };

    // Pagination
    const pageNumber = Math.max(Number(page) || 1, 1); // Ensure page is at least 1
    const pageSize = Math.max(Number(limit) || 10, 1); // Default to 10 per page
    const skip = (pageNumber - 1) * pageSize;

    // Fetch filtered, sorted, and paginated products
    const products = await prisma.product.findMany({
      where: {
        name: search ? { contains: search as string, mode: 'insensitive' } : undefined,
        categoryId: categoryId ? Number(categoryId) : undefined,
        brandId: brandId ? Number(brandId) : undefined,
        flavorId: flavorId ? Number(flavorId) : undefined,
        volumeId: volumeId ? Number(volumeId) : undefined,
        packSizeId: packSizeId ? Number(packSizeId) : undefined,
      },
      orderBy,
      skip,
      take: pageSize,
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

    const totalProducts = await prisma.product.count({ where: whereClause });
    
    res.json({
      totalProducts: totalProducts,
      currentPage: pageNumber,
      pageSize,
      totalPages: Math.ceil(totalProducts / pageSize),
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// ✅ Get a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
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
      where: { id: Number(id) },
      data: {
        name,
        ...(categoryId ? { categoryId: Number(categoryId) } : {}),
        ...(brandId ? { brandId: Number(brandId) } : {}),
        ...(flavorId ? { flavorId: Number(flavorId) } : {}),
        ...(volumeId ? { volumeId: Number(volumeId) } : {}),
        ...(packSizeId ? { packSizeId: Number(packSizeId) } : {}),
        price: Number(price),
        stock: Number(stock),
      },
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
    const product = await prisma.product.findUnique({ where: { id: Number(id) } });

    if (!product) return res.status(404).json({ error: 'Product not found' });

    await prisma.product.delete({ where: { id: Number(id) } });

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default router;

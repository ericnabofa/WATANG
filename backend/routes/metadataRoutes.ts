import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

/**
 * Generic function to create CRUD routes for a given model.
 */
const createRoutes = (modelName: string, model: any) => {
  // Create an entry
  router.post(`/${modelName}s`, async (req, res) => {
    try {
      const { name } = req.body;
      const newEntry = await model.create({ data: { name } });
      res.status(201).json(newEntry);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

  // Get all entries
  router.get(`/${modelName}s`, async (req, res) => {
    try {
      const entries = await model.findMany();
      res.json(entries);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

  // Get an entry by ID
  router.get(`/${modelName}s/:id`, async (req, res) => {
    try {
      const { id } = req.params;
      const entry = await model.findUnique({ where: { id: Number(id) } });

      if (!entry) return res.status(404).json({ error: 'Entry not found' });

      res.json(entry);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

  // Update an entry by ID
  router.put(`/${modelName}s/:id`, async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const updatedEntry = await model.update({
        where: { id: Number(id) },
        data: { name },
      });

      res.json(updatedEntry);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

  // Delete an entry by ID
  router.delete(`/${modelName}s/:id`, async (req, res) => {
    try {
      const { id } = req.params;
      await model.delete({ where: { id: Number(id) } });

      res.json({ message: 'Entry deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
};

// Create routes for each model
createRoutes('category', prisma.category);
createRoutes('brand', prisma.brand);
createRoutes('flavor', prisma.flavor);
createRoutes('volume', prisma.volume);
createRoutes('packsize', prisma.packSize);

export default router;

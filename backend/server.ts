import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes';
import metadataRoutes from './routes/metadataRoutes';

// Load environment variables
dotenv.config(); // Let Render handle environment config via its dashboard

const app = express();

// Middleware
app.use(express.json());

app.use(cors({
  origin: ['https://watang.vercel.app', 'http://localhost:5173'], // include both dev + prod
}));

// Routes
app.use('/products', productRoutes);
app.use('/api/metadata', metadataRoutes);

// Health check
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World from Wata Backend');
});
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

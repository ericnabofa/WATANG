import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes';
import metadataRoutes from './routes/metadataRoutes';

// Load appropriate env file based on NODE_ENV
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.prod' });
} else {
  dotenv.config({ path: '.env.dev' });
}

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://185.113.249.229:5173', // ✅ Adjust as needed
}));

// Routes
app.use('/products', productRoutes);
app.use('/api/metadata', metadataRoutes);

// Health check
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

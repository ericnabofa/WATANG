import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes';
import metadataRoutes from './routes/metadataRoutes';

// Load appropriate env file based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev';
dotenv.config({ path: envFile });

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
app.get('/', (req, res) => {
  res.send('Hello from WataNG Backend!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

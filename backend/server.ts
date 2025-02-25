import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes'; // ✅ Ensure correct import

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ✅ Mount Routes
app.use('/products', productRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('Hello from WataNG Backend!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

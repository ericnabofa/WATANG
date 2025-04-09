import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes'; // ✅ Ensure correct import
import metadataRoutes from './routes/metadataRoutes';


const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://185.113.249.229/:3000', // Replace with the frontend URL or IP
}));

// ✅ Mount Routes
app.use('/products', productRoutes);
app.use('/api/metadata', metadataRoutes);


// Sample route
app.get('/', (req, res) => {
  res.send('Hello from WataNG Backend!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

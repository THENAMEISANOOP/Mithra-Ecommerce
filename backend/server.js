import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js'; 
import cartRouter from './routes/cartRoute.js';


// app configuration
const app = express();
const PORT = process.env.PORT || 5001;
connectDB();   
connectCloudinary();

// middleware
app.use(cors());
app.use(express.json());

// api endpoints
app.use('/api/user',userRouter);
app.use('/api/product', productRouter); 
app.use('/api/cart',cartRouter)


app.get('/', (req, res) => {
  res.send('api is running');
});

// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import { log } from 'console';
import userRouter from './interfaces/routes/userRoute';
import adminRouter from './interfaces/routes/adminRoute';
import connectDB from './infrastructure/config/db';
import cors from 'cors'

connectDB();


const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true,
  
  };
  
  app.use(cors(corsOptions));
  app.use(express.json());




app.use('/api',userRouter)
app.use('/admin',adminRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
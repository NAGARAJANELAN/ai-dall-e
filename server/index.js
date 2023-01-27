import express from "express";
import * as dotenv from 'dotenv';
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'
import cors from 'cors';
import connectDB from "./mongodb/connect.js";

dotenv.config();

const app=express();
app.use(cors());
app.use(express.json({limit:'50mb'}));


app.use('/api/v1/dalle',dalleRoutes);
app.use('/api/v1/post',postRoutes);

app.get('/',(req,res)=>{
    res.send("yo from server");
});

const server=async ()=>{
    try {
        connectDB(process.env.MONGODB_URL);
        console.log("seemms")
    } catch (error) {
        console.log(error);
    }
    app.listen(8090,()=>console.log('on 8090'))
}

server();
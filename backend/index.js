import express from 'express';
import mongoose from 'mongoose';
import { Book } from '../backend/models/bookModel.js';
import bookRoute from '../backend/routes/bookRoute.js';
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-type']
}));

mongoose.connect('mongodb+srv://mridulagn123:Dauntless1234@cluster0.1anp1bv.mongodb.net/books-collection?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log('Connected to MongoDB');
    app.listen(5555,()=>{
        console.log("App is listening at port: ", 5555);
    });
})
.catch(err => console.error('Could not connect to MongoDB', err));

// This is for testing your connection
app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use('/books', bookRoute);
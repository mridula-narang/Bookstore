import express from 'express';
import mongoose from 'mongoose';
import { Book } from '../backend/models/bookModel.js';
import bookRoute from '../backend/routes/bookRoute.js';
import cors from 'cors';

// Initialize the express application
const app = express();
app.use(express.json());

// Updated CORS Configuration
const allowedOrigins = ['https://bookstore-8jrk.onrender.com', 'http://localhost:5173'];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

// Connect to MongoDB
mongoose.connect('mongodb+srv://mridulagn123:Dauntless1234@cluster0.1anp1bv.mongodb.net/books-collection?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(5555, () => {
            console.log("App is listening at port:", 5555);
        });
    })
    .catch(err => console.error('Could not connect to MongoDB', err));

// Test endpoint
app.get('/', (req, res) => {
    res.send("Hello World");
});

// Book Routes
app.use('/books', bookRoute);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
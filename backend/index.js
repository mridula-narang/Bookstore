import express from 'express';
import mongoose from 'mongoose';
import { Book } from '../backend/models/bookModel.js';

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://mridulagn123:Dauntless1234@cluster0.1anp1bv.mongodb.net/books-collection?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log('Connected to MongoDB');
    app.listen(3000,()=>{
        console.log("App is listening at port: ", 3000);
    });
})
.catch(err => console.error('Could not connect to MongoDB', err));

// This is for testing your connection
app.get('/', (req, res) => {
    res.send("Hello World");
});

app.post('/books', async (req, res) => {
    // console.log("POST /books route hit");
    try {
        const { title, author, publishYear } = req.body;
        if (!title || !author || !publishYear) {
            return res.status(400).send({ message: "Please fill all the fields" });
        }
        const newBook = new Book({ title, author, publishYear });
        const book = await Book.create(newBook);
        res.status(201).send(book);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

app.get('/books',async (req,res)=>{
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count:books.length,
            data:books
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });   
    }
});

app.get('/books/:id',async (req,res)=>{
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        return res.status(200).json({book});
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });   
    }
});

app.put('/books/:id', async (req, res) => {
    try {
        const { title, author, publishYear } = req.body; // Destructure from req.body
        if (!title || !author || !publishYear) {
            return res.status(400).send({ message: "Please fill all the fields" });
        }

        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, { title, author, publishYear }, { new: true });
        if (!result) {
            return res.status(404).send({ message: "Book not found" });
        }

        return res.status(200).json({ message: "Book updated successfully", data: result });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

app.delete('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send({ message: "Book not found" });
        }
        return res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});


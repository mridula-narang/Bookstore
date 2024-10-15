import express from 'express';
import {Book} from '../models/bookModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
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

router.get('/',async (req,res)=>{
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

router.get('/:id',async (req,res)=>{
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        return res.status(200).json({book});
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });   
    }
});

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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

export default router;
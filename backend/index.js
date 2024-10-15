import express from 'express';
import mongoose from 'mongoose';
const app = express();

mongoose.connect('mongodb+srv://mridulagn123:Dauntless1234@cluster0.1anp1bv.mongodb.net/books-collection?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log('Connected to MongoDB')
    app.listen(3000,()=>{
        console.log("App is listening at port: ",3000 );
    });
})
.catch(err=>console.error('Could not connect to MongoDB',err));

app.get('/',(req,res)=>{
    res.send("Hello World");
});


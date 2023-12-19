import express from 'express';
const app = express();
const port = 3000;


import { Schema } from 'mongoose';
import mongoose from "mongoose";

//connecting to mongo db
// const CONNECTION_URL = " mongodb+srv://ankitverma3490:7693803028@cluster0.u5ohfss.mongodb.net/?retryWrites=true&w=majority";
// mongoose.connect(CONNECTION_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log('Mongo has connected succesfully')
// }).catch((error) => { console.log(error) })

import { MongoClient, ServerApiVersion }  from 'mongodb';
const uri = "mongodb+srv://ankitverma3490:7693803028@cluster0.u5ohfss.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


// Define the User schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // You can add more email validation if needed
    },
    batch: {
        type: String,
        required: true,
        enum: ['6-7AM', '7-8AM', '8-9AM', '5-6PM'],
    },
    // Add more fields as needed for your application
});
const User = mongoose.model('User', userSchema);


app.patch('/payment', (req, res) => {
    const response = CompletePayment();
    res.json({ success: true, message: response });
});

// Mock function to simulate payment
function CompletePayment() {
    return "payemnt succesfull";
}

//adding user to database,

app.post('/api/users', async (req, res) => {
    try {
        const { name, age, email, batch } = req.body;

        // Create a new user instance
        const newUser = User({
            name,
            age,
            email,
            batch,
            // Add other fields as needed
        });
        // Basic validation (you can add more based on your requirements)
        if (age < 18 || age > 65) {
            res.json({ success: false, message: 'age.' });
        }
        // Save the user to the database
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


// Start the server
app.listen(port, () => {
    console.log('Server is running on port ${port}');
});
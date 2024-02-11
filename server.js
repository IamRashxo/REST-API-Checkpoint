const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

//connection to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUr1Parser: true, useUnifiedTopology: true});

//middleware to parse JSON requests
app.use(express.json());

//Routes
app.use('/users', async(req, res) => {
    try {
        const users = await User.findById();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    
    }
});

app.post('/users', async(req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/users/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        res.json(deletedUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//start the server
app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');

})

require('dotenv').config();

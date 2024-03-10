const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path'); 

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'views')));


app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


mongoose.connect('mongodb://localhost:27017/expenseTracker', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));


const expenseSchema = new mongoose.Schema({
    category: String,
    amount: Number,
    date: Date
});


const Expense = mongoose.model('Expense', expenseSchema);


app.post('/expenses', async (req, res) => {
    try {
        const { category, amount, date } = req.body;
        const newExpense = new Expense({ category, amount, date });
        await newExpense.save();
        res.status(201).json(newExpense);

    } catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const path = require('path');


const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, '../')));


app.post('/sort', (req, res) => {
    const { algorithm, dataset } = req.body;
    const sortingAlgorithms = require('./sorting');

    if (sortingAlgorithms[algorithm]) {
        res.json(sortingAlgorithms[algorithm](dataset));
    } else {
        res.status(400).json({ error: "Invalid sorting algorithm" });
    }
});

app.get('/', (req, res) => {
    res.send("Backend is running!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.get('/', (req, res) => {
    res.send("Backend is running!");
});



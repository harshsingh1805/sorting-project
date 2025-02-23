const express = require('express');
const sortingAlgorithms = require('./sorting');
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.post('/sort', (req, res) => {
    const { algorithm, dataset } = req.body;
    if (sortingAlgorithms[algorithm]) {
        const sortedSteps = sortingAlgorithms[algorithm](dataset);
        res.json(sortedSteps);
    } else {
        res.status(400).json({ error: "Invalid sorting algorithm" });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));

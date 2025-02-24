document.getElementById('generate').addEventListener('click', generateDataset);
document.getElementById('start').addEventListener('click', startSorting);
document.getElementById('pause').addEventListener('click', pauseSorting);
document.getElementById('resume').addEventListener('click', resumeSorting);
document.getElementById('reset').addEventListener('click', resetCanvas);
document.getElementById('manual-submit').addEventListener('click', processManualInput);

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;

let dataset = [];
let sortingPaused = false;
let currentSortInterval = null;

function generateDataset() {
    dataset = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 1);
    drawDataset(dataset);
}

function processManualInput() {
    const input = document.getElementById('manual-input').value;
    dataset = input.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
    drawDataset(dataset);
}

function drawDataset(data) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const graphType = document.getElementById('graph').value;
    const barWidth = canvas.width / data.length;

    if (graphType === 'bar') {
        data.forEach((value, index) => {
            ctx.fillStyle = 'blue';
            ctx.fillRect(index * barWidth, canvas.height - value * 3, barWidth - 2, value * 3);
        });
    } else if (graphType === 'scatter') {
        data.forEach((value, index) => {
            ctx.fillStyle = 'red';
            ctx.beginPath();
            ctx.arc(index * barWidth + barWidth / 2, canvas.height - value * 3, 5, 0, Math.PI * 2);
            ctx.fill();
        });
    } else if (graphType === 'stem') {
        data.forEach((value, index) => {
            ctx.strokeStyle = 'green';
            ctx.beginPath();
            ctx.moveTo(index * barWidth + barWidth / 2, canvas.height);
            ctx.lineTo(index * barWidth + barWidth / 2, canvas.height - value * 3);
            ctx.stroke();
        });
    }
}

function startSorting() {
    sortingPaused = false;
    const algo = document.getElementById('algo').value;
    fetch('/sort', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ algorithm: algo, dataset })
    })
    .then(response => response.json())
    .then(sortedData => animateSorting(sortedData));
}

function animateSorting(sortedSteps) {
    let stepIndex = 0;
    currentSortInterval = setInterval(() => {
        if (sortingPaused) return;
        if (stepIndex >= sortedSteps.length) {
            clearInterval(currentSortInterval);
            return;
        }
        dataset = sortedSteps[stepIndex++];
        drawDataset(dataset);
    }, 300);
}

function pauseSorting() {
    sortingPaused = true;
}

function resumeSorting() {
    sortingPaused = false;
}

function resetCanvas() {
    clearInterval(currentSortInterval);
    dataset = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

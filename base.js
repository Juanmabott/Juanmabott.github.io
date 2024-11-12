let score = 0;
let blackCount = 0;
let redCount = 0;
let topScores = [];
let timer = 10;
let timerInterval;

function createPoint(color) {
    const point = document.createElement('div');
    point.classList.add('point', color);
    point.style.top = `${Math.random() * 100}%`;
    point.style.left = `${Math.random() * 100}%`;
    point.addEventListener('click', () => handlePointClick(color, point));
    document.getElementById('game-container').appendChild(point);
}

function handlePointClick(color, point) {
    if (color === 'blue') {
        score += 10;
        timer += 1; // Add 1 second for each blue point clicked
    } else if (color === 'red') {
        score -= 20;
        redCount--;
    } else if (color === 'black') {
        score -= 100;
        blackCount--;
    }
    updateScore();
    point.remove();
}

function updateScore() {
    document.getElementById('score').innerText = `Puntuación: ${score}`;
    if (score < 0) {
        alert('Concentración perdida!');
        resetGame();
    }
}

function spawnPoints() {
    const gameContainer = document.getElementById('game-container');
    if (gameContainer.childElementCount >= 10) {
        return;
    }

    const colors = ['blue', 'red', 'black'];
    let color = colors[Math.floor(Math.random() * colors.length)];

    if (color === 'black' && blackCount >= 1) {
        color = 'blue';
    } else if (color === 'red' && redCount >= 6) {
        color = 'blue';
    }

    if (color === 'black') {
        blackCount++;
    } else if (color === 'red') {
        redCount++;
    }

    createPoint(color);
}

function resetGame() {
    topScores.push(score);
    topScores.sort((a, b) => a - b);
    topScores = topScores.slice(-5); // Keep only the top 5 scores
    alert(`Top Scores: ${topScores.join(', ')}`);
    score = 0;
    blackCount = 0;
    redCount = 0;
    timer = 10;
    updateScore();
    document.getElementById('game-container').innerHTML = '';
    clearInterval(timerInterval);
    startTimer();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timer--;
        document.getElementById('timer').innerText = `Tiempo: ${timer}`;
        if (timer <= 0) {
            alert('Tiempo agotado!');
            resetGame();
        }
    }, 1000);
}

setInterval(spawnPoints, 1000);
startTimer();

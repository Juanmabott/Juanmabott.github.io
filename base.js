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
        showGameOverForm('Concentración perdida!');
    }
}

function showGameOverForm(message) {
    clearInterval(timerInterval);
    document.getElementById('final-score').innerText = `Puntuación: ${score}`;
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('timer').style.display = 'none';
    document.getElementById('score').style.display = 'none';
    document.getElementById('game-over-form').style.display = 'block';
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
    topScores.sort((a, b) => b - a);
    topScores = topScores.slice(0, 5); // Keep only the top 5 scores
    score = 0;
    blackCount = 0;
    redCount = 0;
    timer = 10;
    updateScore();
    document.getElementById('game-container').innerHTML = '';
    document.getElementById('game-container').style.display = 'block';
    document.getElementById('timer').style.display = 'block';
    document.getElementById('score').style.display = 'block';
    document.getElementById('game-over-form').style.display = 'none';
    startTimer();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timer--;
        document.getElementById('timer').innerText = `Tiempo: ${timer}`;
        if (timer <= 0) {
            showGameOverForm('Tiempo agotado!');
        }
    }, 1000);
}

document.getElementById('retry-button').addEventListener('click', resetGame);
document.getElementById('menu-button').addEventListener('click', () => {
    window.location.href = 'index.html';
});

document.getElementById('game-over-form').style.display = 'none'; // Ensure game over form is hidden initially

setInterval(spawnPoints, 1000);
startTimer();

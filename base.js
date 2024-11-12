let score = 0;
let blackCount = 0;
let redCount = 0;

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
    document.getElementById('score').innerText = `Score: ${score}`;
    if (score >= 100) {
        alert('Concentrado');
        resetGame();
    } else if (score < 0) {
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
    score = 0;
    blackCount = 0;
    redCount = 0;
    updateScore();
    document.getElementById('game-container').innerHTML = '';
}

setInterval(spawnPoints, 1000);

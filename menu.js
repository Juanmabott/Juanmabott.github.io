
document.getElementById('start-button').addEventListener('click', () => {
    const username = document.getElementById('username').value.trim();
    if (username) {
        localStorage.setItem('username', username);
        window.location.href = 'minijuegoCon.html';
    } else {
        alert('Por favor, ingrese un nombre de usuario válido.');
    }
});
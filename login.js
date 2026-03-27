// Example credentials (in real apps, use backend + hashing)
const USER_CREDENTIALS = { username: 'admin', password: 'admin123' };

const loginBtn = document.getElementById('login-btn');
const loginMsg = document.getElementById('login-msg');

loginBtn.addEventListener('click', () => {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username === USER_CREDENTIALS.username && password === USER_CREDENTIALS.password) {
        localStorage.setItem('isLoggedIn', 'true'); // Save login state
        window.location.href = 'index.html';
    } else {
        loginMsg.textContent = 'Invalid username or password!';
    }
});

// Redirect if already logged in
if (localStorage.getItem('isLoggedIn') === 'true') {
    window.location.href = 'index.html';
}
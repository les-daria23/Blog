document.getElementById('subscribe-form').addEventListener('submit', function(e) {
    e.preventDefault(); // oprește trimiterea formularului
    const email = document.getElementById('email').value;
    if (email) {
        alert(`Mulțumim pentru abonare, ${email}!`);
        document.getElementById('email').value = ''; // goliți câmpul
    } else {
        alert('Te rugăm să introduci un email valid.');
    }
});
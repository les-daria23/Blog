document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const lastname = document.getElementById("lastname").value;
    const firstname = document.getElementById("firstname").value;
    const country = document.getElementById("country").value;
    const age = document.getElementById("age").value;

    alert(`Mulțumim, ${firstname} ${lastname} din ${country}, vârstă: ${age}! Am primit mesajul tău.`);

    this.reset(); // Curăță formularul
});
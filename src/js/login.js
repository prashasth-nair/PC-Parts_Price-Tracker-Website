if(sessionStorage.getItem("is_logged_in") === "true") {
let is_logged_in = sessionStorage.getItem("is_logged_in");
console.log(is_logged_in);
}
else {
    window.location.href = "/src/html/login.html";
}
document
  .getElementById("loginForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://127.0.0.1:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (result.message === "Login successful") {
        alert("Login successful");
        sessionStorage.setItem("is_logged_in", "true");
        window.location.href = "/src/html/index.html";
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
    }
  });

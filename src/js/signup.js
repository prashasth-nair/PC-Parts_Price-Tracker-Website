document
  .getElementById("userForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://127.0.0.1:4000/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const result = await response.json();

    // console.log( JSON.stringify(result, null, 2));
    if (result.message === "User added successfully") {
      alert("Sign up successful! Please login to continue.");
      window.location.href = "login.html";
    }
  });

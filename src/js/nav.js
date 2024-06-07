let is_logged_in;
if(sessionStorage.getItem("is_logged_in") === "true") {
    is_logged_in = sessionStorage.getItem("is_logged_in");
    console.log(is_logged_in);
}else {
    is_logged_in = false;
}

if (is_logged_in) {
    document.getElementById('login').style.display = 'none';
    document.getElementById('signup').style.display = 'none';
    document.getElementById('logout').style.display = 'block';
    // document.getElementById('fav').style.display = 'block';
    document.getElementById('logout').addEventListener('click', function() {
        sessionStorage.setItem("is_logged_in", false);
        window.location.href = 'index.html';
    });
}

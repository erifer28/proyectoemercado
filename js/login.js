
window.onload = function() {
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevenir el envío del formulario

        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let rememberMe = document.getElementById("remember").checked;

        if (username.length > 30 || password.length > 30) {
            alert("La contraseña no puede tener más de 30 caracteres.");
        } else {
            if (rememberMe) {
                localStorage.setItem("username", username);
            } else {
                sessionStorage.setItem("username", username);
            }
            Swal.fire({
                title:'Bienvenid@ a E-mercado: ' + username,
                icon: 'success'
              }).then(() => { window.location.href = "index.html";
            })
        }
    });
};
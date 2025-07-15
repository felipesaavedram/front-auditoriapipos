function validarCampos() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("contraseña").value;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return {
    emailValido: emailRegex.test(email),
    passwordValida: password.length >= 8 && password.length <= 15
  };
}
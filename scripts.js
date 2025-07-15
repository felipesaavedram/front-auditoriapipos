document.addEventListener("DOMContentLoaded", function () {
  const headerText = document.getElementById("header-text");
  const underline = document.querySelector(".underline");
  const forgotPassword = document.querySelector(".forgot-password");
  const container = document.querySelector(".container");
  const clickVersion = document.getElementById("click-version");

  const inputEmail = document.getElementById("input-email");
  const inputPassword = document.getElementById("input-password");

  const botonSignup = document.getElementById("button-signup");
  const botonLogin = document.getElementById("button-login");
  const botonAceptar = document.getElementById("button-acept");

  const errorEmail = document.getElementById("error-email");
  const errorPassword = document.getElementById("error-contraseña");

  const campos = {
    email: document.getElementById("email"),
    contraseña: document.getElementById("contraseña")
  };

  let modoActual = "login";

  const camposTocados = {
    email: false,
    contraseña: false
  };

  function ajustarUnderline() {
    const textWidth = headerText.offsetWidth;
    underline.style.width = `${textWidth}px`;
  }

  function mostrarAmbos() {
    inputEmail.style.display = "flex";
    inputPassword.style.display = "flex";
  }

  function activarSignUp() {
    modoActual = "signup";
    mostrarAmbos();
    headerText.textContent = botonSignup.textContent;
    forgotPassword.style.display = "none";
    container.style.maxHeight = "70vh";
    ajustarUnderline();
    deshabilitarBotonAceptar();
    limpiarErrores();
    resetCamposTocados();
  }

  function activarLogin() {
    modoActual = "login";
    mostrarAmbos();
    headerText.textContent = botonLogin.textContent;
    forgotPassword.style.display = "block";
    container.style.maxHeight = "70vh";
    ajustarUnderline();
    deshabilitarBotonAceptar();
    limpiarErrores();
    resetCamposTocados();
  }

  function limpiarErrores() {
    errorEmail.textContent = "";
    errorPassword.textContent = "";
  }

  function resetCamposTocados() {
    camposTocados.email = false;
    camposTocados.contraseña = false;
  }

  function limpiarCampos() {
    campos.email.value = "";
    campos.contraseña.value = "";
  }

  activarLogin(); // estado inicial

  const mensaje = localStorage.getItem("registroExitoso");
  if (mensaje) {
    mostrarAlertaHTML("exito", mensaje);
    localStorage.removeItem("registroExitoso");
  }

  botonSignup.addEventListener("click", activarSignUp);
  botonLogin.addEventListener("click", activarLogin);

  for (const key in campos) {
    campos[key].addEventListener("blur", () => {
      camposTocados[key] = true;
      validarEnTiempoReal();
    });

    campos[key].addEventListener("input", () => {
      validarEnTiempoReal();
    });
  }

  function deshabilitarBotonAceptar() {
    botonAceptar.classList.add("disabled");
    botonAceptar.style.pointerEvents = "none";
    botonAceptar.style.opacity = "0.6";
  }

  function habilitarBotonAceptar() {
    botonAceptar.classList.remove("disabled");
    botonAceptar.style.pointerEvents = "auto";
    botonAceptar.style.opacity = "1";
  }

  function validarEnTiempoReal() {
    const resultado = validarCampos();

    errorEmail.textContent = (camposTocados.email || campos.email.value !== "") && !resultado.emailValido
      ? "El correo no es válido."
      : "";

    errorPassword.textContent = (camposTocados.contraseña || campos.contraseña.value !== "") && !resultado.passwordValida
      ? "La contraseña debe tener entre 8 y 15 caracteres."
      : "";

    if (resultado.emailValido && resultado.passwordValida) {
      habilitarBotonAceptar();
    } else {
      deshabilitarBotonAceptar();
    }
  }


  function mostrarAlertaHTML(tipo, mensaje) {
    const contenedor = document.getElementById("contenedor-alerta");

    // Eliminar alertas anteriores si las hay
    const alertaPrevia = document.querySelector('.alert');
    if (alertaPrevia) {
      alertaPrevia.remove();
    }

    // Crear la alerta
    const alerta = document.createElement('div');
    alerta.classList.add(
      'alert'
    );

    if (tipo === 'error') {
      alerta.classList.add('bg-red-600');
    } else {
      alerta.classList.add('bg-green-600');
    }

    alerta.textContent = mensaje;

    // Insertar alerta
    contenedor.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 1500);
  }

  clickVersion.addEventListener("click", () => {
    alert("Esta parte del software estará disponible en su versión 2.0");
  });

  botonAceptar.addEventListener("click", () => {
    const resultado = validarCampos();

    const datosUsuario = {
      email: campos.email.value.trim(),
      contraseña: campos.contraseña.value
    };

    // REGISTRO
    if (modoActual === "signup" && resultado.emailValido && resultado.passwordValida) {
      // Primero verificamos si el correo ya está registrado
      fetch(`http://localhost:3000/usuarios?email=${encodeURIComponent(datosUsuario.email)}`)
        .then(res => res.json())
        .then(usuariosExistentes => {
          if (usuariosExistentes.length > 0) {
            mostrarAlertaHTML("error", "Este correo ya está registrado.");
          } else {
            // Si no existe, lo registramos
            fetch("http://localhost:3000/usuarios", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(datosUsuario)
            })
              .then(res => res.json())
              .then(() => {
                localStorage.setItem("registroExitoso", "¡Registro exitoso!");
                activarLogin();

              })
              .catch(error => {
                console.error("Error al registrar:", error);
                mostrarAlertaHTML("error", "Ocurrió un error al registrar.");
              });
          }
        })
        .catch(error => {
          console.error("Error al comprobar usuario:", error);
          mostrarAlertaHTML("error", "No se pudo conectar al servidor.");
        });
    }

    // LOGIN
    if (modoActual === "login" && resultado.emailValido && resultado.passwordValida) {
      fetch(`http://localhost:3000/usuarios?email=${encodeURIComponent(datosUsuario.email)}&contraseña=${encodeURIComponent(datosUsuario.contraseña)}`)
        .then(res => res.json())
        .then(usuarios => {
          if (usuarios.length > 0) {
            // Usuario y contraseña correctos
            mostrarAlertaHTML("exito", "Inicio de sesión exitoso...");
            setTimeout(() => {
              window.location.href = "form.html"; // redirige luego de mostrar alerta
            }, 1500);
          } else {
            mostrarAlertaHTML("error", "Correo o contraseña incorrectos.");
          }
        })
        .catch(error => {
          console.error("Error en el login:", error);
          mostrarAlertaHTML("error", "No se pudo conectar al servidor.");
        });
    }
  });
});
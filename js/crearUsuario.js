// const API_URL = "http://localhost:3000/api/usuarios";
const API_URL =
  "https://rest-apinodemysql-production.up.railway.app/api/usuarios";

// Datos del formulario
function obtenerDatosFormulario() {
  const nombre = document.getElementById("txtNombre").value.trim();
  const domicilio = document.getElementById("txtDomicilio").value.trim();
  const edad = parseInt(document.getElementById("txtEdad").value);
  const sexo = document.getElementById("txtSexo").value;

  return { nombre, domicilio, edad, sexo };
}

// Validar Campos del form
function validarDatos(usuario) {
  if (
    !usuario.nombre ||
    !usuario.domicilio ||
    usuario.edad <= 0 ||
    !usuario.sexo
  ) {
    alert("Todos los campos son obligatorios y la edad debe ser mayor a 0.");
    return false;
  }
  return true;
}

// Función para crear un nuevo usuario
async function crearUsuario(event) {
  event.preventDefault();

  const usuario = obtenerDatosFormulario();

  if (!validarDatos(usuario)) {
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error al registrar el usuario: ${errorMessage}`);
    }

    alert("Usuario registrado exitosamente");
    window.location.href = "../html/tablaUsuarios.html"; // Mandalo a la vista de la tabla de usuarios
  } catch (error) {
    console.error("Error:", error);
    alert(`Hubo un problema al registrar el usuario: ${error.message}`);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formUsuario");
  formulario.addEventListener("submit", crearUsuario);
});

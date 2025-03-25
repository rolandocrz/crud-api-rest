// const API_URL = "http://localhost:3000/api/usuarios";
const API_URL =
  "https://rest-apinodemysql-production.up.railway.app/api/usuarios";

document.addEventListener("DOMContentLoaded", iniciar);

function iniciar() {
  const id = obtenerIdUsuario();
  if (!id) {
    alert("No se encontró el ID del usuario en la URL.");
    return;
  }
  obtenerUsuario(id);
  const formulario = document.getElementById("formUsuario");
  formulario.addEventListener("submit", (event) =>
    actualizarUsuario(event, id)
  );
}

function obtenerIdUsuario() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function obtenerUsuario(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Error al obtener los datos del usuario");
    const usuario = await response.json();
    llenarCampos(usuario);
  } catch (error) {
    console.error(error);
    alert("Error al cargar los datos del usuario");
  }
}

function llenarCampos(usuario) {
  document.getElementById("txtNombre").value = usuario.nombre;
  document.getElementById("txtDomicilio").value = usuario.domicilio;
  document.getElementById("txtEdad").value = usuario.edad;
  document.getElementById("txtSexo").value = usuario.sexo;
}

function obtenerDatosFormulario() {
  const nombre = document.getElementById("txtNombre").value.trim();
  const domicilio = document.getElementById("txtDomicilio").value.trim();
  const edad = parseInt(document.getElementById("txtEdad").value, 10);
  const sexo = document.getElementById("txtSexo").value;
  return { nombre, domicilio, edad, sexo };
}

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

async function actualizarUsuario(event, id) {
  event.preventDefault();
  const usuario = obtenerDatosFormulario();

  if (!validarDatos(usuario)) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    alert("Usuario actualizado exitosamente");
    window.location.href = "../html/tablaUsuarios.html"; // Mandar a la tabla de usuarios
  } catch (error) {
    console.error("Error:", error);
    alert(`Hubo un error al actualizar el usuario: ${error.message}`);
  }
}

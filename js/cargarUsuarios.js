// const API_URL = "http://localhost:3000/api/usuarios";
const API_URL =
  "https://rest-apinodemysql-production.up.railway.app/api/usuarios";

document.addEventListener("DOMContentLoaded", fetchUsuarios);

// Función para cargar los usuarios
async function fetchUsuarios() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al obtener los datos de la API");

    const usuarios = await response.json();
    mostrarUsuarios(usuarios);
  } catch (error) {
    console.error("Error:", error);
    alert("Hubo un error al cargar los usuarios");
  }
}

// Función para mostrar la lista de usuarios en la tabla
function mostrarUsuarios(usuarios) {
  const tbody = document.getElementById("usuarios-body");
  tbody.innerHTML = "";

  usuarios.forEach(({ id, nombre, domicilio, edad, sexo }) => {
    const row = document.createElement("tr");
    row.classList.add("border-b", "border-gray-200", "hover:bg-gray-50");

    row.innerHTML = `
      <td class="py-4 px-4 text-sm text-gray-700">${nombre}</td>
      <td class="py-4 px-4 text-sm text-gray-700">${domicilio}</td>
      <td class="py-4 px-4 text-sm text-gray-700">${edad}</td>
      <td class="py-4 px-4 text-sm text-gray-700">${
        sexo === "M" ? "Masculino" : "Femenino"
      }</td>
      <td class="py-4 px-4 text-right">
        <button class="btn btn-info btn-sm mr-2"  onclick="editarUsuario('${id}')">
          Editar
        </button>
        <button class="btn btn-danger btn-sm" onclick="eliminarUsuario('${id}')">
          Eliminar
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// FUnccion de btn editar usuario
function editarUsuario(id) {
  window.location.href = `../html/actualizarUsuario.html?id=${id}`;
}

// Funcion de btn eliminar usuario
async function eliminarUsuario(id) {
  if (!confirm("¿Estás seguro de que quieres eliminar este usuario?")) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar el usuario");

    alert("Usuario eliminado exitosamente");
    fetchUsuarios(); // Volver a mostrar la lista de usuarios
  } catch (error) {
    console.error("Error:", error);
    alert("Hubo un error al eliminar el usuario");
  }
}

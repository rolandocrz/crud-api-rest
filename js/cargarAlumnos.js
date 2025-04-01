// const API_URL = "http://localhost:3000/api/alumnos";
const API_URL =
  "https://rest-apinodemysql-production.up.railway.app/api/alumnos";

document.addEventListener("DOMContentLoaded", fetchAlumnos);

// btn para cargar todos los alumnos
const btnCargar = document.getElementById("btnCargar");
btnCargar.addEventListener("click", fetchAlumnos);

// btn para cargar todos los alumnos con status 1 (Activo)
const btnActivos = document.getElementById("btnActivos");
btnActivos.addEventListener("click", () => filtrarAlumnos(1));

// btn para cargar todos los alumnos con status 0 (Inactivo)
const btnInactivos = document.getElementById("btnInactivos");
btnInactivos.addEventListener("click", () => filtrarAlumnos(0));

// Funcin para cargar los alumnos
async function fetchAlumnos() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al obtener los datos de la API");

    const alumnos = await response.json();
    mostrarAlumnos(alumnos);
  } catch (error) {
    console.error("Error:", error);
    alert("Hubo un error al cargar los alumnos");
  }
}

// Función para filtrar alumnos por estado
async function filtrarAlumnos(status) {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al obtener los datos de la API");

    const alumnos = await response.json();
    const alumnosFiltrados = alumnos.filter(
      (alumno) => alumno.status === status
    );
    mostrarAlumnos(alumnosFiltrados);
  } catch (error) {
    console.error("Error:", error);
    alert("Hubo un error al filtrar los alumnos");
  }
}

// Funcion para mostrar la lista de alumnos en la tabla
function mostrarAlumnos(alumnos) {
  const tbody = document.getElementById("alumnos-body");
  tbody.innerHTML = "";

  alumnos.forEach(
    ({ id, matricula, nombre, domicilio, fechanac, sexo, status }) => {
      const row = document.createElement("tr");

      row.innerHTML = `
      <td class="py-4 px-4">${nombre}</td>
      <td class="py-4 px-4">${domicilio}</td>
      <td class="py-4 px-4">${fechanac}</td>
      <td class="py-4 px-4">${sexo === "M" ? "Masculino" : "Femenino"}</td>
      <td class="py-4 px-4">${status === 1 ? "Activo" : "Inactivo"}</td>
      <td class="py-4 px-4 text-right">
        <button class="btn btn-info btn-sm mr-2"  onclick="editarAlumno('${id}')">
          Editar
        </button>
        <button class="btn btn-danger btn-sm" onclick="eliminarAlumno('${id}')">
          Eliminar
        </button>
      </td>
    `;
      tbody.appendChild(row);
    }
  );
}

// Función de botón editar alumno
function editarAlumno(id) {
  window.location.href = `../html/actualizarAlumno.html?id=${id}`;
}

// Función de botón eliminar alumno
async function eliminarAlumno(id) {
  if (!confirm("¿Estás seguro de que quieres eliminar este alumno?")) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar el alumno");

    alert("Alumno eliminado exitosamente");
    fetchAlumnos(); // Volver a mostrar la lista de alumnos
  } catch (error) {
    console.error("Error:", error);
    alert("Hubo un error al eliminar el alumno");
  }
}

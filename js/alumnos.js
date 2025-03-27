const API_URL = "https://rest-apinodemysql-production.up.railway.app/alumnos";

// Función para cargar alumnos desde la API
function cargarAlumnos() {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => mostrarAlumnos(data))
    .catch((error) => console.error("Error al cargar los datos:", error));
}

// Función para mostrar los alumnos en la tabla
function mostrarAlumnos(alumnos) {
  const tbody = document.getElementById("usuarios-body");
  tbody.innerHTML = ""; // Limpiar contenido previo

  alumnos.forEach((alumno) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${alumno.nombre}</td>
      <td>${alumno.domicilio}</td>
      <td>${alumno.edad}</td>
      <td>${alumno.sexo}</td>
    `;

    tbody.appendChild(fila);
  });
}

// Función para limpiar la tabla
function limpiarTabla() {
  document.getElementById("usuarios-body").innerHTML = "";
}

// Agregar eventos a los botones
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("cargar-btn")
    .addEventListener("click", cargarAlumnos);
  document
    .getElementById("limpiar-btn")
    .addEventListener("click", limpiarTabla);
});

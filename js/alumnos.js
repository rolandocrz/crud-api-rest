const API_URL = "https://rest-apinodemysql-production.up.railway.app/alumnos";

document.addEventListener("DOMContentLoaded", () => {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => mostrarAlumnos(data))
    .catch((error) => console.error("Error al cargar los datos:", error));
});

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

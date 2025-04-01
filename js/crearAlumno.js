// const API_URL = "http://localhost:3000/api/alumnos";
const API_URL =
  "https://rest-apinodemysql-production.up.railway.app/api/alumnos";

// Datos del formulario
function obtenerDatosFormulario() {
  const matricula = document.getElementById("txtMatricula").value.trim();
  const nombre = document.getElementById("txtNombre").value.trim();
  const domicilio = document.getElementById("txtDomicilio").value.trim();
  const fechanac = document.getElementById("txtFechaNac").value.trim();
  const sexo = document.getElementById("txtSexo").value;
  const status = parseInt(document.getElementById("txtStatus").value) || 0;

  return { matricula, nombre, domicilio, fechanac, sexo, status };
}

// Validar campos del formulario
function validarDatos(alumno) {
  if (
    !alumno.matricula ||
    !alumno.nombre ||
    !alumno.domicilio ||
    !alumno.fechanac ||
    !alumno.sexo ||
    alumno.status == null
  ) {
    alert("Todos los campos son obligatorios.");
    return false;
  }
  return true;
}

// Función para crear un nuevo alumno
async function crearAlumno(event) {
  event.preventDefault();

  const alumno = obtenerDatosFormulario();

  if (!validarDatos(alumno)) {
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(alumno),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error al registrar el alumno: ${errorMessage}`);
    }

    alert("Alumno registrado exitosamente");
    window.location.href = "../html/tablaAlumnos.html"; // Mandalo a la vista de la tabla de alumnos
  } catch (error) {
    console.error("Error:", error);
    alert(`Hubo un problema al registrar el alumno: ${error.message}`);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formAlumno");
  formulario.addEventListener("submit", crearAlumno);
});

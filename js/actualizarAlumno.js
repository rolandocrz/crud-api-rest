// const API_URL = "http://localhost:3000/api/alumnos";
const API_URL =
  "https://rest-apinodemysql-production.up.railway.app/api/alumnos";

document.addEventListener("DOMContentLoaded", iniciar);

function iniciar() {
  const id = obtenerIdAlumno();
  if (!id) {
    alert("No se encontró el ID del alumno en la URL.");
    return;
  }
  obtenerAlumno(id);
  const formulario = document.getElementById("formAlumno");
  formulario.addEventListener("submit", (event) => actualizarAlumno(event, id));
}

function obtenerIdAlumno() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function obtenerAlumno(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Error al obtener los datos del alumno");
    const alumno = await response.json();
    llenarCampos(alumno);
  } catch (error) {
    console.error(error);
    alert("Error al cargar los datos del alumno");
  }
}

function llenarCampos(alumno) {
  document.getElementById("txtMatricula").value = alumno.matricula;
  document.getElementById("txtNombre").value = alumno.nombre;
  document.getElementById("txtDomicilio").value = alumno.domicilio;
  document.getElementById("txtFechaNac").value = alumno.fechanac;
  document.getElementById("txtSexo").value = alumno.sexo;
  document.getElementById("txtStatus").value = alumno.status;
}

function obtenerDatosFormulario() {
  const matricula = document.getElementById("txtMatricula").value.trim();
  const nombre = document.getElementById("txtNombre").value.trim();
  const domicilio = document.getElementById("txtDomicilio").value.trim();
  const fechanac = document.getElementById("txtFechaNac").value;
  const sexo = document.getElementById("txtSexo").value;
  const status = parseInt(document.getElementById("txtStatus").value, 10);
  return { matricula, nombre, domicilio, fechanac, sexo, status };
}

function validarDatos(alumno) {
  if (
    !alumno.matricula ||
    !alumno.nombre ||
    !alumno.domicilio ||
    !alumno.fechanac ||
    !alumno.sexo
  ) {
    alert("Todos los campos son obligatorios.");
    return false;
  }
  return true;
}

async function actualizarAlumno(event, id) {
  event.preventDefault();
  const alumno = obtenerDatosFormulario();

  if (!validarDatos(alumno)) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(alumno),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    alert("Alumno actualizado exitosamente");
    window.location.href = "../html/tablaAlumnos.html"; // Mandar a la tabla de alumnos
  } catch (error) {
    console.error("Error:", error);
    alert(`Hubo un error al actualizar el alumno: ${error.message}`);
  }
}

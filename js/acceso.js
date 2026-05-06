const API_EXITOSOS =
  "https://nubeseguridadyaccesos.onrender.com/api/AccesosRegistros/QueryListarAccesosExitosos";

const API_DENEGADOS =
  "https://nubeseguridadyaccesos.onrender.com/api/AccesosRegistros/QueryListarAccesosDenegados";

document.addEventListener("DOMContentLoaded", cargarTodo);

async function cargarTodo() {
  await cargarExitosos();
  await cargarDenegados();
}

// =======================
// EXITOSOS
// =======================
async function cargarExitosos() {
  try {
    const res = await fetch(API_EXITOSOS);
    const data = await res.json();

    const tabla = document.getElementById("tablaExitosos");
    tabla.innerHTML = "";

    data.forEach(a => {
      tabla.innerHTML += fila(a);
    });

  } catch (error) {
    console.error("Error exitosos:", error);
  }
}

// =======================
// DENEGADOS
// =======================
async function cargarDenegados() {
  try {
    const res = await fetch(API_DENEGADOS);
    const data = await res.json();

    const tabla = document.getElementById("tablaDenegados");
    tabla.innerHTML = "";

    data.forEach(a => {
      tabla.innerHTML += fila(a);
    });

  } catch (error) {
    console.error("Error denegados:", error);
  }
}

// =======================
// TEMPLATE
// =======================
function fila(a) {
  return `
    <tr>
      <td>${a.descripcion}</td>
      <td>${a.identidad}</td>
      <td>${a.codigoPersona}</td>
      <td>${formatearFecha(a.horaRegistro)}</td>
      <td>${a.area}</td>
      <td>${a.nombreDispositivo}</td>
    </tr>
  `;
}

// =======================
// FECHA
// =======================
function formatearFecha(fecha) {
  if (!fecha) return "";

  return new Date(fecha).toLocaleString("es-ES");
}
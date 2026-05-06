
const API_EQUIPAMIENTO_GET =
  "https://nubeseguridadyaccesos.onrender.com/api/Equipamiento/MostrarEquipamientosCompletosDTO";

const API_ASIGNACION_GET =
  "https://nubeseguridadyaccesos.onrender.com/api/AsignacionEquipamiento/QueryListarTodosLasAsignacioes";

const API_POST =
  "https://nubeseguridadyaccesos.onrender.com/api/Equipamiento/AnadirEquipamiento";

// =======================
// INIT
// =======================
document.addEventListener("DOMContentLoaded", () => {
  cargarEquipamientos();
  cargarAsignaciones();
});

// =======================
// GET 1: EQUIPAMIENTOS
// =======================
async function cargarEquipamientos() {
  try {
    const res = await fetch(API_EQUIPAMIENTO_GET);
    const data = await res.json();

    const tabla = document.getElementById("tablaEquipamiento");
    tabla.innerHTML = "";

    data.forEach(e => {
      tabla.innerHTML += `
        <tr>
          <td>${e.codigoEquipamiento}</td>
          <td>${e.nombre_Equipo}</td>
          <td>${e.descripcion}</td>
        </tr>
      `;
    });

  } catch (error) {
    console.error("Error equipamiento:", error);
  }
}

// =======================
// GET 2: ASIGNACIONES
// =======================
async function cargarAsignaciones() {
  try {
    const res = await fetch(API_ASIGNACION_GET);
    const data = await res.json();

    const tabla = document.getElementById("tablaAsignaciones");
    tabla.innerHTML = "";

    data.forEach(a => {
      tabla.innerHTML += `
        <tr>
          <td>${a.equipamiento}</td>
          <td>${a.asignacionEquipamiento}</td>
          <td>${a.identidadAcceso}</td>
          <td>${a.codigoIdentidad}</td>
        </tr>
      `;
    });

  } catch (error) {
    console.error("Error asignaciones:", error);
  }
}

// =======================
// POST: EQUIPAMIENTO
// =======================
async function guardarEquipamiento() {
  try {
    const codigo = document.getElementById("codigo").value;
    const nombre = document.getElementById("nombre").value;
    const descripcion = document.getElementById("descripcion").value;

    if (!codigo || !nombre || !descripcion) {
      alert("Completa todos los campos");
      return;
    }

    const url =
      `${API_POST}?nombre=${nombre}` +
      `&descripcion=${descripcion}` +
      `&codigo=${codigo}`;

    const res = await fetch(url, {
      method: "POST"
    });

    if (!res.ok) throw new Error("Error al guardar equipamiento");

    alert("Equipamiento registrado correctamente");

    document.getElementById("codigo").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("descripcion").value = "";

    cargarEquipamientos();

  } catch (error) {
    console.error("Error POST equipamiento:", error);
  }
}
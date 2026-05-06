const API_GET =
  "https://nubeseguridadyaccesos.onrender.com/api/Rol/ListadeRolesRegistrados";

const API_POST =
  "https://nubeseguridadyaccesos.onrender.com/api/Rol/AnadirRol";

// =======================
// GET
// =======================
document.addEventListener("DOMContentLoaded", cargar);

async function cargar() {
  try {
    const res = await fetch(API_GET);
    const data = await res.json();

    const tabla = document.getElementById("tabla");
    tabla.innerHTML = "";

    data.forEach(r => {
      tabla.innerHTML += `
        <tr>
          <td>${r.codigoRol}</td>
          <td>${r.nombre}</td>
          <td>${r.descripcion}</td>
        </tr>
      `;
    });

  } catch (error) {
    console.error("Error GET roles:", error);
  }
}

// =======================
// POST
// =======================
async function guardarRol() {
  try {
    const codigo = document.getElementById("codigo").value;
    const nombre = document.getElementById("nombre").value;
    const descripcion = document.getElementById("descripcion").value;

    if (!codigo || !nombre || !descripcion) {
      alert("Completa todos los campos");
      return;
    }

    const url =
      `${API_POST}?codigo=${codigo}` +
      `&nombre=${nombre}` +
      `&descripcion=${descripcion}`;

    const res = await fetch(url, {
      method: "POST"
    });

    if (!res.ok) {
      throw new Error("Error al guardar rol");
    }

    alert("Rol registrado correctamente");

    // limpiar campos
    document.getElementById("codigo").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("descripcion").value = "";

    cargar();

  } catch (error) {
    console.error("Error POST roles:", error);
  }
}
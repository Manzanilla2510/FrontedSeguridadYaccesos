const API_GET =
  "https://nubeseguridadyaccesos.onrender.com/api/Dispositivo/ListadeDispositivosRegistradosDTO";

const API_POST =
  "https://nubeseguridadyaccesos.onrender.com/api/Dispositivo/AnadirDispositivo";

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

    data.forEach(d => {
      tabla.innerHTML += `
        <tr>
          <td>${d.numeroSerie}</td>
          <td>${d.nombreDispositivo}</td>
          <td>${d.codigoArea ?? d.CodigoArea ?? ""}</td>
        </tr>
      `;
    });

  } catch (error) {
    console.error("Error GET dispositivos:", error);
  }
}

// =======================
// POST
// =======================
async function guardarDispositivo() {
  try {
    const codigo = document.getElementById("codigo").value;
    const nombre = document.getElementById("nombre").value;
    const area = document.getElementById("area").value;

    if (!codigo || !nombre || !area) {
      alert("Completa todos los campos");
      return;
    }

    const url =
      `${API_POST}?codigo=${codigo}` +
      `&nombre=${nombre}` +
      `&CodigoArea=${area}`;

    const res = await fetch(url, {
      method: "POST"
    });

    if (!res.ok) {
      throw new Error("Error al guardar dispositivo");
    }

    alert("Dispositivo registrado correctamente");

    // limpiar inputs
    document.getElementById("codigo").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("area").value = "";

    cargar();

  } catch (error) {
    console.error("Error POST dispositivos:", error);
  }
}
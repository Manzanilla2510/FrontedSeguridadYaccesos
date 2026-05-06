const API_GET =
  "https://nubeseguridadyaccesos.onrender.com/api/Reporte/ListadeReportesDTO";

const API_POST =
  "https://nubeseguridadyaccesos.onrender.com/api/Reporte/AnadirReporte";

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
          <td>${r.codigoPersona ?? r.codigoPersona ?? ""}</td>
          <td>${r.codigoReporte}</td>
          <td>${r.tipoReporte}</td>
          <td>${r.descripcion}</td>
        </tr>
      `;
    });

  } catch (error) {
    console.error("Error GET reportes:", error);
  }
}

// =======================
// POST
// =======================
async function guardarReporte() {
  try {
    const codigoIdentidad = document.getElementById("codigoIdentidad").value;
    const codigoReporte = document.getElementById("codigoReporte").value;
    const tipo = document.getElementById("tipo").value;
    const descripcion = document.getElementById("descripcion").value;

    if (!codigoIdentidad || !codigoReporte || !tipo || !descripcion) {
      alert("Completa todos los campos");
      return;
    }

    const url =
      `${API_POST}?codigoIedntidad=${codigoIdentidad}` +
      `&codigoReporte=${codigoReporte}` +
      `&tipo=${tipo}` +
      `&descripcion=${descripcion}`;

    const res = await fetch(url, {
      method: "POST"
    });

    if (!res.ok) {
      throw new Error("Error al guardar reporte");
    }

    alert("Reporte registrado correctamente");

    // limpiar
    document.getElementById("codigoIdentidad").value = "";
    document.getElementById("codigoReporte").value = "";
    document.getElementById("descripcion").value = "";

    cargar();

  } catch (error) {
    console.error("Error POST reportes:", error);
  }
}
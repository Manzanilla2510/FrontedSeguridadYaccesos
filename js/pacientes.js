const API =
  "https://gestionenfermeria-be-production.up.railway.app/api/Enfermeras";

// =======================
// GET
// =======================
document.addEventListener("DOMContentLoaded", cargar);

async function cargar() {
  try {
    const res = await fetch(API);

    if (!res.ok) {
      throw new Error("Error HTTP: " + res.status);
    }

    const data = await res.json();

    const tabla = document.getElementById("tabla");
    tabla.innerHTML = "";

    data.forEach(e => {
      tabla.innerHTML += `
        <tr>
          <td>${e.codigo_Enfermera}</td>
          <td>${e.nombre}</td>
          <td>${e.apellido_Paterno}</td>
          <td>${e.apellido_Materno}</td>
        </tr>
      `;
    });

  } catch (error) {
    console.error("Error GET enfermeras:", error);
    document.getElementById("tabla").innerHTML =
      "<tr><td>Error al cargar datos</td></tr>";
  }
}
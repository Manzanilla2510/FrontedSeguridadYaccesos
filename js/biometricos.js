const API_GET =
  "https://nubeseguridadyaccesos.onrender.com/api/DatosBiometricos/ListadePersonasResgistradasDTo";

const API_POST =
  "https://nubeseguridadyaccesos.onrender.com/api/DatosBiometricos/AnadirDatoBio";

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

    data.forEach(b => {
      tabla.innerHTML += `
        <tr>
          <td>${b.coidgoidentidad ?? b.codigoIdentidad ?? ""}</td>
          <td>${b.codigoDato}</td>
          <td>${b.tipoDatoBiometrico}</td>
          <td>${b.datoHuella}</td>
          <td>${b.fechaRegistro}</td>
        </tr>
      `;
    });

  } catch (error) {
    console.error("Error GET biométricos:", error);
  }
}

// =======================
// POST
// =======================
async function guardarBiometrico() {
  try {
    const codigoIdentidad = document.getElementById("codigoIdentidad").value;
    const codigo = document.getElementById("codigo").value;
    const tipoDato = document.getElementById("tipoDato").value;
    const datoHuella = document.getElementById("datoHuella").value;
    const fecha = document.getElementById("fecha").value;

    if (!codigoIdentidad || !codigo || !tipoDato || !datoHuella || !fecha) {
      alert("Completa todos los campos");
      return;
    }

    const url =
      `${API_POST}?coidgoidentidad=${codigoIdentidad}` +
      `&codigo=${codigo}` +
      `&TipoDato=${tipoDato}` +
      `&DatoHuella=${datoHuella}` +
      `&fecharegistro=${fecha}`;

    const res = await fetch(url, {
      method: "POST"
    });

    if (!res.ok) {
      throw new Error("Error al guardar biométrico");
    }

    alert("Dato biométrico registrado correctamente");

    // limpiar
    document.getElementById("codigoIdentidad").value = "";
    document.getElementById("codigo").value = "";
    document.getElementById("datoHuella").value = "";
    document.getElementById("fecha").value = "";

    cargar();

  } catch (error) {
    console.error("Error POST biométricos:", error);
  }
}
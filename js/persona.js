const API_PERSONAS =
  "https://nubeseguridadyaccesos.onrender.com/api/IdentidadAcesso/ListadePersonasResgistradasDTO";

const API_ROLES_GET =
  "https://nubeseguridadyaccesos.onrender.com/api/RolIdentidad/QueryListarTodosLosRolesAsignados";

const API_ROLES_POST =
  "https://nubeseguridadyaccesos.onrender.com/api/RolIdentidad/AgregarRol";

// =======================
// INIT (3 CARGAS)
// =======================
document.addEventListener("DOMContentLoaded", () => {
  cargarPersonas();
  cargarRolesAsignados();
});

// =======================
// 1. GET PERSONAS
// =======================
async function cargarPersonas() {
  try {
    const res = await fetch(API_PERSONAS);
    const data = await res.json();

    const tabla = document.getElementById("tablaPersonas");
    tabla.innerHTML = "";

    data.forEach(p => {
      tabla.innerHTML += `
        <tr>
          <td>${p.codigoPersona}</td>
          <td>${p.tipoPersona}</td>
          <td>${p.fechaRegistro}</td>
        </tr>
      `;
    });

  } catch (error) {
    console.error("Error personas:", error);
  }
}

// =======================
// 2. GET ROLES ASIGNADOS
// =======================
async function cargarRolesAsignados() {
  try {
    const res = await fetch(API_ROLES_GET);
    const data = await res.json();

    const tabla = document.getElementById("tablaRoles");
    tabla.innerHTML = "";

    data.forEach(r => {
      tabla.innerHTML += `
        <tr>
          <td>${r.codigoPersona}</td>
          <td>${r.tipoDePersona}</td>
          <td>${r.rol}</td>
          <td>${r.descripcion}</td>
        </tr>
      `;
    });

  } catch (error) {
    console.error("Error roles:", error);
  }
}

// =======================
// 3. POST ASIGNAR ROL
// =======================
async function asignarRol() {
  try {
    const codigorol = document.getElementById("codigoRol").value;
    const codigoidentidad = document.getElementById("codigoPersona").value;

    if (!codigorol || !codigoidentidad) {
      alert("Completa los campos");
      return;
    }

    const url =
      `${API_ROLES_POST}?codigorol=${codigorol}` +
      `&codigoidentidad=${codigoidentidad}`;

    const res = await fetch(url, {
      method: "POST"
    });

    if (!res.ok) {
      throw new Error("Error al asignar rol");
    }

    alert("Rol asignado correctamente");

    document.getElementById("codigoRol").value = "";
    document.getElementById("codigoPersona").value = "";

    // recargar roles
    cargarRolesAsignados();

  } catch (error) {
    console.error("Error POST rol:", error);
  }
}
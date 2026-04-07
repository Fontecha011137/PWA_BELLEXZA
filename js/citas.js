/* ======================================================
   IMPORTACIONES FIREBASE
====================================================== */
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";
import { getFirestore, doc, getDoc, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

/* ======================================================
   CONFIGURACIÓN FIREBASE
====================================================== */
const firebaseConfig = {
  apiKey: "AIzaSyC7Q6Kvn0klC_OIByWIWe4-o7NiJ1D0SLQ",
  authDomain: "pwabelleza.firebaseapp.com",
  projectId: "pwabelleza"
};

/* ======================================================
   INICIALIZAR FIREBASE
====================================================== */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/* ======================================================
   CAPTURAR SERVICIO DESDE LA URL
   Ejemplo: citas.html?servicio=Manicure básico
====================================================== */
const params = new URLSearchParams(window.location.search);
const servicio = params.get("servicio");

// Mostrar servicio en el input
if (servicio) {
  document.getElementById("servicio").value = servicio;
}

/* ======================================================
   CARGAR DIRECCIONES DEL USUARIO DESDE FIRESTORE
====================================================== */
onAuthStateChanged(auth, async (user) => {

  if (!user) {
    alert("⚠️ Debes iniciar sesión para agendar");
    window.location.href = "login.html";
    return;
  }

  // Referencia al documento del usuario
  const docRef = doc(db, "usuarios", user.uid);
  const docSnap = await getDoc(docRef);

  const select = document.getElementById("direccion");

  if (docSnap.exists()) {

    const data = docSnap.data();

    // Limpiar select
    select.innerHTML = "<option value=''>Selecciona tu dirección</option>";

    // Agregar direcciones si existen
    if (data.direccion1) {
      select.innerHTML += `<option value="${data.direccion1}">${data.direccion1}</option>`;
    }

    if (data.direccion2) {
      select.innerHTML += `<option value="${data.direccion2}">${data.direccion2}</option>`;
    }

  } else {
    alert("No se encontraron datos del usuario");
  }

});

/* ======================================================
   EVENTO: GUARDAR CITA
====================================================== */
const form = document.getElementById("formCita");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;
  const direccion = document.getElementById("direccion").value;

  const user = auth.currentUser;

  /* ================= VALIDACIÓN ================= */
  if (!fecha || !hora || !direccion) {
    alert("⚠️ Completa todos los campos");
    return;
  }

  try {

    /* ================= GUARDAR EN FIRESTORE ================= */
    await addDoc(collection(db, "citas"), {
      usuarioId: user.uid,
      servicio: servicio,
      fecha: fecha,
      hora: hora,
      direccion: direccion,
      estado: "pendiente",
      fechaCreacion: new Date()
    });

    alert("✅ Cita agendada correctamente");

    form.reset();

  } catch (error) {

    console.error(error);
    alert("❌ Error al guardar la cita");

  }
  

});
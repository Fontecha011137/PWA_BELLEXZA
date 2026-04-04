/* ======================================================
   IMPORTACIONES FIREBASE (VERSIÓN MODERNA)
====================================================== */
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

/* ======================================================
   CONFIGURACIÓN FIREBASE
====================================================== */
const firebaseConfig = {
  apiKey: "AIzaSyC7Q6Kvn0klC_OIByWIWe4-o7NiJ1D0SLQ",
  authDomain: "pwabelleza.firebaseapp.com",
  projectId: "pwabelleza",
  storageBucket: "pwabelleza.firebasestorage.app",
  messagingSenderId: "36813965033",
  appId: "1:36813965033:web:9b760c75eade1e2b079278"
};

/* ======================================================
   INICIALIZAR FIREBASE
====================================================== */
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("🔥 Firebase Contacto funcionando");

/* ======================================================
   CAPTURAR FORMULARIO
====================================================== */
const form = document.getElementById("formContacto");

/* ======================================================
   EVENTO ENVIAR MENSAJE
====================================================== */
form.addEventListener("submit", async (e) => {

  e.preventDefault();

  // Obtener datos del formulario
  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  /* ======================================================
     VALIDACIÓN
  ====================================================== */
  if (!nombre || !email || !mensaje) {
    alert("⚠️ Completa los campos obligatorios");
    return;
  }

  try {

    /* ======================================================
       GUARDAR EN FIRESTORE
    ====================================================== */
    await addDoc(collection(db, "contactos"), {
      nombre,
      email,
      telefono,
      mensaje,
      fecha: new Date()
    });

    alert("✅ Mensaje enviado correctamente");

    form.reset();

  } catch (error) {

    console.error(error);
    alert("❌ Error al enviar el mensaje");

  }

});
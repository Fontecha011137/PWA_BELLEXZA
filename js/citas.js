/* ======================================================
   IMPORTACIONES FIREBASE
====================================================== */
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where 
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

/* ======================================================
   CONFIGURACIÓN
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
   INICIALIZAR
====================================================== */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/* ======================================================
   BLOQUEAR SI NO ESTÁ LOGUEADO
====================================================== */
onAuthStateChanged(auth, (user) => {
  if (!user) {
    alert("⚠️ Debes iniciar sesión para agendar");
    window.location.href = "login.html";
  }
});

/* ======================================================
   CAPTURAR SERVICIO DESDE URL
====================================================== */
const params = new URLSearchParams(window.location.search);
const servicioURL = params.get("servicio");

if (servicioURL) {
  document.getElementById("servicio").value = servicioURL;
}

/* ======================================================
   FORMULARIO
====================================================== */
const form = document.getElementById("formCita");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const servicio = document.getElementById("servicio").value;
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;
  const direccion = document.getElementById("direccion").value;

  const user = auth.currentUser;

  try {

    /* ======================================================
       VALIDAR HORARIO OCUPADO
    ====================================================== */
    const q = query(
      collection(db, "citas"),
      where("fecha", "==", fecha),
      where("hora", "==", hora)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      alert("⚠️ Este horario ya está ocupado, elige otro");
      return;
    }

    /* ======================================================
       GUARDAR CITA
    ====================================================== */
    await addDoc(collection(db, "citas"), {
      usuarioId: user.uid,
      email: user.email,
      servicio,
      fecha,
      hora,
      direccion,
      estado: "pendiente",
      fechaCreacion: new Date()
    });

    alert("✅ Cita agendada correctamente");

    /* ======================================================
       WHATSAPP
    ====================================================== */
    const mensaje = `Hola, quiero agendar una cita de ${servicio} el ${fecha} a las ${hora} en ${direccion}`;

    const url = `https://wa.me/573227257705?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");

    /* ======================================================
       GOOGLE CALENDAR
// ================= GOOGLE CALENDAR =================

// Crear fechas
const inicio = new Date(`${fecha}T${hora}`);
const fin = new Date(inicio.getTime() + 60 * 60 * 1000);

// Formato correcto
const formato = (f) => {
  return f.toISOString().replace(/[-:]/g, "").split(".")[0];
};

const fechaInicio = formato(inicio);
const fechaFin = formato(fin);

// URL MEJORADA (clave)
const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Cita Belleza - " + servicio)}&dates=${fechaInicio}/${fechaFin}&details=${encodeURIComponent("Servicio: " + servicio)}&location=${encodeURIComponent(direccion)}`;

// Abrir formulario de evento
window.open(url, "_blank");

  

  } catch (error) {

    console.error(error);
    alert("Error al agendar la cita");

  }

});
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
  deleteDoc, 
  doc 
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
   VALIDAR ADMIN
====================================================== */
onAuthStateChanged(auth, async (user) => {

  if (!user) {
    alert("⚠️ Debes iniciar sesión");
    window.location.href = "login.html";
    return;
  }

  // 🔥 IMPORTANTE: verificar rol admin
  const { doc, getDoc } = await import("https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js");

  const docRef = doc(db, "usuarios", user.uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists() || docSnap.data().rol !== "admin") {
    alert("❌ No tienes permisos de administrador");
    window.location.href = "index.html";
  }

});

/* ======================================================
   CREAR SERVICIO
====================================================== */
const form = document.getElementById("formServicio");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const precio = document.getElementById("precio").value;
  const descripcion = document.getElementById("descripcion").value;

  try {

    await addDoc(collection(db, "servicios"), {
      nombre,
      precio,
      descripcion
    });

    alert("✅ Servicio guardado");

    form.reset();
    cargarServicios();

  } catch (error) {
    console.error(error);
    alert("Error al guardar servicio");
  }

});

/* ======================================================
   MOSTRAR SERVICIOS
====================================================== */
const lista = document.getElementById("listaServicios");

async function cargarServicios() {

  lista.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "servicios"));

  querySnapshot.forEach((docu) => {

    const data = docu.data();

    const li = document.createElement("li");

    li.innerHTML = `
      ${data.nombre} - $${data.precio}
      <button onclick="eliminar('${docu.id}')">Eliminar</button>
    `;

    lista.appendChild(li);

  });

}

/* ======================================================
   ELIMINAR SERVICIO
====================================================== */
window.eliminar = async (id) => {

  await deleteDoc(doc(db, "servicios", id));
  alert("Servicio eliminado");

  cargarServicios();

};

/* ======================================================
   INICIAR
====================================================== */
cargarServicios();
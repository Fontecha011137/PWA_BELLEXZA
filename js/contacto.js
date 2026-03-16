// Configuración de Firebase (usar la tuya de Firebase Console)
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "XXXXXXX",
  appId: "XXXXXXXX"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Capturar el formulario
const form = document.getElementById('formContacto');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // Evita recarga

  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const telefono = document.getElementById('telefono').value;
  const mensaje = document.getElementById('mensaje').value;

  // Guardar mensaje en Firestore
  db.collection('contactos').add({
    nombre: nombre,
    email: email,
    telefono: telefono,
    mensaje: mensaje,
    fecha: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    alert("¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.");
    form.reset(); // Limpiar formulario
  })
  .catch((error) => {
    console.error("Error al enviar mensaje: ", error);
    alert("Ocurrió un error al enviar el mensaje. Intenta de nuevo.");
  });
});
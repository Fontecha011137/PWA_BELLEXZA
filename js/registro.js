// Configuración de Firebase
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

const auth = firebase.auth();
const db = firebase.firestore();

// Capturar el formulario
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // evitar recarga

  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const telefono = document.getElementById('telefono').value;

  // Crear usuario en Firebase Authentication
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Guardar info adicional en Firestore
      db.collection('usuarios').doc(user.uid).set({
        nombre: nombre,
        email: email,
        telefono: telefono,
        fechaRegistro: new Date()
      });

      alert('¡Registro exitoso!');
      form.reset();
    })
    .catch((error) => {
      console.error(error);
      alert(error.message);
    });
});
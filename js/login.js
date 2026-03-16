// Configuración de Firebase (copiar la tuya de Firebase Console)
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

// Capturar el formulario
const form = document.getElementById('formLogin');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // Evita recarga

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert(`¡Bienvenido ${user.email}!`);
      
      // Redirigir al usuario a la página principal de la PWA
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error(error);
      alert(error.message);
    });
});

// Verificar si el usuario ya está logueado
auth.onAuthStateChanged((user) => {
  if(user){
    console.log("Usuario ya logueado:", user.email);
    // Si quieres, puedes redirigir automáticamente
    // window.location.href = "index.html";
  }
});
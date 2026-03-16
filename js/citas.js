//// CONFIGURACIÓN DE FIREBASE (usar tu propia configuración) ////
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

//// LOGOUT - BOTÓN SALIR ////
const logoutBtn = document.getElementById('logout');

logoutBtn.addEventListener('click', () => {
  auth.signOut()
    .then(() => {
      alert('Sesión cerrada con éxito');
      window.location.href = "login.html"; // Redirige al login
    })
    .catch(error => {
      console.error('Error al cerrar sesión:', error);
      alert('Error al cerrar sesión. Intenta nuevamente.');
    });
});

//// FULLCALENDAR - CALENDARIO DE CITAS ////
document.addEventListener('DOMContentLoaded', function() {
  const calendarEl = document.getElementById('calendar');

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'es',

    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: '' // Botones de vista se moverán al footer para móviles
    },

    footerToolbar: {
      center: 'dayGridMonth,timeGridWeek,timeGridDay'
    },

    
  });

  calendar.render();
});

//// VERIFICAR USUARIO LOGUEADO ////
auth.onAuthStateChanged(user => {
  if(!user){
    // Si no hay usuario logueado, redirigir al login
    window.location.href = "login.html";
  } else {
    console.log("Usuario logueado:", user.email);
  }
});
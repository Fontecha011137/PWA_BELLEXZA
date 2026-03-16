document.addEventListener('DOMContentLoaded', function(){

  var calendarEl = document.getElementById('calendar');

  function createCalendar() {
    // Detecta si es móvil (pantalla < 576px)
    var isMobile = window.innerWidth < 576;

    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      locale: 'es',

      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: isMobile ? '' : 'dayGridMonth,timeGridWeek,timeGridDay'
      },

      footerToolbar: {
        center: isMobile ? 'dayGridMonth,timeGridWeek,timeGridDay' : ''
      },

      events: [
        { title: 'Depilación cejas - Ana', start: '2026-06-12T10:00:00' },
        { title: 'Axilas - Laura', start: '2026-06-13T11:00:00' }
      ]
    });

    calendar.render();
  }

  // Crear calendario al cargar
  createCalendar();

  // Si redimensionamos la ventana, recarga para reorganizar botones
  window.addEventListener('resize', function() {
    calendarEl.innerHTML = ''; // borra calendario anterior
    createCalendar();
  });

});
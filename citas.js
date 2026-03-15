document.addEventListener('DOMContentLoaded', function(){

var calendarEl = document.getElementById('calendar');

var calendar = new FullCalendar.Calendar(calendarEl, {

initialView: 'dayGridMonth',

locale: 'es',

events: [
{
title: 'Depilación cejas - Ana',
start: '2026-06-12T10:00:00'
},
{
title: 'Axilas - Laura',
start: '2026-06-13T11:00:00'
}
]

});

calendar.render();

});
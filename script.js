document.addEventListener("DOMContentLoaded", function() {
    var audio = document.getElementById("audioPlayer");
    var playPauseButton = document.getElementById("playPauseButton");
    var iconoPlayPause = document.getElementById("iconoPlayPause");
    var progressBar = document.getElementById("progress-bar");
    var currentTimeDisplay = document.getElementById("current-time");
    var durationTimeDisplay = document.getElementById("duration-time");

    var modal = document.getElementById('photo-modal');
    var seal = document.getElementById("seal");
    let currentSlide = 0;   
    const wishes = [];

    // Función para abrir el sobre y reproducir la música
    function openEnvelopeAndPlayMusic() {
        var envelopeTop = document.getElementById("envelope-top");
        var envelopeBottom = document.getElementById("envelope-bottom");
        var envelope = document.getElementById("envelope");
        var invitation = document.getElementById("invitation");
      
        envelopeTop.style.transform = 'translateY(-100vh)';
        envelopeBottom.style.transform = 'translateY(100vh)';
      
        setTimeout(function() {
            envelope.classList.add('hidden');
            invitation.classList.remove('hidden');
        }, 1000);
      
        audio.play().then(function() {
            iconoPlayPause.classList.remove("fa-play");
            iconoPlayPause.classList.add("fa-pause");
            updateProgress(); 
        }).catch(function(error) {
            console.log('Playback failed: ', error);
            iconoPlayPause.classList.add("fa-play");
            iconoPlayPause.classList.remove("fa-pause");
        });
      }
      
      // 👇 Esta línea es la clave:
      window.openEnvelopeAndPlayMusic = openEnvelopeAndPlayMusic;
      

    // ✅ Solo un listener para el sello (corregido)
    seal.addEventListener("click", function(event) {
        event.stopPropagation();
        seal.disabled = true; // evita múltiples clics
        openEnvelopeAndPlayMusic();
    });

    function togglePlayPause() {
        if (!audio || !iconoPlayPause) return;

        requestAnimationFrame(() => {
            iconoPlayPause.classList.toggle("fa-play");
            iconoPlayPause.classList.toggle("fa-pause");
        });

        setTimeout(() => {
            if (audio.paused) {
                audio.play().catch(console.error);
            } else {
                audio.pause();
            }
        }, 50);
    }

    function updateProgress() {
        audio.addEventListener("timeupdate", function() {
            var progress = (audio.currentTime / audio.duration) * 100;
            progressBar.value = progress;

            var currentMinutes = Math.floor(audio.currentTime / 60);
            var currentSeconds = Math.floor(audio.currentTime % 60);
            currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;

            if (!isNaN(audio.duration)) {
                var durationMinutes = Math.floor(audio.duration / 60);
                var durationSeconds = Math.floor(audio.duration % 60);
                durationTimeDisplay.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' + durationSeconds : durationSeconds}`;
            }
        });
    }

    progressBar.addEventListener("input", function() {
        var newTime = (progressBar.value / 100) * audio.duration;
        audio.currentTime = newTime;
    });

    playPauseButton.addEventListener("click", function() {
        togglePlayPause();
    });

    const targetDate = new Date('2025-12-27T00:16:00').getTime();
    const countdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days < 10 ? '0' + days : days;
        document.getElementById('hours').textContent = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').textContent = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').textContent = seconds < 10 ? '0' + seconds : seconds;

        if (distance < 0) {
            clearInterval(countdown);
            document.querySelector('.countdown').textContent = "Gracias por habernos acompañado en este día tan especial.";
        }
    }, 1000);

    // Aparición de textos con scroll
    const elementsToFade = document.querySelectorAll('.fade-in-element');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    elementsToFade.forEach(element => {
        const delay = [...elementsToFade].indexOf(element) * 0.05;
        element.style.transitionDelay = `${delay}s`;
        observer.observe(element);
    });

    // Galería
    document.querySelector('.close').addEventListener('click', closeModal);
    document.getElementById('photo-modal').addEventListener('click', function(event) {
        if (event.target === this) {
            closeModal();
        }
    });

    // Optimización visual
    document.querySelector(".title").classList.add("visible");

    // Buenos deseos
    function displayWishes() {
        const wishesDiv = document.getElementById('wishes');
        wishesDiv.innerHTML = wishes.map(wish => `<p><strong>${wish.name}:</strong> ${wish.message}</p>`).join('');
    }

    function toggleWishForm() {
        document.getElementById('wish-form').classList.toggle('hidden');
    }

    function toggleWishes() {
        const wishesDiv = document.getElementById('wishes');
        wishesDiv.classList.toggle('hidden');
      }      

      window.toggleWishes = toggleWishes;


    window.changePhoto = function(element) {
        const mainPhotoModal = document.getElementById('main-photo');
        const mainPhoto = document.getElementById('main-photo-modal');
        mainPhoto.src = element.src;
        mainPhotoModal.src = element.src;
        if (element !== mainPhoto) {
            openModal();
        }
    }

    function openModal() {
        document.getElementById('photo-modal').style.display = 'block';
    }

    function closeModal() {
        document.getElementById('photo-modal').style.display = 'none';
    }

    window.toggleDetails = function() {
        var details = document.getElementById("accountDetails");
        details.style.display = (details.style.display === "none" || details.style.display === "") ? "block" : "none";
    }

    window.submitWish = submitWish;
    window.toggleWishForm = toggleWishForm;
    window.toggleWishes = toggleWishes;
});

document.getElementById("calendar-button").addEventListener("click", function() {
    const calendarUrl = "https://www.google.com/calendar/render?action=TEMPLATE&text=Nos+casamos+Rosy+y+Javier&dates=20251227T220000Z/20251228T060000Z&details=¡Acompáñanos+a+celebrar+nuestra+boda!+Será+un+día+inolvidable+💍✨&location=%2C+Guatemala&ctz=America%2FGuatemala";
    window.open(calendarUrl, "_blank");
  });

  // Mostrar tooltip 1 segundo después de cargar la invitación
window.addEventListener("load", function() {
    const tooltip = document.getElementById("sealTooltip");

    setTimeout(() => {
        tooltip.classList.add("show");

        // Lo ocultamos después de 3 segundos si quieres
        setTimeout(() => {
            tooltip.classList.remove("show");
        }, 3000);

    }, 1000); // 1 segundo después de cargar
});
function precargarRSVP() {
    if (!guest) return;

    document.getElementById("rsvp-name").value = guest.name;
    document.getElementById("rsvp-passes").value = guest.passes;
}

//RSVP//
// ======================================================
// RSVP — FORMULARIO DE CONFIRMACIÓN
// ======================================================

// ====== INPUTS DEL FORMULARIO ======
const rsvpName = document.getElementById('rsvp-name');
const rsvpPasses = document.getElementById('rsvp-passes');
const rsvpAdultos = document.getElementById('rsvp-adultos');
const rsvpNinos = document.getElementById('rsvp-ninos');
const rsvpAsistencia = document.getElementById('rsvp-asistencia');

// ====== BOTONES Y MENSAJES ======
const confirmButton = document.getElementById('confirm-button');
const rsvpForm = document.getElementById('rsvp-form');
const submitBtn = document.getElementById("submit-rsvp");
const msg = document.getElementById("rsvp-message");

// ====== EVENTO PARA ABRIR FORMULARIO ======
confirmButton.addEventListener("click", () => {

    if (!guest) {
        alert("No se encontró información del invitado.");
        return;
    }

    // Pre-cargar información del invitado
    rsvpName.value = guest.name;
    rsvpPasses.value = guest.passes;

    // Mostrar formulario RSVP
    rsvpForm.classList.remove("hidden");
});

// ====== VALIDACIÓN DE PASES ======
function validatePases() {
    const total = Number(rsvpAdultos.value) + Number(rsvpNinos.value);
    if (total > Number(rsvpPasses.value)) {
        alert("No puede exceder la cantidad de pases asignados.");
        rsvpAdultos.value = "";
        rsvpNinos.value = "";
    }
}

rsvpAdultos.addEventListener("input", validatePases);
rsvpNinos.addEventListener("input", validatePases);

// ====== ENVÍO A GOOGLE SHEETS ======
submitBtn.addEventListener("click", async () => {

    const data = {
        id: guest.id,
        nombre: guest.name,
        pases: guest.passes,
        adultos: rsvpAdultos.value,
        ninos: rsvpNinos.value,
        asistencia: rsvpAsistencia.value,
        link: window.location.href,
        fecha: new Date().toLocaleDateString(),
        hora: new Date().toLocaleTimeString()
    };

    const scriptURL = "https://script.google.com/macros/s/AKfycbxB8cmd2Z51hSZnPikYi2yVkgyU5F8JRNaP4xy87lj8tikf3nEXZHnskiS9A69FYqpY/exec";

const response = await fetch(scriptURL, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
});
    // Confirmación nueva — éxito
    msg.textContent = "¡Hemos recibido su respuesta, gracia!";
    msg.classList.remove("hidden");

    submitBtn.disabled = true;
    confirmButton.disabled = true;
});




const guests = [
    { id: "1", name: "Ana María López", passes: 1, gender: "F"},
    { id: "2", name: "Hugo Valle", passes: 1, gender: "F"},
    { id: "3", name: "Fam. Ramos López", passes: 3 },
  ];
  
  document.addEventListener("DOMContentLoaded", function() {
    function getQueryParams() {
        const params = {};
        const queryString = window.location.search.substring(1);
        const pairs = queryString.split("&");
        for (const pair of pairs) {
            const [key, value] = pair.split("=");
            params[decodeURIComponent(key)] = decodeURIComponent(value.replace(/\+/g, ' '));
        }
        return params;
    }

    const queryParams = getQueryParams();
    const guestId = queryParams.id;
    const guest = guests.find(g => g.id === guestId);

    if (guest) {
        let message = "";

        // --- Determinar texto principal según pases y género ---
        if (guest.passes === "Tenemos un lugar especial para ti") {
            message = `¡${guest.name}, gracias por ser parte de nuestra historia! 💖`;
        } else if (guest.passes === 1) {
            if (guest.gender === "F") {
                message = `¡${guest.name}, estás invitada!`;
            } else {
                message = `¡${guest.name}, estás invitado!`;
            }
        } else if (guest.passes > 1) {
            if (guest.gender === "F") {
                message = `¡${guest.name}, están invitadas!`;
            } else {
                message = `¡${guest.name}, están invitados!`;
            }
        } else {
            message = `¡${guest.name}, estás invitado(a)!`;
        }

        // Mostrar el nombre y mensaje
        document.getElementById('guest-name').textContent = message;

        // --- Mostrar u ocultar sección de pases ---
        if (guest.passes === "Tenemos un lugar especial para ti") {
            document.querySelector('.invitation-info-section').style.display = 'none';
        } else {
            document.querySelector('.invitation-info-section').style.display = 'block';
            document.getElementById('passes').textContent = `${guest.passes} ${guest.passes === 1 ? 'pase' : 'pases'}`;
        }

    } else {
        document.getElementById('guest-name').textContent = `¡Invitado no encontrado!`;
        document.querySelector('.invitation-info-section').style.display = 'none';
    }
// --- Generar enlace dinámico al formulario de confirmación ---
const formBaseUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfPYWliJGV8YMKEhpInKFCd2hcJ0eTdcjffo6QHWY2tXBA6gw/viewform?usp=pp_url";

const encodedName = encodeURIComponent(guest.name);
const encodedPasses = encodeURIComponent(guest.passes);

const formUrl = `${formBaseUrl}&entry.42292443=${encodedName}&entry.800985369=${encodedPasses}`;

// Asignar URL dinámico al botón
const confirmButton = document.getElementById('confirm-button');
confirmButton.onclick = function() {
    location.href = formUrl;
};


});

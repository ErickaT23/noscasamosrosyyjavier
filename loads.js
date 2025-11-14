let guest = null; // GLOBAL

const guests = [
    { id: "1", name: "Ana María López", passes: 1, gender: "F"},
    { id: "2", name: "Hugo Valle", passes: 1, gender: "M"},
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

    guest = guests.find(g => g.id === guestId);

    if (!guest) {
        document.getElementById("guest-name").textContent = "Invitado no encontrado";
        return;
    }

    // Mostrar mensaje principal
    let message = guest.passes === 1
        ? `¡${guest.name}, estás invitado(a)!`
        : `¡${guest.name}, están invitados!`;

    document.getElementById("guest-name").textContent = message;

    // Mostrar pases
    document.getElementById("passes").textContent =
        `${guest.passes} ${guest.passes === 1 ? "pase" : "pases"}`;

// Mostrar pases
document.getElementById("passes").textContent =
    `${guest.passes} ${guest.passes === 1 ? "pase" : "pases"}`;

// ❌ NO llamar precargarRSVP aquí

});



let guest = null; // GLOBAL

const guests = [
    { id: "1", name: "Familia Hernández Recinos", passes: 5, gender: "M"},
    { id: "2", name: "Hugo Valle", passes: 1, gender: "M"},
    { id: "3", name: "Fam. Ramos López", passes: 3 },
];

document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const guestId = params.get("id");
    const guest = guests.find(g => g.id === guestId);
  
    if (!guest) {
      document.getElementById("guest-name").textContent = "Invitado no encontrado";
      return;
    }
  
    // Mostrar mensaje personalizado
    let message = guest.passes === 1
      ? `¡${guest.name}, estás invitado(a)!`
      : `¡${guest.name}, están invitados!`;
    document.getElementById("guest-name").textContent = message;
  
    // Mostrar cantidad de pases
    document.getElementById("passes").textContent =
      `${guest.passes} ${guest.passes === 1 ? "pase" : "pases"}`;
  
    // Generar URL dinámica con datos prellenados
    const formBase = "https://docs.google.com/forms/d/e/1FAIpQLSfPYWliJGV8YMKEhpInKFCd2hcJ0eTdcjffo6QHWY2tXBA6gw/viewform?usp=pp_url";
    const formLink = `${formBase}&entry.42292443=${encodeURIComponent(guest.name)}&entry.800985369=${guest.passes}`;
  
    // Asignar URL al botón
    const linkBtn = document.getElementById("confirmar-link");
    if (linkBtn) {
      linkBtn.href = formLink;
    }
  });
  



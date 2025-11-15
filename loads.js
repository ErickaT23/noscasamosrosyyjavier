let guest = null; // GLOBAL

const guests = [
  { id: "1", name: "Familia Hernández Recinos", passes: 5, gender: "M" },
  { id: "2", name: "Familia Hernández Garcia", passes: 4, gender: "M" },
  { id: "3", name: "Fam. Ramos López", passes: 3 }
];

const formLinks = {
  1: "https://docs.google.com/forms/d/e/1FAIpQLSfklc_wufkbg_lZY-ht4VluFA7JYYrebbCEpnIvAUdqw5qAaw/viewform?usp=pp_url&entry.42292443=",
  2: "https://docs.google.com/forms/d/e/1FAIpQLSemPpb1mduSQx_VP5eQwnWHyxmJlFQpPArE3tssouArka8o0A/viewform?usp=pp_url&entry.42292443=",
  3: "https://docs.google.com/forms/d/e/1FAIpQLSfI3DWCY0Rk-8ODCk1Li40EN2uwzlc14mVC2zKbjJ4jAjB10A/viewform?usp=pp_url&entry.42292443=",
  4: "https://docs.google.com/forms/d/e/1FAIpQLSdYYBTrlBqNS7JQO4kszazr8rlY0eBTWBk-7Hzv0CPcl3QyvQ/viewform?usp=pp_url&entry.42292443=",
  5: "https://docs.google.com/forms/d/e/1FAIpQLSfPYWliJGV8YMKEhpInKFCd2hcJ0eTdcjffo6QHWY2tXBA6gw/viewform?usp=pp_url&entry.42292443="
};

document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const guestId = params.get("id");
  guest = guests.find(g => g.id === guestId);

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

  // Obtener base del formulario según la cantidad de pases
  const formBase = formLinks[guest.passes];

  // Generar el link prellenado con el nombre
  let formLink = formBase + encodeURIComponent(guest.name);

  // Solo para el formulario de 5 pases, agregar también el número de pases en otro campo
  if (guest.passes === 5) {
    formLink += `&entry.800985369=${guest.passes}`;
  }

  // Asignar URL al botón
  const linkBtn = document.getElementById("confirmar-link");
  if (linkBtn) {
    linkBtn.href = formLink;
  }
});




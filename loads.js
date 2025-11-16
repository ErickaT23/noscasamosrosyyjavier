let guest = null; // GLOBAL

const guests = [
  { id: "1", name: "Familia Hernández Recinos", passes: 5 },
  { id: "2", name: "Familia Hernández Garcia", passes: 4 },
  { id: "3", name: "Familia Hernández Sánchez", passes: 2 },
  { id: "4", name: "Familia Marroquín Hernández", passes: 4 },
  { id: "5", name: "Familia Aguirre Hernández", passes: 6 },
  { id: "6", name: "Esposos Gonzalez Hernández", passes: 2 },
  { id: "7", name: "Familia Barrientos Quevedo", passes: 5 },
  { id: "8", name: "Familia Arana Hernández", passes: 4 },
  { id: "9", name: "Esposos Hernández Campos", passes: 2 },
  { id: "10", name: "Familia Hernández Revolorio", passes: 2 },
  { id: "11", name: "Familia Ruiz Castro", passes: 4 },
  { id: "12", name: "Esposos Ochoa Ramírez", passes: 2 },
  { id: "13", name: "Sara Cárcamo", passes: 1 },
  { id: "14", name: "Esposos Rodas Ramírez", passes: 2 },
  { id: "15", name: "Julio Alberto Soto", passes: 1 },
  { id: "16", name: "Familia Revolorio Barrientos", passes: 4 },
  { id: "17", name: "Joaquina Quiñonez", passes: 1 },
  { id: "18", name: "Familia Salguero Magaña", passes: 3 },
  { id: "19", name: "Esposos Matozo Salguero", passes: 2 },
  { id: "20", name: "Lorena Corado", passes: 1 },
  { id: "21", name: "Gladys Corado", passes: 1 },
  { id: "22", name: "Esposos Cordón Recinos", passes: 2 },
  { id: "23", name: "Ana María Ortiz", passes: 2 },
  { id: "24", name: "Esposos Quezada Vides", passes: 2 },
  { id: "25", name: "Max Barrios", passes: 2 },
  { id: "26", name: "Familia Monterroso Morales", passes: 3 },
  { id: "27", name: "Francisco Monterroso", passes: 2 },
  { id: "28", name: "Familia Linares Ruiz", passes: 4 },
  { id: "29", name: "Esposos Villalta Vásquez", passes: 2 },
  { id: "30", name: "Carlos Villalta", passes: 2 },
  { id: "31", name: "Sandra Villalta", passes: 4 },
  { id: "32", name: "Familia Villalta Celis", passes: 3 },
  { id: "33", name: "Familia Villalta Galindo", passes: 3 },
  { id: "34", name: "Esposos Vásquez Galindo", passes: 2 },
  { id: "35", name: "Alejandra Vásquez", passes: 2 },
  { id: "36", name: "Celina Vásquez", passes: 4 },
  { id: "37", name: "Familia Vásquez Hernández", passes: 5 },
  { id: "38", name: "Familia Toledo Vásquez", passes: 4 },
  { id: "39", name: "Esposos Guerrero Toledo", passes: 2 },
  { id: "40", name: "Familia Monterroso Solorzano", passes: 5 },
  { id: "41", name: "Ernesto Monterroso", passes: 2 },
  { id: "42", name: "Rosita Vásquez", passes: 1 },
  { id: "43", name: "Familia Ruiz Vásquez", passes: 4 },
  { id: "44", name: "Roberto Ruiz", passes: 1 },
  { id: "45", name: "Andrés Vásquez", passes: 2 },
  { id: "46", name: "Familia Bennet Monterroso", passes: 3 },
  { id: "47", name: "Esposos Vásquez Villalta", passes: 2 },
  { id: "48", name: "Familia Vásquez Quiñonez", passes: 4 },
  { id: "49", name: "Rosario Vásquez", passes: 3 },
  { id: "50", name: "Vásquez Villalta", passes: 2 },
  { id: "51", name: "Familia  Hernández Corado", passes: 4 },
  { id: "52", name: "Familia Hernández Méndez ", passes: 4 },
  { id: "53", name: "Familia Enriquez Hernández ", passes: 3 },
  { id: "54", name: "José Ramón Hernández", passes: 1 },
  { id: "55", name: "Carlos Danilo Hernández", passes: 2 }
];

const formLinks = {
  1: "https://docs.google.com/forms/d/e/1FAIpQLSfklc_wufkbg_lZY-ht4VluFA7JYYrebbCEpnIvAUdqw5qAaw/viewform?usp=pp_url&entry.42292443=",
  2: "https://docs.google.com/forms/d/e/1FAIpQLSemPpb1mduSQx_VP5eQwnWHyxmJlFQpPArE3tssouArka8o0A/viewform?usp=pp_url&entry.42292443=",
  3: "https://docs.google.com/forms/d/e/1FAIpQLSfI3DWCY0Rk-8ODCk1Li40EN2uwzlc14mVC2zKbjJ4jAjB10A/viewform?usp=pp_url&entry.42292443=",
  4: "https://docs.google.com/forms/d/e/1FAIpQLSdYYBTrlBqNS7JQO4kszazr8rlY0eBTWBk-7Hzv0CPcl3QyvQ/viewform?usp=pp_url&entry.42292443=",
  5: "https://docs.google.com/forms/d/e/1FAIpQLSfPYWliJGV8YMKEhpInKFCd2hcJ0eTdcjffo6QHWY2tXBA6gw/viewform?usp=pp_url&entry.42292443=",
  6: "https://docs.google.com/forms/d/e/1FAIpQLSdkKKYvyWevItZRI0hkH239guUN6ZuyUFdYVRnUxtkNdZUimQ/viewform?usp=pp_url&entry.42292443="
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




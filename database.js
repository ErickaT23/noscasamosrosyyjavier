// Importar Firebase y Realtime Database
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";

// ✅ Configuración completa y corregida
const firebaseConfig = {
  apiKey: "AIzaSyB7ym9PNUnrgxhd7x2Q7ChZ78ukZRlYTj4",
  authDomain: "mis-quince-melanie.firebaseapp.com",
  databaseURL: "https://mis-quince-melanie-default-rtdb.firebaseio.com",
  projectId: "mis-quince-melanie",
  storageBucket: "mis-quince-melanie.firebasestorage.app",
  messagingSenderId: "760773196747",
  appId: "1:760773196747:web:304bbc540e5beb383b944e"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
console.log("✅ Firebase conectado correctamente!");

// Función para enviar un buen deseo
window.submitWish = function () {
  const name = document.getElementById("wish-name").value.trim();
  const message = document.getElementById("wish-message").value.trim();

  if (name !== "" && message !== "") {
    push(ref(db, "buenos-deseos/"), {
      nombre: name,
      mensaje: message,
      timestamp: new Date().toISOString()
    })
    .then(() => {
      console.log("✔️ Deseo guardado correctamente en Firebase");
      document.getElementById("wish-name").value = "";
      document.getElementById("wish-message").value = "";
      alert("¡Tu buen deseo ha sido enviado! 🌟");
    })
    .catch((error) => {
      console.error("❌ Error al guardar el deseo:", error);
    });
  } else {
    alert("Por favor, completa ambos campos antes de enviar.");
  }
};

// Cargar y mostrar buenos deseos al abrir la página
window.addEventListener('DOMContentLoaded', () => {
  const wishesDiv = document.getElementById("wishes");
  const wishesRef = ref(db, "buenos-deseos/");

  onValue(wishesRef, (snapshot) => {
    wishesDiv.innerHTML = "";
    snapshot.forEach((childSnapshot) => {
      const wish = childSnapshot.val();
      const wishElement = document.createElement("p");
      wishElement.innerHTML = `<strong>${wish.nombre}:</strong> ${wish.mensaje}`;
      wishesDiv.appendChild(wishElement);
    });
  });
});

// Mostrar/ocultar el formulario
window.toggleWishForm = function () {
  document.getElementById("wish-form").classList.toggle("hidden");
};
// Mostrar / ocultar lista de mensajes
window.toggleWishes = function () {
  document.getElementById("wishes").classList.toggle("hidden");
};

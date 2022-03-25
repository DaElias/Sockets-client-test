// console.log("Inicio de la app!!");
const socketCliente = io();
// Objetos html
const lblOnline = document.getElementById("lblOnline");
const lblOffline = document.getElementById("lblOffline");
const btnEnviar = document.getElementById("btnEnviar");
const inputMensaje = document.getElementById("inputMensaje");

socketCliente.on("enviar-mensaje", (payload) => {
  if (socketCliente.id !== payload.id) {
    console.log(payload);
  }
});

//code
socketCliente.on("connect", () => {
  //   console.log("Conecetado!!");
  lblOffline.style.display = "none";
  lblOnline.style.display = "";
});

socketCliente.on("disconnect", () => {
  //   console.log("Desconectado!!");
  lblOnline.style.display = "none";
  lblOffline.style.display = "";
});
//addEventListenets
btnEnviar.addEventListener("click", () => {
  const mensaje = inputMensaje.value;
  const payload = {
    mensaje,
    id: socketCliente.id,
    fecha: new Date().getTime(),
  };
  socketCliente.emit("enviar-mensaje", payload, (id) => console.log(id));
  inputMensaje.value = "";
});

// console.log("Inicio de la app!!");
const socketCliente = io();
// Objetos html
const lblOnline = document.getElementById("lblOnline");
const lblOffline = document.getElementById("lblOffline");
const btnEnviar = document.getElementById("btnEnviar");
const inputMensaje = document.getElementById("inputMensaje");
const colorChat = generateRandomCode();
const barradeChat = document.getElementById("barradeChat");
const cuadrado = document.getElementById("cuadrado");
const textColor = document.getElementById("textColor");

textColor.style.backgroundColor = colorChat;
textColor.style.color = colorChat;
socketCliente.on("enviar-mensaje", (payload) => {
  // if (socketCliente.id !== payload.id) {
  //   console.log(payload);
  // }
  barradeChat.innerHTML += `
  <hr><p>
      <div style="width: 20px; height: 20px; background-color:${payload.color};"> </div>
      Mensaje: ${payload.mensaje}  </p>`;
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
    color: colorChat,
  };
  socketCliente.emit("enviar-mensaje", payload, (payload) => {
    barradeChat.innerHTML += `
    <hr><p>
        <div style="width: 20px; height: 20px; background-color:${payload.color};"> </div>
        Mensaje: ${payload.mensaje}  </p>`;
  });
  inputMensaje.value = "";
});

function generateRandomCode() {
  var myRandomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  return myRandomColor;
}

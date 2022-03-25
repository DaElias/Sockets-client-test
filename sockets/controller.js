const socketController = (socket) => {
  //   console.log("Cliente conectado!!");
  socket.on("disconnect", () => {
    console.log("Usuario desconectado!!");
  });

  socket.on("enviar-mensaje", (payload, callback) => {
    socket.broadcast.emit("enviar-mensaje", payload);
    callback(payload); //solo nosotros lo podemos recibir
  });
};

module.exports = { socketController };

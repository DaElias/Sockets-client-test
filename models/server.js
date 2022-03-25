require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { socketController } = require("../sockets/controller");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.server = require("http").createServer(this.app);
    this.io = require("socket.io")(this.server);

    this.paths = {};

    //middelware
    this.middelware();

    //Eventos por socket
    this.socket();
  }

  socket() {
    this.io.on("connection", (socket) => {
      socketController(socket);
    });
  }
  middelware() {
    //corse
    this.app.use(cors());

    //* directorio publico
    this.app.use(express.static("public"));
  }

  listen() {
    this.server.listen(this.port, () =>
      console.log(`Servideor Corriendo en http://localhost:${this.port}/`)
    );
  }
}

module.exports = Server;

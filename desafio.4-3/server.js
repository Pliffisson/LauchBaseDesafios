const express = require("express");
const nunjucks = require("nunjucks");
const routes = require("./routes");

const server = express();

// ============ Usando Middlewares ===============
server.use(express.urlencoded({ extended: true })); // Responsavel por funcionar o req.body
server.use(express.static("public")); // Carregando a estilização da pagina
server.use(routes);

// =============== Usando o template engine ==========
server.set("view engine", "njk");

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true,
});

// ======== Servidor ===========
server.listen(5000, function () {
  console.log("server is running");
});

const express = require("express");
const app = express();

/// Configuração da rotas
app.get("/", function (req, res) {
  return res.send("Seja bem vindo ao express!");
});

/// Porta do sevidor express
app.listen(3001, function () {
  console.log("Servidor esta sendo excutado");
});

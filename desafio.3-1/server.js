const express = require("express");
const nunjucks = require("nunjucks");

//Chamando o servidor express
const app = express();

//Entregando arquivos estaticos no express
app.use(express.static("public"));
app.set("view engine", "njk");

//Configuração da template engine
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

/// Configuração da rotas
app.get("/", function (req, res) {
  return res.render("about");
});

app.get("/courses", function (req, res) {
  return res.render("courses");
});

/// Porta do sevidor express
app.listen(3001, function () {
  console.log("Servidor esta sendo excutado");
});

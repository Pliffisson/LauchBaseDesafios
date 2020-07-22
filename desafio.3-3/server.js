const express = require("express");
const nunjucks = require("nunjucks");

//Chamando o servidor express
const app = express();

// Exportando o modulo de data.js
const pages = require("./data");

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
  return res.render("courses");
});

/// Configuração de um route params
app.get("/courses/:id", function (req, res) {
  const id = req.params.id;

  const page = pages.find(function (page) {
    return page.id == id;
  });

  if (!page) {
    return res.send(`Page is not found`);
  }

  return res.render("page", { item: page });
});

app.get("/about", function (req, res) {
  return res.render("about");
});

app.use(function (req, res) {
  res.status(404).render("not-found");
});

/// Porta do sevidor express
app.listen(3001, function () {
  console.log("Servidor esta sendo excutado");
});

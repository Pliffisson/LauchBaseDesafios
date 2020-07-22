const express = require("express");
const routes = express.Router();

// =========== Criando as rotas do site =============
routes.get("/", function (req, res) {
  return res.redirect("/teachers");
});

routes.get("/teachers", function (req, res) {
  return res.render("teachers/index");
});

routes.get("/teachers/create", function (req, res) {
  return res.render("teachers/create");
});

routes.get("/students", function (req, res) {
  return res.render("students");
});

module.exports = routes;

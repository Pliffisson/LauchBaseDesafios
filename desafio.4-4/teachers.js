const fs = require("fs");
const data = require("./data.json");
const { age, graduation } = require("./utils");

exports.show = function (req, res) {
  const { id } = req.params;

  const foundTeachers = data.teachers.find(function (teacher) {
    return teacher.id == id;
  });

  if (!foundTeachers) {
    return res.send("Professor(a) não encontrado no sistema");
  }

  //Organizar os dados
  const teacher = {
    ...foundTeachers,
    age: age(foundTeachers.birth),
    graduation: graduation(foundTeachers.area),
    area: foundTeachers.area.split(","),
    created_at: new Intl.DateTimeFormat("pt-BR").format(
      foundTeachers.created_at
    ),
  };

  return res.render("teachers/show", { teacher });
};

exports.post = function (req, res) {
  //Validação de todos os campos do formulário
  const keys = Object.keys(req.body);
  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Preencha todos os campos do formuçário");
    }
  }

  let { avatar_url, name, birth, grau, distancia, area } = req.body;

  birth = Date.parse(birth);
  created_at = Date.now();
  id = Number(data.teachers.length + 1);

  data.teachers.push({
    id,
    avatar_url,
    name,
    birth,
    grau,
    distancia,
    area,
    created_at,
  });

  // Criando o arquivo 'data.json' para armazenar os dados
  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) throw err;
    console.log("Error na gravação do arquivo");

    return res.redirect("/teachers");
  });
};

const fs = require("fs");
const data = require("./data.json");
const { age, date } = require("./utils");

exports.index = function (req, res) {
  return res.render("teachers/index", {teachers: data.teachers});
}

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
    graduation: foundTeachers.grau,
    area: foundTeachers.area.split(","),
    created_at: new Intl.DateTimeFormat("pt-BR").format(
      foundTeachers.created_at
    ),
  };

  return res.render("teachers/show", { teacher });
};

exports.create = function (req, res) {
  return res.render("teachers/create");
}

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

exports.edit = function (req, res) {
  //Busca o professor
  const { id } = req.params;
  const foundTeachers = data.teachers.find(function (teacher) {
    return teacher.id == id;
  });

  if (!foundTeachers) {
    return res.send("Professor(a) não encontrado no sistema");
  }

  const teacher = {
    ...foundTeachers,
    birth: date(foundTeachers.birth),
  };

  //Renderizar a pagina de editar do professor
  return res.render("teachers/edit", { teacher });
};

exports.put = function (req, res){
  const { id } = req.body;
  let index = 0

  const foundTeachers = data.teachers.find(function (teacher, foundIndex) {
    if (id == teacher.id){
      index == foundIndex
      return true
    }
  });

  if (!foundTeachers) return res.send("Professor(a) não encontrado no sistema");
  
  const teacher = {
    ...foundTeachers,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id)
  }

  data.teachers[index] = teacher

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err) return res.send("Erro ao gravar o arquivo")

    return res.redirect(`/teachers/${id}`)
  })

}

exports.delete = function(req, res){
  const { id } = req.body
  const filteredTeachers = data.teachers.filter(function(teacher){
    return teacher.id != id
  })

  data.teachers = filteredTeachers

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if (err) return res.send("Erro na gravação do arquivo")

    return res.redirect("/teachers")
  })
}

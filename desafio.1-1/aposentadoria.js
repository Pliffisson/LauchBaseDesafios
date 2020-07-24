const nome = "Carlos";
const sexo = "F";
const idade = 55;
const contribuicao = 34;

const aposentadoria = idade + contribuicao;

const homemaposenta = sexo == "M" && contribuicao >= 35 && aposentadoria >= 95;
const mulheraposenta = sexo == "F" && contribuicao >= 30 && aposentadoria >= 85;

if (homemaposenta || mulheraposenta) {
  console.log(`${nome}, voçê pode se aposentar`);
} else {
  console.log(`${nome}, voçê não pode se aposentar`);
}

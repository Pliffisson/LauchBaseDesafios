const nome = "Carlos";
const peso = 120;
const altura = 1.88;

const IMC = peso / (altura * altura);

if (IMC >= 30) {
  console.log(`${nome}, você está acima do peso`);
}
if (IMC < 29.9) {
  console.log(`${nome}, você não esta acima do peso`);
}

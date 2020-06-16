// Criar um programa para calcular o IMC e nível de obesidade de uma pessoa.

const nome = "Suzana ";
const peso = 78;
const altura = 1.59;

const imc = peso / (altura * altura);

if (imc >= 30) {
  console.log(`${nome}você esta acima do peso`);
} else {
  console.log(`${nome}você não esta acima do peso`);
}

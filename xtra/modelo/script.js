let vocabulario = [];

const btnGrabar = document.getElementById("grabar");
const btnBuscar = document.getElementById("buscar");
const btnCancelar = document.getElementById("cancelar");

btnBuscar.addEventListener("click", buscar);
btnCancelar.addEventListener("click", cancelar);
btnGrabar.addEventListener("click", grabar);

const palabra = document.getElementById("palabra");
const pinyin = document.getElementById("pinyin");
const tonos = document.getElementById("tonos");
const significado = document.getElementById("significado");
const detalles = document.getElementById("detalles");

palabra.addEventListener("input", (e) => {
  console.log(e.target.value);
});
pinyin.addEventListener("input", (e) => {
  console.log(e.target.value);
});
tonos.addEventListener("input", (e) => {
  console.log(e.target.value);
});

function buscar() {
  console.log("buscar");
}
function grabar() {
  console.log("grabar");
  datos = recuperaDatosIntroducidos();
  vocabulario.push(datos);
  console.log(vocabulario);
}
function cancelar() {
  palabra.value = "";
  pinyin.value = "";
  tonos.value = "";
  significado.value = "";
  detalles.value = "";
}

function recuperaDatosIntroducidos() {
  const datos = {};
  datos.palabra = palabra.value;
  datos.pinyin = pinyin.value;
  datos.tonos = tonos.value;
  datos.significado = significado.value;
  datos.detalles = detalles.value;

  return datos;
}

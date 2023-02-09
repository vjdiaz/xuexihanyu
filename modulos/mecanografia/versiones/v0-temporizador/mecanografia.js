// Poyecto HanYu

import { modelo } from "../../modelo/modelo.js";
import { dom } from "../../modulos/dom.js";

const nombreContenedor = "Mecanografia";
const atributosHTML = {
  idContenedor: "contenedor" + nombreContenedor,
  claseContenedor: "contenedor" + nombreContenedor,
};
const hrefCSS = "./modulos/mecanografia/mecanografia.css";
let contenedorNode = null;

let btnComienzoNode = null;
let btnDetencionNode = null;
let tiempoNode = null;
let numeroPalabrasCorrestasNode = null;
let palabraDeMuestraNode = null;
let palabraDeEntradaNode = null;

let identificadorTemporizador = 0;
let entradas = [];
let idPalabraMuestra = "";
let palabraDeMuestra = "";
let pinyinPlanoPalabraDeMuestra = "";

export const mecanografia = {
  ensamblaComponente() {
    creaContenedorNode();
    habilitaEventos();

    this.actualizaJuegoDePalabras();
    return contenedorNode;
  },

  desensamblaComponente() {
    deshabilitaEventos();
    contenedorNode.innerHTML = "";
  },

  actualizaJuegoDePalabras() {
    if (contenedorNode == null) return;
    entradas = modelo.recuperaPalabrasSeleccionadas();
    const longitud = entradas.length;

    if (longitud == 0) return;

    // const barajar = ajustes.valoresAjustes().barajar;
    // if (barajar) {
    //   entradas = modelo.barajaEntradas(entradas);
    // }
  },
};

function creaContenedorNode() {
  contenedorNode = document.createElement("div");
  contenedorNode.id = atributosHTML.idContenedor;
  contenedorNode.classList = atributosHTML.claseContenedor;

  const enlaceNode = dom.enlaceHojaCSSNode(hrefCSS);
  contenedorNode.appendChild(enlaceNode);

  creaPanelControles();
  creaPanelMarcador();
  creaPanelPalabraDeMuestra();
  creaPanelPalabraDeEntrada();
}

function habilitaEventos() {
  btnComienzoNode.addEventListener("click", respuestaPulsarComienzo);
  btnDetencionNode.addEventListener("click", respuestaPulsarDetencion);
  palabraDeEntradaNode.addEventListener("input", (e) => respuestaEscribirEnLaEntrada(e));
}

function deshabilitaEventos() {
  btnComienzoNode.removeEventListener("click", respuestaPulsarComienzo);
  btnDetencionNode.removeEventListener("click", respuestaPulsarDetencion);
  palabraDeEntradaNode.removeEventListener("input", (e) => respuestaEscribirEnLaEntrada(e));
}

function respuestaPulsarComienzo() {
  function actualizaTiempo() {
    //  Incrementa en una unidad el contador de tiempo
    let valorTiempo = +tiempoNode.innerText;
    valorTiempo++;
    tiempoNode.innerText = valorTiempo.toString();
  }

  actualizaPalabraDeMuestra();

  tiempoNode.innerText = "0";
  numeroPalabrasCorrestasNode.innerText = "0";
  palabraDeEntradaNode.value = "";
  palabraDeEntradaNode.focus();

  // Activa el temporizador para que se actualiza el tiempo cada segundo (1000msg)
  // NOTA: 1) Dado que el botón Comenzar se puede pulsar de forma independiente del de Detener,
  //       sólo se inicializa el temporizador en el caso de que la variable temporizador sea cero.
  //       Con esta precaución, evitamos tener variso temporizadores activos al mismo tiempo.
  //       2) El argumento primero de setInterval es el nombre de la función (es un método callback)
  if (identificadorTemporizador == 0) {
    identificadorTemporizador = setInterval(actualizaTiempo, 1000);
  }
}

function actualizaPalabraDeMuestra() {
  seleccionaPalabraDeMuestra();
  palabraDeMuestraNode.innerText = palabraDeMuestra;
}

function seleccionaPalabraDeMuestra() {
  // La palabra de muestra se selecciona aleatoriamente del array palabrasDeMuestra

  // Numero de elementos en el array
  const size = entradas.length;
  // Numero real aleatorio entre 0 y size
  const indiceRealAleatorio = Math.random() * size;
  // Redondeo del número real obtenido al entero más próximo
  // para que se corresponda con una posición (indice) correcta.
  const indiceAleatorio = Math.floor(indiceRealAleatorio);
  idPalabraMuestra = entradas[indiceAleatorio];

  palabraDeMuestra = modelo.recuperaAtributo(idPalabraMuestra, "palabra");
  pinyinPlanoPalabraDeMuestra = modelo.recuperaAtributo(idPalabraMuestra, "pinyinPlano");
}

function respuestaPulsarDetencion() {
  clearInterval(identificadorTemporizador);
  identificadorTemporizador = 0;
}

function respuestaEscribirEnLaEntrada(e) {
  function test(entrada, palabra) {
    return entrada == "shi";
  }

  if (identificadorTemporizador == 0) {
    return;
  }

  const entrada = e.target.value;

  if (entrada == pinyinPlanoPalabraDeMuestra) {
    let valor = +numeroPalabrasCorrestasNode.innerText;
    valor++;
    numeroPalabrasCorrestasNode.innerText = valor.toString();

    actualizaPalabraDeMuestra();
    palabraDeEntradaNode.value = "";
    palabraDeEntradaNode.focus();
  }
}

function creaPanelControles() {
  const divNode = dom.creaDivNode("panelControles");
  btnComienzoNode = dom.creaButtonNode("Comenzar", "cambio");
  btnDetencionNode = dom.creaButtonNode("Detener", "cambio");
  divNode.appendChild(btnComienzoNode);
  divNode.appendChild(btnDetencionNode);
  contenedorNode.appendChild(divNode);
}

function creaPanelMarcador() {
  const divNode = dom.creaDivNode("panelMarcador");

  const etiquetaTiempoNode = document.createElement("p");
  etiquetaTiempoNode.innerText = "Tiempo (sgs):";
  tiempoNode = dom.creaSpanNode("0", "datoNumerico");
  etiquetaTiempoNode.appendChild(tiempoNode);

  divNode.appendChild(etiquetaTiempoNode);

  const etiquetaPalabrasCorrectasNode = document.createElement("p");
  etiquetaPalabrasCorrectasNode.innerText = "Palabras Correctas:";
  numeroPalabrasCorrestasNode = dom.creaSpanNode("0", "datoNumerico");
  etiquetaPalabrasCorrectasNode.appendChild(numeroPalabrasCorrestasNode);
  divNode.appendChild(etiquetaPalabrasCorrectasNode);

  contenedorNode.appendChild(divNode);
}

function creaPanelPalabraDeMuestra() {
  const divNode = dom.creaDivNode("panelPalabraDeMuestra");
  contenedorNode.appendChild(divNode);
  const mensajeNode = document.createElement("p");
  mensajeNode.innerText = "Teclee la siguiente palabra";
  divNode.appendChild(mensajeNode);
  palabraDeMuestraNode = dom.creaSpanNode("", "palabra");
  divNode.appendChild(palabraDeMuestraNode);

  contenedorNode.appendChild(divNode);
}

function creaPanelPalabraDeEntrada() {
  const divNode = dom.creaDivNode("panelPalabraDeEntrada");
  contenedorNode.appendChild(divNode);

  palabraDeEntradaNode = document.createElement("input");
  palabraDeEntradaNode.type = "text";
  palabraDeEntradaNode.placeholder = "Escriba la palabra";
  divNode.appendChild(palabraDeEntradaNode);

  contenedorNode.appendChild(divNode);
}

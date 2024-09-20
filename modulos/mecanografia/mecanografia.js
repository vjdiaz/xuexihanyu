// Poyecto HanYu

import { modelo } from "../../modelo/modelo.js";
import { dom } from "../../modulos/dom.js";
import { chino } from "../chino.js";

const nombreContenedor = "Mecanografia";
const atributosHTML = {
  idContenedor: "contenedor" + nombreContenedor,
  claseContenedor: "contenedor" + nombreContenedor,
};
const hrefCSS = "./modulos/mecanografia/mecanografia.css";

let contenedorNode = null;
let palabraDeMuestraNode = null;
let palabraDeEntradaNode = null;

let entradas = [];
let idPalabraMuestra = "";
let pinyinPlanoPalabraDeMuestra = "";

export const mecanografia = {
  ensamblaComponente() {
    creaContenedorNode();
    habilitaEventos();
    return contenedorNode;
  },

  desensamblaComponente() {
    deshabilitaEventos();
    contenedorNode.innerHTML = "";
  },

  comienzaJuego() {
    if (contenedorNode == null) return;
    entradas = modelo.recuperaPalabrasSeleccionadas();
    idPalabraMuestra = seleccionaPalabraDeMuestra();
    this.actualizaDatosJuego();
  },

  actualizaDatosJuego() {
    const pinyinPlanoAux = modelo.recuperaAtributo(idPalabraMuestra, "pinyinPlano");
    pinyinPlanoPalabraDeMuestra = pinyinPlanoAux.replace(/\s+/g, "");

    palabraDeMuestraNode.innerHTML = chino.palabraHTML(idPalabraMuestra);
    palabraDeEntradaNode.value = "";
    palabraDeEntradaNode.focus();
  },
};

function creaContenedorNode() {
  // Funciones auxiliares para construir el contenedor
  function creaPanelPalabraDeMuestra() {
    const divNode = dom.creaDivNode("panelPalabraDeMuestra");
    contenedorNode.appendChild(divNode);

    palabraDeMuestraNode = dom.creaDivNode("palabra");
    divNode.appendChild(palabraDeMuestraNode);

    contenedorNode.appendChild(divNode);
  }

  function creaPanelPalabraDeEntrada() {
    const divNode = dom.creaDivNode("panelPalabraDeEntrada");
    contenedorNode.appendChild(divNode);

    palabraDeEntradaNode = document.createElement("input");
    palabraDeEntradaNode.type = "text";
    palabraDeEntradaNode.classList = "entrada";
    palabraDeEntradaNode.placeholder = "Escriba pinyin de la palabra";
    divNode.appendChild(palabraDeEntradaNode);

    contenedorNode.appendChild(divNode);
  }
  contenedorNode = document.createElement("div");
  contenedorNode.id = atributosHTML.idContenedor;
  contenedorNode.classList = atributosHTML.claseContenedor;

  const enlaceNode = dom.enlaceHojaCSSNode(hrefCSS);
  contenedorNode.appendChild(enlaceNode);

  creaPanelPalabraDeMuestra();
  creaPanelPalabraDeEntrada();
}

function habilitaEventos() {
  palabraDeEntradaNode.addEventListener("input", (e) => respuestaEscribirEnLaEntrada(e));
}

function deshabilitaEventos() {
  palabraDeEntradaNode.removeEventListener("input", (e) => respuestaEscribirEnLaEntrada(e));
}

function respuestaEscribirEnLaEntrada(e) {
  const entradaOriginal = e.target.value;
  let entrada = entradaOriginal.replace(/\s+/g, "");
  entrada = entrada.toLowerCase();

  if (entrada == pinyinPlanoPalabraDeMuestra) {
    idPalabraMuestra = seleccionaPalabraDeMuestra();
    mecanografia.actualizaDatosJuego();
  }
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
  return entradas[indiceAleatorio];
}

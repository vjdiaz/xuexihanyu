// Poyecto HanYu

import { modelo } from "../../modelo/modelo.js";
import { chino } from "../chino.js";
import { dom } from "../dom.js";

const nombreContenedor = "Parejas";
const atributosHTML = {
  idContenedor: "contenedor" + nombreContenedor,
  claseContenedor: "contenedor" + nombreContenedor,
};
const hrefCSS = "./modulos/juegoParejas/juegoParejas.css";
let numeroDeParejas = 12;
// let numeroMaxiomoDeParejas = 9;

let contenedorNode = null;
let panelParejasNode = null;

let btnActualizarNode = null;
let btnComprobarNode = null;

let panelAjustesNode = null;
let modoPinyinNode = null;
let modoSignificadoNode = null;
let modoTonosNode = null;
let modo = "significado";

let mensajeTestNode = "";
// let numeroDeParejasNode = null;

let origenArrastre = "";
let destinoArrastre = "";

//  Cada pareja (a,b) en el array items se representa {a:_,b:}
let items = [];
let entradas = [];

export const juegoParejas = {
  ensamblaComponente() {
    creaContenedorNode();
    this.actualizaPanelDeParejas();
    this.actualizaContenido();
    habilitaEventos();
    return contenedorNode;
  },

  desensamblaComponente() {
    deshabilitaEventos();
    contenedorNode.innerHTML = "";
  },

  actualizaPanelDeParejas() {
    let itemNode = null;
    panelParejasNode.innerHTML = "";
    for (let i = 0; i < numeroDeParejas; i++) {
      itemNode = dom.creaDivNode("itemA");
      itemNode.innerHTML = "";
      itemNode.dataset.indice = 2 * i;

      panelParejasNode.appendChild(itemNode);

      itemNode = dom.creaDivNode("itemB");
      itemNode.innerHTML = "";
      itemNode.draggable = true;
      itemNode.dataset.indice = 2 * i + 1;

      panelParejasNode.appendChild(itemNode);
    }
  },

  actualizaContenido() {
    if (contenedorNode == null) return;

    entradas = modelo.recuperaPalabrasSeleccionadas();
    const longitud = entradas.length;

    if (longitud == 0 || numeroDeParejas > longitud) {
      console.log("OJO: Selecciona un mazo para generar parejas");
      return;
    }

    seleccionaPalabras();
    this.actualizaParejas();
  },

  actualizaParejas() {
    mensajeTestNode.innerHTML = "";
    if (contenedorNode == null) return;
    for (let i = 0; i < numeroDeParejas; i++) {
      const nodeA = panelParejasNode.children[2 * i];
      nodeA.innerHTML = chino.palabraHTML(items[i].a);
      const nodeB = panelParejasNode.children[2 * i + 1];
      nodeB.innerHTML = itemBHTML(items[i].b);
    }
  },
};

function creaContenedorNode() {
  // Funciones auxiliares para generar el contenedor
  function creaPanelAjustes() {
    panelAjustesNode = dom.creaDivNode("panelAjustes");
    contenedorNode.appendChild(panelAjustesNode);

    const pinyinLabelNode = dom.creaLabelNode("Pinyin", "etiqueta", "modoPinyin");
    modoPinyinNode = dom.creaRadioNode("controlModo", "radioModo", false);
    modoPinyinNode.id = "modoPinyin";
    panelAjustesNode.appendChild(pinyinLabelNode);
    panelAjustesNode.appendChild(modoPinyinNode);

    const significadoLabelNode = dom.creaLabelNode("Significado", "etiqueta", "modoSignificado");
    modoSignificadoNode = dom.creaRadioNode("controlModo", "radioModo", false);
    modoSignificadoNode.id = "modoSignificado";
    panelAjustesNode.appendChild(significadoLabelNode);
    panelAjustesNode.appendChild(modoSignificadoNode);

    const tonosLabelNode = dom.creaLabelNode("Tonos", "etiqueta", "modoTonos");
    modoTonosNode = dom.creaRadioNode("controlModo", "radioModo", false);
    modoTonosNode.id = "modoTonos";
    panelAjustesNode.appendChild(tonosLabelNode);
    panelAjustesNode.appendChild(modoTonosNode);

    switch (modo) {
      case "pinyin":
        modoPinyinNode.checked = true;
        break;
      case "significado":
        modoSignificadoNode.checked = true;
        break;
      case "tonos":
        modoTonosNode.checked = true;
        break;
      default:
        break;
    }
  }

  function creaPanelParejas() {
    panelParejasNode = dom.creaDivNode("panelParejas");
    contenedorNode.appendChild(panelParejasNode);
  }

  function creaPanelAcciones() {
    // function creaControlNumeroDeParejas() {
    //   const divNode = dom.creaDivNode("controlNumeroDeParejas");
    //   const labelNode = dom.creaLabelNode("Número de parejas", "etiqueta", "numeroDeParejas");
    //   divNode.appendChild(labelNode);

    //   numeroDeParejasNode = document.createElement("input");
    //   numeroDeParejasNode.type = "number";
    //   numeroDeParejasNode.value = numeroDeParejas;
    //   numeroDeParejasNode.min = 0;
    //   numeroDeParejasNode.max = numeroMaxiomoDeParejas;
    //   numeroDeParejasNode.classList = "entradaNumero";
    //   numeroDeParejasNode.id = "numeroDeParejas";
    //   divNode.appendChild(numeroDeParejasNode);

    //   panelAccionesNode.appendChild(divNode);
    // }

    const panelAccionesNode = dom.creaDivNode("panelAcciones");
    contenedorNode.appendChild(panelAccionesNode);

    btnActualizarNode = dom.creaButtonNode("Actualizar Parejas");
    panelAccionesNode.appendChild(btnActualizarNode);

    // creaControlNumeroDeParejas();
  }

  function creaPanelComprobacion() {
    const panelComporobacionNode = dom.creaDivNode("panelComprobacion");
    contenedorNode.appendChild(panelComporobacionNode);

    btnComprobarNode = dom.creaButtonNode("Comprobar Parejas");
    panelComporobacionNode.appendChild(btnComprobarNode);
    mensajeTestNode = dom.creaSpanNode("", "mensaje");
    panelComporobacionNode.appendChild(mensajeTestNode);
  }

  contenedorNode = document.createElement("div");
  contenedorNode.id = atributosHTML.idContenedor;
  contenedorNode.classList = atributosHTML.claseContenedor;

  const enlaceNode = dom.enlaceHojaCSSNode(hrefCSS);
  contenedorNode.appendChild(enlaceNode);

  creaPanelAjustes();
  creaPanelParejas();
  creaPanelAcciones();
  creaPanelComprobacion();
}

function habilitaEventos() {
  // numeroDeParejasNode.addEventListener("change", respuestaNumeroDeParejas);

  btnActualizarNode.addEventListener("click", respuestaPulsarActualizar);
  btnComprobarNode.addEventListener("click", respuestaPulsarComprobar);
  modoSignificadoNode.addEventListener("change", respuestaCambioModo);
  modoPinyinNode.addEventListener("change", respuestaCambioModo);
  modoTonosNode.addEventListener("change", respuestaCambioModo);

  let nodeDrag = null;

  for (let i = 0; i < numeroDeParejas; i++) {
    nodeDrag = panelParejasNode.children[2 * i + 1];
    nodeDrag.addEventListener("dragstart", (e) => respuestaInicioArrastre(e));
    nodeDrag.addEventListener("dragend", (e) => respuestaFinArrastre(e));
    nodeDrag.addEventListener("dragenter", (e) => respuestaEntradaZonaSoltar(e));
    nodeDrag.addEventListener("dragover", (e) => respuestaSobrevueloZonaSoltar(e));
    nodeDrag.addEventListener("dragleave", (e) => respuestaSalirZonaSoltar(e));
    nodeDrag.addEventListener("drop", (e) => respuestaSoltar(e));
  }
}

function deshabilitaEventos() {
  // numeroDeParejasNode.removeEventListener("change", (e) => respuestaNumeroDeParejas(e));

  btnActualizarNode.removeEventListener("click", respuestaPulsarActualizar);
  btnComprobarNode.removeEventListener("click", respuestaPulsarComprobar);
  modoSignificadoNode.removeEventListener("change", respuestaCambioModo);
  modoPinyinNode.removeEventListener("change", respuestaCambioModo);
  modoTonosNode.removeEventListener("change", respuestaCambioModo);

  let nodeDrag = null;
  for (let i = 0; i < numeroDeParejas; i++) {
    nodeDrag = panelParejasNode.children[2 * i + 1];
    nodeDrag.removeEventListener("dragstart", (e) => respuestaInicioArrastre(e));
    nodeDrag.removeEventListener("dragend", (e) => respuestaFinArrastre(e));
    nodeDrag.removeEventListener("dragenter", (e) => respuestaEntradaZonaSoltar(e));
    nodeDrag.removeEventListener("dragover", (e) => respuestaSobrevueloZonaSoltar(e));
    nodeDrag.removeEventListener("dragleave", (e) => respuestaSalirZonaSoltar(e));
    nodeDrag.removeEventListener("drop", (e) => respuestaSoltar(e));
  }
}

function seleccionaPalabras() {
  function generaNuevaPalabra() {
    const maxValue = entradas.length;
    let indice = Math.floor(Math.random() * maxValue);
    let p = entradas[indice];
    while (palabras.includes(p)) {
      indice = Math.floor(Math.random() * maxValue);
      p = entradas[indice];
    }
    return p;
  }

  // El array palabras se usará para generar las parejas
  let palabras = [];
  items = [];
  for (let i = 0; i < numeroDeParejas; i++) {
    palabras[i] = generaNuevaPalabra();
  }

  const palabrasBarajadas = modelo.barajaEntradas(palabras);
  for (let i = 0; i < numeroDeParejas; i++) {
    items[i] = {};
    items[i].a = palabras[i];
    items[i].b = palabrasBarajadas[i];
  }
}

function respuestaPulsarActualizar() {
  seleccionaPalabras();
  juegoParejas.actualizaParejas();
}

// function respuestaNumeroDeParejas(e) {
//   numeroDeParejas = e.target.value;
//   // actualizaPanelParejas();
// }

function respuestaPulsarComprobar() {
  const test = items.every((par) => {
    return par.a == par.b;
  });

  if (test) {
    mensajeTestNode.innerHTML = "Correcto";
  } else {
    mensajeTestNode.innerHTML = "Incorrecto";
  }
}

function respuestaCambioModo() {
  if (modoPinyinNode.checked == true) {
    modo = "pinyin";
  }
  if (modoSignificadoNode.checked == true) {
    modo = "significado";
  }
  if (modoTonosNode.checked == true) {
    modo = "tonos";
  }
  juegoParejas.actualizaParejas();
}

function itemBHTML(id) {
  if (modo == "pinyin") {
    return chino.pinyinHTML(id);
  }
  if (modo == "significado") {
    return chino.significadoHTML(id);
  }
  if (modo == "tonos") {
    return chino.tonosHTML(id);
  }
}

function respuestaInicioArrastre(e) {
  mensajeTestNode.innerHTML = "";
  e.target.classList.add("itemArrastrando");
  origenArrastre = e.target.dataset.indice;
}
function respuestaFinArrastre(e) {
  e.target.classList.remove("itemArrastrando");
  origenArrastre = "";
}
function respuestaEntradaZonaSoltar(e) {}

function respuestaSobrevueloZonaSoltar(e) {
  e.preventDefault();
}

function respuestaSalirZonaSoltar(e) {}

function respuestaSoltar(e) {
  const nodeIndice = e.target.closest(".itemB");

  destinoArrastre = nodeIndice.dataset.indice;
  intercambioContenido(origenArrastre, destinoArrastre);
}

function intercambioContenido(origen, destino) {
  const origenNode = panelParejasNode.children[origen];
  const destinoNode = panelParejasNode.children[destino];

  const temporalNode = origenNode.innerHTML;
  origenNode.innerHTML = destinoNode.innerHTML;
  destinoNode.innerHTML = temporalNode;

  const i = (+origen + 1) / 2 - 1;
  const j = (+destino + 1) / 2 - 1;
  const tempValor = items[i].b;
  items[i].b = items[j].b;
  items[j].b = tempValor;
}

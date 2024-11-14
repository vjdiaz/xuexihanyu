// Hanyu

import { gestorPagina } from "../gestorPagina.js";
import { dom } from "../../modulos/dom.js";

const valoresAjustes = {
  pinyin: true,
  colorTonos: true,
};

let contenedorNode = null;
let pinyinConmutadorNode = null;
let colorTonosConmutadorNode = null;
const nombreContenedor = "Ajustes";
const atributosHTML = {
  idContenedor: "contenedor" + nombreContenedor,
  claseContenedor: "contenedor" + nombreContenedor,
};
const hrefCSS = "./modulos/ajustes/ajustes.css";

export const ajustes = {
  ensamblaComponente() {
    creaContenedorNode();
    habilitaEventos();
    return contenedorNode;
  },

  desensamblaComponente() {
    deshabilitaEventos();
    contenedorNode.innerHTML = "";
  },

  valoresAjustes() {
    return valoresAjustes;
  },
};

function creaContenedorNode() {
  contenedorNode = document.createElement("div");
  contenedorNode.id = atributosHTML.idContenedor;
  contenedorNode.classList = atributosHTML.claseContenedor;

  const enlaceNode = dom.enlaceHojaCSSNode(hrefCSS);
  contenedorNode.appendChild(enlaceNode);

  creaPinyinControlNode();
  creaColorTonosControlNode();
}

function habilitaEventos() {
  pinyinConmutadorNode.addEventListener("change", respuestaPinyinControl);
  colorTonosConmutadorNode.addEventListener(
    "change",
    respuestaColorTonosControl
  );
}
function deshabilitaEventos() {
  pinyinConmutadorNode.removeEventListener("change", respuestaPinyinControl);
  colorTonosConmutadorNode.removeEventListener(
    "change",
    respuestaColorTonosControl
  );
}

function creaPinyinControlNode() {
  const divNode = dom.creaDivNode("control");
  const labelNode = dom.creaLabelNode(
    "Mostrar Pinyin",
    "etiqueta",
    "pinyinConmutador"
  );
  pinyinConmutadorNode = dom.creaConmutadorNode(
    "conmutador",
    valoresAjustes.pinyin
  );
  pinyinConmutadorNode.id = "pinyinConmutador";
  divNode.appendChild(labelNode);
  divNode.appendChild(pinyinConmutadorNode);
  contenedorNode.appendChild(divNode);
}

function creaColorTonosControlNode() {
  const divNode = dom.creaDivNode("control");
  const labelNode = dom.creaLabelNode(
    "Color Tonos",
    "etiqueta",
    "colorTonosConmutador"
  );
  colorTonosConmutadorNode = dom.creaConmutadorNode(
    "conmutador",
    valoresAjustes.colorTonos
  );
  colorTonosConmutadorNode.id = "colorTonosConmutador";
  divNode.appendChild(labelNode);
  divNode.appendChild(colorTonosConmutadorNode);
  contenedorNode.appendChild(divNode);
}

function respuestaPinyinControl() {
  valoresAjustes.pinyin = !valoresAjustes.pinyin;

  gestorPagina.notificacion("ajustesActualizados");
}
function respuestaColorTonosControl() {
  valoresAjustes.colorTonos = !valoresAjustes.colorTonos;

  gestorPagina.notificacion("ajustesActualizados");
}

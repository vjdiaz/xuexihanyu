// HanYu

import { dom } from "../../dom.js";
import { juegoTarjetas } from "../juegoTarjetas.js";

const ajustes = {
  modoSignificado: true,
  barajar: false,
};

let contenedorNode = null;
let panelAjustesNode = null;
let modoPinyinNode = null;
let modoSignificadoNode = null;
let btnBarajarTarjetas = null;

const nombreContenedor = "AjustesJuegoTarjetas";
const atributosHTML = {
  idContenedor: "contenedor" + nombreContenedor,
  claseContenedor: "contenedor" + nombreContenedor,
  claseControl: "control",
};

export const ajustesJuegoTarjetas = {
  ensamblaComponente() {
    creaContenedorNode();
    habilitaEventos();
    return contenedorNode;
  },

  desensamblaComponente() {
    deshabilitaEventos();
    contenedorNode.innerHTML = "";
  },

  ajustes() {
    return ajustes;
  },
};

function creaContenedorNode() {
  // Funciones auxiliares para la construccion del contenedor

  function creaPanelAjustesModo() {
    panelAjustesNode = dom.creaDivNode("panelAjustesModo");
    contenedorNode.appendChild(panelAjustesNode);

    const pinyinLabelNode = dom.creaLabelNode("Pinyin", "etiqueta", "modoPinyin");
    modoPinyinNode = dom.creaRadioNode("controlModo", "radioModo", !ajustes.modoSignificado);
    modoPinyinNode.id = "modoPinyin";

    const significadoLabelNode = dom.creaLabelNode("Significado", "etiqueta", "modoSignificado");
    modoSignificadoNode = dom.creaRadioNode("controlModo", "radioModo", ajustes.modoSignificado);
    modoSignificadoNode.id = "modoSignificado";

    panelAjustesNode.appendChild(pinyinLabelNode);
    panelAjustesNode.appendChild(modoPinyinNode);
    panelAjustesNode.appendChild(significadoLabelNode);
    panelAjustesNode.appendChild(modoSignificadoNode);
  }

  function creaPanelControles() {
    const panelControlesNode = dom.creaDivNode("panelControles");
    btnBarajarTarjetas = dom.creaButtonNode("Barajar", "boton");
    panelControlesNode.appendChild(btnBarajarTarjetas);
    contenedorNode.appendChild(panelControlesNode);
  }

  contenedorNode = document.createElement("div");
  contenedorNode.id = atributosHTML.idContenedor;
  contenedorNode.classList = atributosHTML.claseContenedor;

  creaPanelControles();
  creaPanelAjustesModo();
}

function habilitaEventos() {
  modoSignificadoNode.addEventListener("change", respuestaCambioModo);
  modoPinyinNode.addEventListener("change", respuestaCambioModo);

  btnBarajarTarjetas.addEventListener("click", respuestaPulsarBarajar);
}
function deshabilitaEventos() {
  modoSignificadoNode.removeEventListener("change", respuestaCambioModo);
  modoPinyinNode.removeEventListener("change", respuestaCambioModo);

  btnBarajarTarjetas.removeEventListener("click", respuestaPulsarBarajar);
}

function respuestaCambioModo() {
  if (modoPinyinNode.checked == true) {
    ajustes.modoSignificado = false;
  }
  if (modoSignificadoNode.checked == true) {
    ajustes.modoSignificado = true;
  }
  juegoTarjetas.actualizaContenidoTarjetaActiva();
}

function respuestaPulsarBarajar() {
  juegoTarjetas.notificacion("barajar");
}

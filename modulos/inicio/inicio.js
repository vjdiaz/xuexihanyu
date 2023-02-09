// Proyecto Hanyu

import { dom } from "../../modulos/dom.js";
import { chino } from "../chino.js";
import { modelo } from "../../modelo/modelo.js";

let contenedorNode = null;
let panelDePalabrasNode = null;
let btnSeleccionAleatoriaNode = null;
let btnSeleccionMazosNode = null;
let numeroDePalabras = 24;
let entradas = [];
let palabras = [];
const nombreContenedor = "Inicio";
const atributosHTML = {
  idContenedor: "contenedor" + nombreContenedor,
  claseContenedor: "contenedor" + nombreContenedor,
};
const hrefCSS = "./modulos/inicio/inicio.css";

export const inicio = {
  ensamblaComponente() {
    creaContenedorNode();

    this.actualizaContenido();
    habilitaEventos();
    return contenedorNode;
  },

  desensamblaComponente() {
    deshabilitaEventos();
    contenedorNode.innerHTML = "";
  },

  actualizaPalabras() {
    if (contenedorNode == null) return;

    const palabrasNode = panelDePalabrasNode.children;
    [...palabrasNode].forEach((node, index) => {
      node.innerHTML = chino.palabraHTML(palabras[index]);
    });
  },

  actualizaContenido() {
    palabras = modelo.recuperaPalabrasSeleccionadas();

    actualizaPaneldePalabras();
  },
};

function creaContenedorNode() {
  // Funciones auxiliares para generar el contenedor
  function creaPanelDePalabras() {
    panelDePalabrasNode = dom.creaDivNode("panelDePalabras");
    contenedorNode.appendChild(panelDePalabrasNode);
  }
  function creaPanelDeControl() {
    const panelDeControlNode = dom.creaDivNode("panelDeControl");
    contenedorNode.appendChild(panelDeControlNode);

    btnSeleccionAleatoriaNode = dom.creaButtonNode("Seleccion aleatoria", "boton");
    panelDeControlNode.appendChild(btnSeleccionAleatoriaNode);

    btnSeleccionMazosNode = dom.creaButtonNode("Palabras de los mazos", "boton");
    panelDeControlNode.appendChild(btnSeleccionMazosNode);
  }

  contenedorNode = document.createElement("div");
  contenedorNode.id = atributosHTML.idContenedor;
  contenedorNode.classList = atributosHTML.claseContenedor;

  const enlaceNode = dom.enlaceHojaCSSNode(hrefCSS);
  contenedorNode.appendChild(enlaceNode);

  creaPanelDePalabras();
  creaPanelDeControl();
}

function habilitaEventos() {
  btnSeleccionAleatoriaNode.addEventListener("click", respuestaPulsarSeleccionAleatoria);
  btnSeleccionMazosNode.addEventListener("click", respuestaPulsarSeleccionMazos);
}

function deshabilitaEventos() {
  btnSeleccionAleatoriaNode.removeEventListener("click", respuestaPulsarSeleccionAleatoria);
  btnSeleccionMazosNode.removeEventListener("click", respuestaPulsarSeleccionMazos);
}

function actualizaPaneldePalabras() {
  panelDePalabrasNode.innerHTML = "";
  let divNode = null;

  palabras.forEach((p) => {
    divNode = dom.creaDivNode("palabra");
    divNode.innerHTML = chino.palabraHTML(p);
    panelDePalabrasNode.appendChild(divNode);
  });
}

function respuestaPulsarSeleccionAleatoria() {
  entradas = modelo.recuperaIdDeTodasLasEntradas();
  const longitud = entradas.length;

  numeroDePalabras = numeroDePalabras < longitud ? numeroDePalabras : longitud;
  let indiceRealAleatorio = 0;
  let indiceAleatorio = 0;

  palabras = [];
  for (let i = 0; i < numeroDePalabras; i++) {
    indiceRealAleatorio = Math.random() * longitud;
    indiceAleatorio = Math.floor(indiceRealAleatorio);
    palabras[i] = entradas[indiceAleatorio];
  }
  actualizaPaneldePalabras();
}

function respuestaPulsarSeleccionMazos() {
  palabras = modelo.recuperaPalabrasSeleccionadas();
  actualizaPaneldePalabras();
}

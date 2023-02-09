// Han Yu

import { gestorPagina } from "../gestorPagina.js";
import { mazos } from "../../../modelo/mazos.js";
import { dom } from "../../modulos/dom.js";

const nombreContenedor = "MenuMazos";
const atributosHTML = {
  idContenedor: "contenedor" + nombreContenedor,
  claseContenedor: "contenedor" + nombreContenedor,
  itemLista: "itemMazos",
  itemSeleccionado: "mazoSeleccionado",
};
const hrefCSS = "./modulos/menuMazos/menuMazos.css";
let contenedorNode = null;

export const menuMazos = {
  ensamblaComponente() {
    creaContenedorNode();
    actualizaContenido();
    // actualizaMazosSeleccionados();
    habilitaEventos();
    return contenedorNode;
  },
};

function creaContenedorNode() {
  contenedorNode = document.createElement("div");
  contenedorNode.classList = atributosHTML.claseContenedor;
  contenedorNode.id = atributosHTML.idContenedor;
}

function actualizaContenido() {
  if (contenedorNode == null) return;

  const enlaceNode = dom.enlaceHojaCSSNode(hrefCSS);
  contenedorNode.appendChild(enlaceNode);

  creaMazosNode();
}

function creaMazosNode() {
  if (contenedorNode == null) return;

  const arrayMazos = mazos.recuperaIdDeTodosLosMazos();
  const mazosSeleccionados = mazos.recuperaMazosSeleccionados();

  let mazoNode = null;
  arrayMazos.forEach((mazo) => {
    mazoNode = document.createElement("div");
    mazoNode.classList = atributosHTML.itemLista;
    mazoNode.dataset.item = atributosHTML.itemLista;
    mazoNode.dataset.nombre = mazo;
    if (mazosSeleccionados.includes(mazo)) {
      mazoNode.classList.add(atributosHTML.itemSeleccionado);
    }
    mazoNode.innerText = mazo;
    contenedorNode.appendChild(mazoNode);
  });
}

function habilitaEventos() {
  if (contenedorNode == null) return;

  contenedorNode.addEventListener("click", (e) => respuestaPulsarEnMazos(e));
}

function respuestaPulsarEnMazos(e) {
  const elementoPulsado = e.target.dataset.item;
  if (elementoPulsado == atributosHTML.itemLista) {
    const seleccion = e.target.dataset.nombre;

    e.target.classList.toggle(atributosHTML.itemSeleccionado);
    const mazosSeleccionados = mazos.recuperaMazosSeleccionados();
    if (mazosSeleccionados.includes(seleccion)) {
      mazos.eliminaMazoDeMazosSeleccionados(seleccion);
    } else {
      mazos.actualizaMazosSeleccionados(seleccion);
    }

    gestorPagina.notificacion("mazosActualizados");
  }
}

// Proyecto Hanyu

import { gestorPagina } from "../gestorPagina.js";
import { dom } from "../../modulos/dom.js";

//  Mapa que relaciona la opción con el componente que la gestiona
const opciones = {
  inicio: "inicio",
  tarjetas: "juegoTarjetas",
  mecanografia: "mecanografia",
  // parejas: "juegoParejas",
};

const nombreContenedor = "MenuOpciones";

const atributosHTML = {
  idContenedor: "contenedor" + nombreContenedor,
  claseContenedor: "contenedor" + nombreContenedor,
  lista: "listaOpciones",
  itemLista: "itemOpciones",
};
const hrefCSS = "./modulos/menuOpciones/menuOpciones.css";

let contenedorNode = null;

export const menuOpciones = {
  ensamblaComponente() {
    creaContenedorNode();
    habilitaEventos();
    return contenedorNode;
  },
};

function creaContenedorNode() {
  contenedorNode = document.createElement("div");
  contenedorNode.id = atributosHTML.idContenedor;
  contenedorNode.classList = atributosHTML.claseContenedor;

  const enlaceNode = dom.enlaceHojaCSSNode(hrefCSS);
  contenedorNode.appendChild(enlaceNode);

  creaMenuOpcionesNode();
}

function habilitaEventos() {
  if (contenedorNode == null) return;
  contenedorNode.addEventListener("click", (e) => respuestaPulsarEnMenuOpciones(e));
}

function creaMenuOpcionesNode() {
  const menuOpcionesNode = document.createElement("ul");
  menuOpcionesNode.classList = atributosHTML.lista;

  const arrayOpciones = Object.keys(opciones);
  let liNode = null;

  arrayOpciones.forEach((opcion) => {
    liNode = document.createElement("li");
    liNode.classList = atributosHTML.itemLista;
    liNode.dataset.item = atributosHTML.itemLista;
    liNode.dataset.componente = opciones[opcion];
    liNode.innerText = opcion.toUpperCase();
    menuOpcionesNode.appendChild(liNode);
  });

  contenedorNode.appendChild(menuOpcionesNode);
}

// Función de respuesta al evento de Pulsar en las opciones del menú

function respuestaPulsarEnMenuOpciones(e) {
  const elementoPulsado = e.target.dataset.item;
  if (elementoPulsado == atributosHTML.itemLista) {
    const nombreOpcion = e.target.dataset.componente;
    const datos = {};
    datos.opcion = nombreOpcion;
    gestorPagina.notificacion("opcionSeleccionada", datos);
  }
}

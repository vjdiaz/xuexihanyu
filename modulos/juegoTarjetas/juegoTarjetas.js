// Poyecto HanYu

import { modelo } from "../../modelo/modelo.js";
import { dom } from "../dom.js";

import { visor } from "./componentes/visor.js";
import { ajustesJuegoTarjetas } from "./componentes/ajustesJuegoTarjetas.js";
import { navegacion } from "./componentes/navegacion.js";

const nombreContenedor = "JuegoTarjetas";
const atributosHTML = {
  idContenedor: "contenedor" + nombreContenedor,
  claseContenedor: "contenedor" + nombreContenedor,
};
const hrefCSS = "./modulos/juegoTarjetas/juegoTarjetas.css";
let contenedorNode = null;

let entradas = [];
let numeroDeTarjetaActiva = 0;

export const juegoTarjetas = {
  ensamblaComponente() {
    creaContenedorNode();
    this.actualizaContenido();
    habilitaEventos();
    return contenedorNode;
  },

  desensamblaComponente() {
    visor.desensamblaComponente();
    ajustesJuegoTarjetas.desensamblaComponente();
    navegacion.desensamblaComponente();
    deshabilitaEventos();
    contenedorNode.innerHTML = "";
  },

  actualizaContenido() {
    if (contenedorNode == null) return;
    entradas = modelo.recuperaPalabrasSeleccionadas();
    const longitud = entradas.length;
    numeroDeTarjetaActiva = longitud == 0 ? 0 : 1;

    // // if (longitud == 0) return;

    // const barajar = ajustesJuegoTarjetas.ajustes().barajar;
    // if (barajar) {
    //   entradas = modelo.barajaEntradas(entradas);
    // }

    visor.actualizaContenido();
    navegacion.actualizaContenido();
  },

  actualizaContenidoTarjetaActiva() {
    visor.actualizaContenidoTarjetaActiva();
  },

  notificacion(mensaje) {
    switch (mensaje) {
      case "anterior":
        visor.muestraTarjetaAnterior();
        break;
      case "siguiente":
        visor.muestraTarjetaSiguiente();
        break;
      case "barajar":
        barajar();
      default:
        break;
    }
  },

  numeroDeTarjetaActiva() {
    return numeroDeTarjetaActiva;
  },

  actualizaNumeroDeTarjetaActiva(v) {
    numeroDeTarjetaActiva = v;
  },

  entradas() {
    return entradas;
  },

  actualizaEntradas(nuevaEntrada) {
    entradas = nuevaEntrada;
  },

  numeroTotalDeTarjetas() {
    return entradas.length;
  },
};

function creaContenedorNode() {
  contenedorNode = document.createElement("div");
  contenedorNode.id = atributosHTML.idContenedor;
  contenedorNode.classList = atributosHTML.claseContenedor;

  const enlaceNode = dom.enlaceHojaCSSNode(hrefCSS);
  contenedorNode.appendChild(enlaceNode);

  const ajustesJuegoTarjetasNode = ajustesJuegoTarjetas.ensamblaComponente();
  contenedorNode.appendChild(ajustesJuegoTarjetasNode);

  const visorNode = visor.ensamblaComponente();
  contenedorNode.appendChild(visorNode);

  const navegacionNode = navegacion.ensamblaComponente();
  contenedorNode.appendChild(navegacionNode);
}

function habilitaEventos() {
  if (contenedorNode == null) return;

  window.addEventListener("keydown", (e) => respuestaPulsarTecla(e));
}

function deshabilitaEventos() {
  if (contenedorNode == null) return;
  window.removeEventListener("keydown", (e) => respuestaPulsarTecla(e));
}

function respuestaPulsarTecla(e) {
  switch (e.code) {
    case "ArrowUp":
    case "ArrowDown":
      visor.volteaTarjeta();
      break;
    case "ArrowLeft":
      navegacion.retrocedeNavegacion();
      break;
    case "ArrowRight":
      navegacion.avanzaNavegacion();
      break;
  }
}

function barajar() {
  entradas = modelo.barajaEntradas(entradas);
  numeroDeTarjetaActiva = 1;
  visor.actualizaContenido();

  navegacion.actualizaContenido();
}

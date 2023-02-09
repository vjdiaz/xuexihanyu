import { juegoTarjetas } from "../juegoTarjetas.js";
import { dom } from "../../dom.js";

let contenedorNode = null;
let btnAnteriorNode = null;
let btnSiguienteNode = null;
let actualNode = null;
let totalNode = null;

const nombreContenedor = "Navegacion";
const atributosHTML = {
  idContenedor: "contenedor" + nombreContenedor,
  claseContenedor: "contenedor" + nombreContenedor,
};

export const navegacion = {
  ensamblaComponente() {
    creaContenedorNode();
    habilitaEventos();
    return contenedorNode;
  },
  desensamblaComponente() {
    if (contenedorNode == null) return;
    deshabilitaEventos();
    contenedorNode = "";
  },

  actualizaContenido() {
    if (contenedorNode == null) return;

    const total = juegoTarjetas.numeroTotalDeTarjetas();
    totalNode.innerText = total;
    actualNode.innerText = juegoTarjetas.numeroDeTarjetaActiva();
  },

  avanzaNavegacion() {
    respuestaPulsarSiguiente();
  },
  retrocedeNavegacion() {
    respuestaPulsarAnterior();
  },
};

function creaContenedorNode() {
  contenedorNode = document.createElement("div");
  contenedorNode.id = atributosHTML.idContenedor;
  contenedorNode.classList = atributosHTML.claseContenedor;

  // Los botones incluyen entidades HTML para indicar
  //      avance con &laquo; (similar a >>)
  //      retroceso con &raquo; (similar a <<)
  // https://developer.mozilla.org/es/docs/Glossary/Entidad
  // contenedorNode.innerHTML = `
  // <button data-id="anterior" class="desplazamiento">&laquo;</button>
  // <div id="referencia" class="referencia">
  //    <span data-id="actual">0</span>/<span data-id="total">0</span>
  // </div>
  // <button data-id="siguiente" class="desplazamiento">&raquo;</button>`;

  btnAnteriorNode = dom.creaButtonNode("&laquo;", "desplazamiento");
  btnSiguienteNode = dom.creaButtonNode("&raquo;", "desplazamiento");

  const divNode = dom.creaDivNode("referencia");
  actualNode = dom.creaSpanNode("0");
  const spanNode = dom.creaSpanNode("/");
  totalNode = dom.creaSpanNode("0");
  divNode.appendChild(actualNode);
  divNode.appendChild(spanNode);
  divNode.appendChild(totalNode);

  contenedorNode.appendChild(btnAnteriorNode);
  contenedorNode.appendChild(divNode);
  contenedorNode.appendChild(btnSiguienteNode);
}

function habilitaEventos() {
  if (contenedorNode == null) return;

  btnAnteriorNode.addEventListener("click", respuestaPulsarAnterior);
  btnSiguienteNode.addEventListener("click", respuestaPulsarSiguiente);
}

function deshabilitaEventos() {
  if (contenedorNode == null) return;

  btnAnteriorNode.removeEventListener("click", respuestaPulsarAnterior);
  btnSiguienteNode.removeEventListener("click", respuestaPulsarSiguiente);
}

function respuestaPulsarAnterior() {
  // Ignora el caso de que no haya juegotarjetas en el visor,
  const total = juegoTarjetas.numeroTotalDeTarjetas();
  if (total == 0) return;

  const valor = +actualNode.innerText;
  if (valor > 1) {
    const nuevoValor = valor - 1;
    actualNode.innerText = nuevoValor;
    juegoTarjetas.notificacion("anterior");
  }
}

function respuestaPulsarSiguiente() {
  // Ignora el caso de que no haya juegotarjetas en el visor,
  const total = juegoTarjetas.numeroTotalDeTarjetas();
  if (total == 0) return;

  const valor = +actualNode.innerText;
  if (valor < total) {
    const nuevoValor = valor + 1;
    actualNode.innerText = nuevoValor;
    juegoTarjetas.notificacion("siguiente");
  }
}

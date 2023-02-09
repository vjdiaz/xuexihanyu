import { juegoTarjetas } from "../juegoTarjetas.js";
import { tarjetas } from "../tarjetas.js";
import { dom } from "../../dom.js";

let contenedorNode = null;
const nombreContenedor = "Visor";
const atributosHTML = {
  idContenedor: "contenedor" + nombreContenedor,
  claseContenedor: "contenedor" + nombreContenedor,
  claseTarjetaActiva: "tarjeta tarjeta--activa",
  claseParaVoltearUnaTarjeta: "tarjeta--volteo",
  claseTarjetaEnLaDerecha: "tarjeta tarjeta--derecha",
  claseTarjetaEnLaIzquierda: "tarjeta tarjeta--izquierda",
  claseTarjetaAnverso: "tarjeta__anverso",
  claseTarjetaReverso: "tarjeta__reverso",
};

export const visor = {
  ensamblaComponente() {
    creaContenedorNode();
    habilitaEventos;
    return contenedorNode;
  },

  desensamblaComponente() {
    deshabilitaEventos();
    contenedorNode.innerHTML = "";
  },

  actualizaContenido() {
    if (contenedorNode == null) return;

    const entradas = juegoTarjetas.entradas();
    contenedorNode.innerHTML = "";

    entradas.forEach((entrada, indice) => {
      const claseTarjeta =
        indice == 0 ? atributosHTML.claseTarjetaActiva : atributosHTML.claseTarjetaEnLaDerecha;

      // tarjetaHTML = `
      //   <div class="${claseTarjeta}">
      //      <div class="tarjeta__anverso"> ${anversoTarjetaHTML(entrada)}</div>
      //      <div class="tarjeta__reverso"> ${reversoTarjetaHTML(entrada)} </div>
      //   </div> `;

      const tarjetaNode = dom.creaDivNode(claseTarjeta);
      tarjetaNode.id = entrada;
      const anversoNode = dom.creaDivNode();
      const reversoNode = dom.creaDivNode();
      tarjetaNode.appendChild(anversoNode);
      tarjetaNode.appendChild(reversoNode);
      contenedorNode.appendChild(tarjetaNode);
    });

    if (entradas.length > 0) {
      this.actualizaContenidoTarjetaActiva();
    }
  },

  actualizaContenidoTarjetaActiva() {
    if (contenedorNode == null) return;
    const numeroDeTarjetaActiva = juegoTarjetas.numeroDeTarjetaActiva();
    const tarjetaActivaNode = contenedorNode.children[numeroDeTarjetaActiva - 1];
    const idEntrada = tarjetaActivaNode.id;
    const anversoNode = tarjetaActivaNode.children[0];
    const reversoNode = tarjetaActivaNode.children[1];

    anversoNode.innerHTML = tarjetas.anversoTarjetaHTML(idEntrada);
    reversoNode.innerHTML = tarjetas.reversoTarjetaHTML(idEntrada);
    anversoNode.classList = atributosHTML.claseTarjetaAnverso;
    reversoNode.classList = atributosHTML.claseTarjetaReverso;
  },

  muestraTarjetaAnterior() {
    if (contenedorNode == null) return;
    const numeroTotalDeTarjetas = juegoTarjetas.numeroTotalDeTarjetas();
    if (numeroTotalDeTarjetas == 0) return;

    const numeroDeTarjetaActiva = juegoTarjetas.numeroDeTarjetaActiva();
    if (numeroDeTarjetaActiva > 1) {
      const actualTarjetaActivaNode = contenedorNode.children[numeroDeTarjetaActiva - 1];
      const nuevaTarjetaActivaNode = contenedorNode.children[numeroDeTarjetaActiva - 2];
      actualTarjetaActivaNode.classList = atributosHTML.claseTarjetaEnLaDerecha;
      nuevaTarjetaActivaNode.classList = atributosHTML.claseTarjetaActiva;
      juegoTarjetas.actualizaNumeroDeTarjetaActiva(numeroDeTarjetaActiva - 1);
    }
    this.actualizaContenidoTarjetaActiva();
  },

  muestraTarjetaSiguiente() {
    if (contenedorNode == null) return;
    const numeroTotalDeTarjetas = juegoTarjetas.numeroTotalDeTarjetas();
    if (numeroTotalDeTarjetas == 0) return;

    const numeroDeTarjetaActiva = juegoTarjetas.numeroDeTarjetaActiva();
    if (numeroDeTarjetaActiva < numeroTotalDeTarjetas) {
      const actualTarjetaActivaNode = contenedorNode.children[numeroDeTarjetaActiva - 1];
      const nuevaTarjetaActivaNode = contenedorNode.children[numeroDeTarjetaActiva];
      actualTarjetaActivaNode.classList = atributosHTML.claseTarjetaEnLaIzquierda;
      nuevaTarjetaActivaNode.classList = atributosHTML.claseTarjetaActiva;
      juegoTarjetas.actualizaNumeroDeTarjetaActiva(numeroDeTarjetaActiva + 1);
    }
    this.actualizaContenidoTarjetaActiva();
  },

  volteaTarjeta() {
    respuestaPulsarEnContenedor();
  },
};

function creaContenedorNode() {
  contenedorNode = document.createElement("div");
  contenedorNode.id = atributosHTML.idContenedor;
  contenedorNode.classList = atributosHTML.claseContenedor;
}

function habilitaEventos() {
  if (contenedorNode == null) return;
  contenedorNode.addEventListener("click", respuestaPulsarEnContenedor);
}

function deshabilitaEventos() {
  if (contenedorNode == null) return;
  contenedorNode.removeEventListener("click", respuestaPulsarEnContenedor);
}

function respuestaPulsarEnContenedor() {
  const numeroTotalDeTarjetas = juegoTarjetas.numeroTotalDeTarjetas();
  if (numeroTotalDeTarjetas == 0) return;

  const numeroDeTarjetaActiva = juegoTarjetas.numeroDeTarjetaActiva();
  const tarjetaActivaNode = contenedorNode.children[numeroDeTarjetaActiva - 1];
  tarjetaActivaNode.classList.toggle(atributosHTML.claseParaVoltearUnaTarjeta);
}

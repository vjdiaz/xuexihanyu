//////////////////////////////////////////////////////////////////////////////////////////////////////
// Proyecto Hanyu
//////////////////////////////////////////////////////////////////////////////////////////////////////

import { menuOpciones } from "./menuOpciones/menuOpciones.js";
import { menuMazos } from "./menuMazos/menuMazos.js";
import { ajustes } from "./ajustes/ajustes.js";
import { inicio } from "./inicio/inicio.js";
import { juegoTarjetas } from "./juegoTarjetas/juegoTarjetas.js";
import { mecanografia } from "./mecanografia/mecanografia.js";
import { juegoParejas } from "./juegoParejas/juegoParejas.js";

let componenteActualEnCuerpo = "";
let panelMenuNode = document.getElementById("panelMenu");
let panelMenuMazosNode = document.getElementById("panelMenuMazos");
let panelAjustesNode = document.getElementById("panelAjustes");
let cuerpoNode = document.getElementById("cuerpo");

export const gestorPagina = {
  comienzo() {
    muestraComponente("menuOpciones");
    muestraComponente("ajustes");
    muestraComponente("inicio");
    // muestraComponente("juegoParejas");
    // muestraComponente("juegoTarjetas");
  },

  notificacion(mensaje, datos) {
    switch (mensaje) {
      case "opcionSeleccionada":
        muestraComponenteEnCuerpo(datos.opcion);
        break;
      case "mazosActualizados":
        this.actualizaContenidoGlobal();
        break;
      case "ajustesActualizados":
        this.actualizaContenidoParcial();
        break;
      default:
        break;
    }
  },

  actualizaContenidoGlobal() {
    switch (componenteActualEnCuerpo) {
      case "juegoTarjetas":
        juegoTarjetas.actualizaContenido();
        break;
      case "juegoParejas":
        juegoParejas.actualizaContenido();
        break;
      case "mecanografia":
        mecanografia.comienzaJuego();
      case "inicio":
        inicio.actualizaContenido();
      default:
        break;
    }
  },
  actualizaContenidoParcial() {
    switch (componenteActualEnCuerpo) {
      case "juegoTarjetas":
        juegoTarjetas.actualizaContenidoTarjetaActiva();
        break;
      case "mecanografia":
        mecanografia.actualizaDatosJuego();
        break;
      case "inicio":
        inicio.actualizaPalabras();
        break;
      case "juegoParejas":
        juegoParejas.actualizaParejas();
        break;
      default:
        break;
    }
  },
};

function muestraComponente(componente) {
  let componenteNode = null;
  switch (componente) {
    case "menuOpciones":
      componenteNode = menuOpciones.ensamblaComponente();
      panelMenuNode.appendChild(componenteNode);
      break;
    case "menuMazos":
      if (panelMenuMazosNode.innerHTML == "") {
        componenteNode = menuMazos.ensamblaComponente();
        panelMenuMazosNode.appendChild(componenteNode);
      }
      break;
    case "ajustes":
      componenteNode = ajustes.ensamblaComponente();
      panelAjustesNode.appendChild(componenteNode);
      break;
    default:
      muestraComponenteEnCuerpo(componente);
  }
}

function vaciaPanelMazos() {
  panelMenuMazosNode.innerHTML = "";
}

function vaciaCuerpo() {
  cuerpoNode.innerHTML = "";
}

function muestraComponenteEnCuerpo(componente) {
  if (componente == componenteActualEnCuerpo) return;

  eliminaComponenteActualEnCuerpo();

  let componenteNode = null;

  switch (componente) {
    case "inicio":
      muestraComponente("menuMazos");
      componenteNode = inicio.ensamblaComponente();
      cuerpoNode.appendChild(componenteNode);
      break;
    case "juegoTarjetas":
      muestraComponente("menuMazos");
      componenteNode = juegoTarjetas.ensamblaComponente();
      cuerpoNode.appendChild(componenteNode);
      break;
    case "mecanografia":
      muestraComponente("menuMazos");
      componenteNode = mecanografia.ensamblaComponente();
      cuerpoNode.appendChild(componenteNode);
      mecanografia.comienzaJuego();
      break;
    case "juegoParejas":
      muestraComponente("menuMazos");

      componenteNode = juegoParejas.ensamblaComponente();
      cuerpoNode.appendChild(componenteNode);
      break;
    default:
      break;
  }

  componenteActualEnCuerpo = componente;
}

function eliminaComponenteActualEnCuerpo() {
  switch (componenteActualEnCuerpo) {
    case "inicio":
      inicio.desensamblaComponente();
      break;
    case "juegoTarjetas":
      juegoTarjetas.desensamblaComponente();
      break;
    case "mecanografia":
      mecanografia.desensamblaComponente();
      break;
    case "juegoParejas":
      juegoParejas.desensamblaComponente();
      break;
    default:
      break;
  }

  vaciaCuerpo();
}

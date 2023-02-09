// Han yu

import { diccionario } from "./diccionario.js";
import { data } from "./dataMazos.js";

let mazosSeleccionados = data.seleccion;
let dataMazos = data.mazos;

export const mazos = {
  recuperaIdDeTodosLosMazos() {
    return Object.keys(dataMazos);
  },

  recuperaPalabrasDeMazosSeleccionados() {
    let palabras = [];

    mazosSeleccionados.forEach((m) => {
      const palabrasMazo = dataMazos[m];
      palabras = palabras.concat(palabrasMazo);
    });

    return palabras;
  },

  eliminaMazoDeMazosSeleccionados(id) {
    mazosSeleccionados = mazosSeleccionados.filter((m) => {
      return m != id;
    });
  },
  actualizaMazosSeleccionados(id) {
    mazosSeleccionados.push(id);
  },

  recuperaMazosSeleccionados() {
    return mazosSeleccionados;
  },
};

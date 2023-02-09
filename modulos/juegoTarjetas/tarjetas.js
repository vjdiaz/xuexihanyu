import { modelo } from "../../modelo/modelo.js";
import { ajustesJuegoTarjetas } from "./componentes/ajustesJuegoTarjetas.js";
import { chino } from "../chino.js";

export const tarjetas = {
  anversoTarjetaHTML(idEntrada) {
    return chino.palabraHTML(idEntrada);
  },

  reversoTarjetaHTML(idEntrada) {
    const modoSignificado = ajustesJuegoTarjetas.ajustes().modoSignificado;
    if (modoSignificado) {
      return chino.significadoHTML(idEntrada);
    } else {
      return chino.pinyinHTML(idEntrada);
    }
  },
};

import { diccionario } from "./diccionario.js";
import { mazos } from "./mazos.js";
import { chino } from "../modulos/chino.js";

let idEntradas = [];

export const modelo = {
  cargaDeEntradas() {
    localStorage.clear();
    diccionario.forEach((entrada) => {
      const { id, ...restoDePropiedades } = entrada;

      restoDePropiedades.pinyin = chino.codifica(entrada.pinyin);
      restoDePropiedades.pinyinPlano = chino.pinyinSinTonos(entrada.pinyin);
      restoDePropiedades.tonos = chino.tonos(entrada.pinyin);

      localStorage.setItem(id, JSON.stringify(restoDePropiedades));
      idEntradas.push(id);
    });
  },

  recuperaEntrada(idEntrada) {
    return JSON.parse(localStorage.getItem(idEntrada)) ?? {};
  },

  recuperaIdDeTodasLasEntradas(idEntrada) {
    return idEntradas;
  },

  recuperaAtributo(id, atributo) {
    let valor = "";
    const entrada = JSON.parse(localStorage.getItem(id));
    if (entrada == null) {
      valor = "Unknown";
    } else {
      valor = entrada[atributo];
    }
    return valor;
  },

  numeroTotalDeEntradas() {
    return idEntradas.length;
  },

  recuperaPalabrasSeleccionadas() {
    return mazos.recuperaPalabrasDeMazosSeleccionados();
  },

  barajaEntradas(array) {
    let aux = [];
    // Se crea un array auxiliar de pares (valor,random) donde:
    //   -  el primer componente (valor) conserva los valores del array
    //   -  el segundo componente (random) es un númeo generado aleatoriamente
    aux = array.map((v) => ({ valor: v, random: Math.random() }));

    // Se ordena el array de pares respecto al par aleatorio random
    aux = aux.sort((a, b) => a.random - b.random);

    // Se suprime el componente aleatorio del par, manteniendo los valores de partida del array
    aux = aux.map((par) => par.valor);

    return aux;
  },
};

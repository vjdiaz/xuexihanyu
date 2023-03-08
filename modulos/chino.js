//////////////////////////////////////////////////////////////////////////////////////////////////////
// Proyecto Hanyu
//////////////////////////////////////////////////////////////////////////////////////////////////////
import { ajustes } from "./ajustes/ajustes.js";
import { modelo } from "./../modelo/modelo.js";

// https://developer.mozilla.org/es/docs/Glossary/Entidad
const acentos = {
  // Alternativamente (para la a): &amacr;  &aacute;  &abreve;  &agrave;
  a1: "&#x101;",
  a2: "&#xE1;",
  a3: "&#x103;",
  a4: "&#xE0;",

  e1: "&#x113;",
  e2: "&#xE9;",
  e3: "&#x115;",
  e4: "&#xE8;",

  i1: "&#x12B;",
  i2: "&#xED;",
  i3: "&#x12D;",
  i4: "&#xEC;",

  o1: "&#x14D;",
  o2: "&#xF3;",
  o3: "&#x1D2;",
  o4: "&#xF2;",

  u1: "&#x16B;",
  u2: "&#xFA;",
  u3: "&#x1D4;",
  u4: "&#xF9;",

  v1: "&#x16B;",
  v2: "&#xFA;",
  v3: "&#x1D4;",
  v4: "&#xF9;",
};

const regex = /[vaeiou][1-4]/i;

export const chino = {
  tonos(palabra) {
    const regex = /[^0-4]/gi;
    return palabra.replace(regex, "");
  },

  intepretaAcento(pinyin) {
    const long = pinyin.length;

    if (pinyin.charAt(long - 1) == "0") {
      return pinyin.substring(0, long - 1);
    }
    // regex= [vaeiou][1-4]
    return pinyin.replace(regex, (match) => acentos[match]);
  },

  codifica(pinyin) {
    const arrayPinyin = pinyin.split(/\s+/);

    const array = arrayPinyin.map((p, index) => {
      return this.intepretaAcento(p);
    });

    return array.join(" ");
  },

  pinyinSinTonos(pinyin) {
    const regex = /[0-4]/gi;
    return pinyin.replace(regex, "");
  },

  palabraHTML(idEntrada) {
    const palabra = modelo.recuperaAtributo(idEntrada, "palabra");
    const pinyin = modelo.recuperaAtributo(idEntrada, "pinyin");
    const tonos = modelo.recuperaAtributo(idEntrada, "tonos");
    const arrayPalabra = palabra.split("");
    const arrayRubyHTML = arrayPalabra.map((p, index) => {
      const tono = tonos.at(index);
      const colorTonos = ajustes.valoresAjustes().colorTonos;
      const claseTono = colorTonos ? "tono" + tono : "tono";
      return `<span class="${claseTono}">${p}</span>`;
    });

    const rubyHTML = arrayRubyHTML.join("");

    let rtHTML = "";
    const mostrarPinyin = ajustes.valoresAjustes().pinyin;
    if (mostrarPinyin) {
      const arrayPinyin = pinyin.split(" ");
      const arrayRtHTML = arrayPinyin.map((p, index) => {
        const tono = tonos.at(index);
        const colorTonos = ajustes.valoresAjustes().colorTonos;
        const claseTono = colorTonos ? "tono" + tono : "tono";
        return `<span class="${claseTono}">${p}</span>`;
      });

      rtHTML = arrayRtHTML.join("");
    }

    const contenidoHTML = `
       <ruby class="palabraChina"> 
       ${rubyHTML} 
       <rt class="pinyin"> ${rtHTML} </rt>
        </ruby> `;

    return contenidoHTML;
  },

  pinyinHTML(idEntrada) {
    const pinyin = modelo.recuperaAtributo(idEntrada, "pinyin");
    const tonos = modelo.recuperaAtributo(idEntrada, "tonos");
    const arrayPinyin = pinyin.split(" ");
    const arrayHTML = arrayPinyin.map((p, index) => {
      const tono = tonos.at(index);
      const colorTonos = ajustes.valoresAjustes().colorTonos;
      const claseTono = colorTonos ? "tono" + tono : "tono";
      return `<span data-tono="${tono}" class="${claseTono}">${p}</span>`;
    });

    return '<div class="pinyin">' + arrayHTML.join("") + "</div>";
  },

  significadoHTML(idEntrada) {
    const significado = modelo.recuperaAtributo(idEntrada, "significado");
    return `<span class="significado">${significado}</span>`;
  },

  tonosHTML(idEntrada) {
    const tonos = modelo.recuperaAtributo(idEntrada, "tonos");
    return tonos;
  },
};

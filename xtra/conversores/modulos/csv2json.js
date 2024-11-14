let dataJSON = [];
const separador = ";";
const saltoDeLinea = "\n";
const prefijoID = "hz";
const offset = 800;

export const csv2json = {
  convertir(fichero) {
    try {
      const reader = new FileReader();
      // reader.readAsBinaryString(file);
      reader.readAsText(fichero);

      reader.addEventListener("load", (e) => procesamiento(e));
    } catch (e) {
      console.error(e);
    }
  },

  jsonData() {
    return dataJSON;
  },
};

function procesamiento(e) {
  let cabecera = null;
  let contenido = e.target.result;
  let lineas = contenido.split(saltoDeLinea);
  let celdas = null;

  let data = [];
  lineas.forEach((linea, i) => {
    celdas = linea.split(separador);

    // La primera línea del fichero es la cabecera con los nombres de las propiedades
    if (i == 0) {
      cabecera = celdas;
    } else {
      let objeto = {};
      objeto.id = prefijoID + sufijo(i + offset);

      celdas.forEach((celda, j) => {
        let propiedad = cabecera[j];

        objeto[propiedad] = celda.trim();
      });

      data.push(objeto);
    }
  });

  const visor = document.getElementById("visor");
  visor.innerText = JSON.stringify(data);
}

function sufijo(i) {
  if (i <= 9) {
    return "00000" + i;
  } else if (i <= 99) {
    return "0000" + i;
  }
  if (i <= 999) {
    return "000" + i;
  }
  if (i <= 9999) {
    return "00" + i;
  }
  return i;
}

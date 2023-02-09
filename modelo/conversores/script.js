import { csv2json } from "./modulos/csv2json.js";
import { json2csv } from "./modulos/json2csv.js";

const btn = document.getElementById("btnConvertir");
btn.addEventListener("click", respuestaPulsarBoton);

const visor = document.getElementById("visor");

function respuestaPulsarBoton() {
  visor.innerText = "";
  const ficheros = document.getElementById("ficheros").files;

  if (ficheros.length == 0) {
    alert("Selecciona un fichero...");
    return;
  }
  const nombreFichero = ficheros[0].name;
  const fichero = ficheros[0];
  const extension = nombreFichero.substring(nombreFichero.lastIndexOf(".")).toUpperCase();

  switch (extension) {
    case ".CSV":
      csv2json.convertir(fichero);
      visor.innerText = JSON.stringify(csv2json.jsonData());
      break;
    case ".JSON":
      json2csv.convertir(fichero);

      break;
    default:
      alert("Selecciona una fichero CSV o JS");
      break;
  }
}

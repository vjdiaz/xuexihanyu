//////////////////////////////////////////////////////////////////////////////////////////////////////
// Proyecto Hanyu
//////////////////////////////////////////////////////////////////////////////////////////////////////

export const dom = {
  enlaceHojaCSSNode(href) {
    const node = document.createElement("link");
    node.rel = "stylesheet";
    node.href = href;
    return node;
  },

  creaButtonNode(texto, clase) {
    const node = document.createElement("button");
    node.innerHTML = texto;
    node.classList = clase;
    return node;
  },

  creaSpanNode(texto, clase) {
    const node = document.createElement("span");
    node.innerText = texto;
    node.classList = clase;
    return node;
  },

  creaDivNode(clase) {
    const node = document.createElement("div");
    node.classList = clase;
    return node;
  },

  creaLabelNode(etiqueta, clase, valueFor) {
    const labelNode = document.createElement("label");
    labelNode.innerText = etiqueta;
    labelNode.classList = clase;
    labelNode.htmlFor = valueFor;
    return labelNode;
  },

  creaConmutadorNode(clase, valor) {
    const inputNode = document.createElement("input");
    inputNode.type = "checkbox";
    inputNode.classList = clase;
    inputNode.checked = valor;
    return inputNode;
  },
  creaRadioNode(nombre, clase, valor) {
    const inputNode = document.createElement("input");
    inputNode.type = "radio";
    inputNode.name = nombre;
    inputNode.classList = clase;
    inputNode.checked = valor;
    return inputNode;
  },
};

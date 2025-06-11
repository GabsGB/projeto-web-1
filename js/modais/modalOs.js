import { criarOS, finalizarOS } from "../OsController.js";
import { limparCampoServico } from "./modalServico.js";
import { limparTabelaMaquinas } from "../tabelas/tabelaMaquinas.js"
import { limparTabelaServicos } from "../tabelas/tabelaServicos.js";



window.criarOS = criarOS;
window.finalizarOS = finalizarOS;

document.getElementById("btn-criarOS").addEventListener("click", function(){
    criarOS();
})

document.getElementById("btn-fecharModalOS").addEventListener("click", function(){
    fecharElemento('modal')
})

function limparCliente() {
    const divCliente = document.getElementById("campos-clientes");
    const campos = divCliente.querySelectorAll("input");
    campos.forEach(campo => {
        campo.value = "";
    });
}

export function limparOs() {
    limparCliente();
    limparCampoServico();
    limparTabelaMaquinas();
    limparTabelaServicos();
}

export function abrirElemento(idElemento) {
  const elemento = document.getElementById(idElemento);
  if (elemento)  elemento.classList.remove('hidden');  
}

export function fecharElemento(idElemento) {
  const elemento = document.getElementById(idElemento);
  if (elemento) elemento.classList.add('hidden');
  
}
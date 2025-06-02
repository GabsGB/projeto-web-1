import {Os} from "./classes/Os.js";

window.criarOS= function()  {
    console.log("Criando OS");
    
    if (window.osAtual){
        console.log("OS ja existente!")
        const continuar = confirm("Uma OS já está em andamento deseja descarta-lá e criar uma nova?")
        if (continuar){
            window.osAtual = new Os
            limparOs();
            console.log("Os criada e iniciando uma nova!")
        }
        
    }else {
        window.osAtual = new Os
    }
    
    abrirElemento("modal");
}

window.limparOs = function() {
    limparCliente();
    limparCampoServico();
    limparTabelaMaquinas();
    limparTabelaServicos();
}

window.finalizarOS = function() {

    adicionarDadosOs();

    if (validarCamposOs()) {
        
        const ordemServico = new Os();
        
        // ordemServico.numeroOs = Os.numerOS();

        // Cliente
        ordemServico.atualizarCliente({cliente: window.osAtual.cliente});

        // Serviços
        window.osAtual.servicos.forEach(servico => {
            ordemServico.adicionarServico(servico);
        });
        
        limparTabelaServicos();
        enviarOs(ordemServico);
        console.log("Ordem de Serviço finalizada com sucesso!", window.osAtual);
        fecharElemento("modal");
    }
}

window.limparCliente = function() {
    const divCliente = document.getElementById("campos-clientes");
    const campos = divCliente.querySelectorAll("input");
    campos.forEach(campo => {
        campo.value = "";
    });
}

window.enviarOs = function(ordemServico) {
    console.log(ordemServico)
    // fetch()
}

window.abrirElemento = function(idElemento) {
  const elemento = document.getElementById(idElemento);
  if (elemento)  elemento.classList.remove('hidden');  
}

window.fecharElemento = function(idElemento) {
  const elemento = document.getElementById(idElemento);
  if (elemento) elemento.classList.add('hidden');
  
}


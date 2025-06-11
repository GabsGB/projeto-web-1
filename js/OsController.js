import { Os } from './classes/Os.js';
import { limparOs, abrirElemento, fecharElemento } from './modais/modalOs.js';

let osAtual = null;

export function getOsAtual() {
    return osAtual;
}

export function criarOS() {

    console.log("Criando OS");

    if (osAtual) {
        console.log("OS já existente!");
        const continuar = confirm("Uma OS já está em andamento. Deseja descartá-la e criar uma nova?");
        console.log(continuar);

        if (!continuar) {
            // Só reabre o modal com a OS atual
            abrirElemento("modal");
            console.log("Reabrindo OS atual.");
            return;
        }
    }

    osAtual = new Os();
    limparOs();
    abrirElemento("modal");
    console.log("Nova OS criada!");
}

export function finalizarOS() {
    enviarOs();
}

export function enviarOs() {
    if (validarCamposOS()){
        enviarOs(osAtual);
        console.log("Ordem de Serviço finalizada com sucesso!", osAtual);
        fecharElemento("modal");
        osAtual = null;
    }
    // fetch()
}

export function adicionarServicoNaOS(servico) {
    if (osAtual) {
        osAtual.adicionarServico(servico)
        // console.log("Servico adicionado a OS!")
        // console.log("Servico:")
        // console.log(servico)
        // console.log("Ordem de serviço:")
        // console.log(osAtual)
    }
    else {
        console.error("Nenhuma OS ativa!")
    }
}

export function removerServicoNaOs(index) {
    if (osAtual) osAtual.removerServico(index)
    else console.error("Nenhuma OS ativa.")
}
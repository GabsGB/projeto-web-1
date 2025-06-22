import { Os } from './classes/Os.js';
import { limparOs, abrirElemento, fecharElemento } from './modais/modalOs.js';
import { obterCliente } from './util/obterDados.js';

let osAtual = null;

export function getOsAtual() {
    return osAtual;
}

export function criarOS() {
    console.log("Criando OS");

    if (osAtual) {
        const continuar = confirm("Uma OS já está em andamento. Deseja descartá-la e criar uma nova?");
        if (!continuar) {
            abrirElemento("modal");
            return;
        }
    }

    osAtual = new Os();
    // osAtual.atualizarNumOS();
    limparOs();
    abrirElemento("modal");
}

export function finalizarOS() {
    const confirmar = confirm("Deseja realmente finalizar e enviar a OS?");
    if (!confirmar) return;

    const cliente = obterCliente();
    adicionarClienteNaOS(cliente);

    // Validação antes de enviar
    if (!osAtual || osAtual.servicos.length === 0) {
        alert("Adicione pelo menos um serviço antes de finalizar a OS.");
        return;
    }

    enviarOs();
}

export async function enviarOs() {
    // Falta corrigir o erro CORS
    try {
        const resposta = await fetch("https://script.google.com/macros/s/AKfycbyDaypJ07MLdCo3kmzsBpiFakUS8ASvCFjsrCZrx9Kn_9NfIVqoJ_UmGAUpWH8t5qhI/exec", {
            method: "POST",
            body: JSON.stringify(osAtual),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!resposta.ok) {
            throw new Error(`Erro na resposta: ${resposta.status} ${resposta.statusText}`);
        }

        const texto = await resposta.text();
        console.log("OS enviada com sucesso:", texto);
        alert("OS enviada com sucesso!");

        osAtual = null;
        fecharElemento("modal");

    } catch (erro) {
        console.error("Erro ao enviar OS:", erro);
        alert("Erro ao enviar OS! Verifique a conexão e tente novamente.");
    }
}

export function adicionarServicoNaOS(servico) {
    if (osAtual) {
        osAtual.adicionarServico(servico);
    } else {
        console.error("Nenhuma OS ativa!");
    }
}

export function adicionarClienteNaOS(cliente) {
    if (osAtual) {
        osAtual.atualizarCliente(cliente);
    } else {
        console.error("Nenhuma OS ativa!");
    }
}

export function removerServicoNaOs(index) {
    if (osAtual) {
        osAtual.removerServico(index);
    } else {
        console.error("Nenhuma OS ativa.");
    }
}

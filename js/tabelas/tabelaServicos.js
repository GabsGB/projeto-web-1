import { getOsAtual, removerServicoNaOs } from "../OsController.js";

document.addEventListener('click', function(event){
    if (event.target && event.target.classList.contains("btn-remover-servico")) {
        removerLinhaServico(event.target);
    }
});

export function adicionarLinhaServicos(servico) {

    const os = getOsAtual();

    if (!os) {
        console.error("Os não iniciada.")
        return;
    }
        
    const tabela = document.getElementById("tbl-servicos");
    const tbody = tabela.querySelector("tbody");
        
    const tipoServico = servico.tipoServico;
    const dificuldade = servico.dificuldade;
    const qtdMaquinas = servico.quantidade;

    let resumo = "";

        switch (servico.tipoServico) {
            case "Instalação":
                resumo = `Possui Infra: ${servico.infoAdicionais.instalacaoInfra === "sim" ? "possui" : "Não possui"} <br>
                Instalação Padrão: ${servico.infoAdicionais.instalacaoPadrao === "sim" ? "Sim" : "Não"} <br>
                Distância excedente: ${servico.infoAdicionais.distanciaExcedente !== "" ? servico.infoAdicionais.distanciaExcedente + " metros" : "0"}`;
        break;

            case "Manutenção":
                resumo = `Defeito: ${servico.infoAdicionais.defeito}`
                break;
            default:
                resumo = `${tipoServico} simples.`
                break;
        }

    let index = 0;

    //Criar uma nova linha
    const novaLinha = tbody.insertRow();

    // Criar células para a nova linha
    let celula1 = novaLinha.insertCell(0);
    let celula2 = novaLinha.insertCell(1);
    let celula3 = novaLinha.insertCell(2);
    let celula4 = novaLinha.insertCell(3);
    let celula5 = novaLinha.insertCell(4);
    let celula6 = novaLinha.insertCell(5);
        

    // Adicionar conteúdo às células
    celula1.innerHTML = index;
    celula2.innerHTML = tipoServico;
    celula3.innerHTML = dificuldade;
    celula4.innerHTML = resumo;
    celula5.innerHTML = qtdMaquinas;
    celula6.innerHTML = "<button type='button' class='btn-remover-servico'>Remover</button>";

    atualizarIndexTabelaS();
}

export function removerLinhaServico(botao) {
    console.log("Removendo linha da tabela");
    // Obter a linha do botão clicado
    const linha = botao.parentNode.parentNode;
    const index = parseInt(linha.querySelector("td").innerHTML);
    
    // Remover o serviço da variavel OS
    removerServicoNaOs(index-1);
    
    // Remover a linha da tabela
    linha.parentNode.removeChild(linha);
    atualizarIndexTabelaS();
}

export function limparTabelaServicos() {
    console.log("Limpando tabela");
    const tabela = document.getElementById("tbl-servicos");
    const tbody = tabela.querySelector("tbody");
    tbody.innerHTML = ""; // Limpa todas as linhas do corpo da tabela
}

function atualizarIndexTabelaS(){
    const linhas = document.querySelectorAll("#tbl-servicos tbody tr");

    linhas.forEach((linha, idx) => {
        linha.cells[0].innerText = idx + 1;
    })
}
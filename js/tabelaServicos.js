function adicionarLinhaServicos(servico) {
    
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
    console.log(resumo)

let index = window.osAtual.servicos.length;
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
celula1.innerHTML = `${index}`;
celula2.innerHTML = `<p id="tbl-servico-p2"> ${tipoServico}</p>`;
celula3.innerHTML = `<p id="tbl-servico-p3"> ${dificuldade}</p>`;
celula4.innerHTML = resumo;
celula5.innerHTML = `<p id="tbl-servico-p6"> ${qtdMaquinas}</p>`;
celula6.innerHTML = "<button type='button' class='btn btn-danger' onclick='removerLinhaServico(this)'>Remover</button>";
}

function removerLinhaServico(botao) {
    console.log("Removendo linha da tabela");
    // Obter a linha do botão clicado
    const linha = botao.parentNode.parentNode;
    const index = parseInt(linha.querySelector("td").innerHTML);
    
    // Remover o serviço da variavel OS
    window.osAtual.removerServico(index-1);
    
    // Remover a linha da tabela
    linha.parentNode.removeChild(linha);
}

function limparTabelaServicos() {
    console.log("Limpando tabela");
    const tabela = document.getElementById("tbl-servicos");
    const tbody = tabela.querySelector("tbody");
    tbody.innerHTML = ""; // Limpa todas as linhas do corpo da tabela
}
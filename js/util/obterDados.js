import {Maquina} from "../classes/Maquina.js";
import { validarMaquinasDuplicadas } from "./validacao.js";
import { marcarMaquinaDuplicada } from "../tabelas/tabelaMaquinas.js";

export function obterCliente() {
    const cliente = {
        nome: document.getElementById("nome-cliente").value,
        celular: document.getElementById("celular-cliente").value,
        telefone: document.getElementById("telefone-cliente").value,
        email: document.getElementById("email-cliente").value,
        cep: document.getElementById("cep-cliente").value,
        endereco: document.getElementById("endereco-cliente").value,
        numCasa: document.getElementById("numCasa-cliente").value,
        bairro: document.getElementById("bairro-cliente").value,
        cidade: document.getElementById("cidade-cliente").value,
        complemento: document.getElementById("complemento-cliente").value
    }

    return cliente;
}

function obterMaquina() {
    const linhas = document.querySelectorAll("#tbl-maquinas tbody tr");

    // Criar um array para armazenar os dados das máquinas
    let tempMaquinas = [];
    let maquinas = [];

    // Iterar sobre as linhas da tabela
    linhas.forEach(linha => {
        let aparelho = {
            tipo: linha.cells[0].querySelector("input").value,
            marca: linha.cells[1].querySelector("input").value,
            capacidade: linha.cells[2].querySelector("input").value,
            modelo: linha.cells[3].querySelector("input").value,
            infoAdicional: linha.cells[4].querySelector("input").value,
            gasRefrigerante: linha.cells[5].querySelector("input").value,
            quantidade: linha.cells[6].querySelector("input").value
        }
        tempMaquinas.push(aparelho)
    });

    const indDuplicados = validarMaquinasDuplicadas(tempMaquinas)
    // console.log(indDuplicados)

    if (indDuplicados.length > 0) {
        marcarMaquinaDuplicada(indDuplicados);
        alert('Existem maquinas duplicadas corrigir para prosseguir!');
        return;
    }

    tempMaquinas.forEach(maquina => { 
        maquinas.push(
            new Maquina(
                maquina.tipo,
                maquina.marca,
                maquina.capacidade,
                maquina.modelo,
                maquina.infoAdicional,
                maquina.gasRefrigerante,
                maquina.quantidade
            )
        )
    
    });

    // console.log(maquinas);
    return maquinas
}

export function obterServico() {

    console.log("Obtendo serviço");
    let tipoServico = document.getElementById("slc-tipoServicos").value;

    const dificuldade = document.getElementById("slc-dificuldade").value;
    const maquinas = obterMaquina();
    if (!maquinas)return;
    
    let totalMaquinas = 0;
    let infoAdicionais = {};

    maquinas.forEach(maquina => {totalMaquinas += parseInt(maquina.quantidade);})

    let servico = {};

    switch (tipoServico) {
        case "instalacao":
            tipoServico = "Instalação";
    
            const pInstalacao_padrao = document.getElementById("radios-instalacao-padrao");
            const pInstalacao_infra = document.getElementById("radios-instalacao-infra");

            const instalacaoPadrao = pInstalacao_padrao.querySelector("input[type='radio']:checked").value;            
            const distanciaExcedente = document.getElementById("num-distancia").value;

            const instalacaoInfra = pInstalacao_infra.querySelector("input[type='radio']:checked").value;            

            infoAdicionais = {
                instalacaoPadrao: instalacaoPadrao,
                distanciaExcedente: distanciaExcedente,
                instalacaoInfra: instalacaoInfra
            }
            break;

        case "desinstalacao":
            tipoServico = "Desinstalação";
            break;
        
        case "manutencao":
            tipoServico = "Manutenção";
            let defeito = document.getElementById("defeito").value;
            infoAdicionais = {defeito: defeito};
            break;

        case "higienizacao":
            tipoServico = "Higienização";
            break;
    }

    servico = {
                tipoServico: tipoServico,
                dificuldade: dificuldade,
                infoAdicionais: infoAdicionais,
                maquinas: maquinas,
                quantidade: totalMaquinas
            }

    // console.log(servico);
    return servico;
}
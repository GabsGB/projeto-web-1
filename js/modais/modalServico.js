import { adicionarServicoNaOS, getOsAtual } from "../OsController.js";
import { abrirElemento, fecharElemento } from "./modalOs.js";
import { validarCamposModalS, validarServicoDuplicado } from "../util/validacao.js";
import { adicionarLinhaServicos } from "../tabelas/tabelaServicos.js";
import { limparTabelaMaquinas } from "../tabelas/tabelaMaquinas.js";
import { obterServico } from "../util/obterDados.js";

window.adicionarServicoNaOS = adicionarServicoNaOS;

document.getElementById('slc-tipoServicos').addEventListener('change', alteraCamposEspecificos);
document.getElementById('btn-addServico').addEventListener('click', function(){
    abrirElemento('modal-servicos');
});
document.getElementById('btn-salvarServico').addEventListener('click', salvarServico);
document.getElementById('btn-fecharServico').addEventListener('click', function(){
    fecharElemento('modal-servicos');
});

export function salvarServico(debug = false) {

    if (validarCamposModalS()) {
        console.log("Campos validados com sucesso!");
        
        const os = getOsAtual();
        if (debug){
            console.log("🔍 OS obtida:")
            console.log(os)
        }

        const servico = obterServico();

        if (debug) {
            console.log("🔍 Serviço obtido:")
            console.log(servico)
        }

        if (!servico)return;

        if(os.servicos.length !== 0){
            console.log("Mais que zero!")
            if (validarServicoDuplicado(servico, os.servicos)){
                alert("Serviço duplicado!, este serviço ja foi inserido.");
                return;
            }
        }

        if (debug) console.log("✅ Campos obtidos com sucesso!");

        adicionarServicoNaOS(servico);        
        if (debug) console.log("✅ Serviço adicionado a OS!");
        
        adicionarLinhaServicos(servico);
        if (debug) console.log("✅ Linha adicionada com sucesso!");
        
        limparCampoServico();
        if (debug) console.log("✔️ Campos do modal serviço limpo!");
        
        limparTabelaMaquinas();
        if (debug) console.log("✔️ Tabela de maquinas limpa!")
            
        fecharElemento('modal-servicos');
    }
}

export function alteraCamposEspecificos() {
    let tipoServico = document.getElementById("slc-tipoServicos").value;

    let campos = document.getElementById("campos-especificos");

    switch (tipoServico) {
        case "instalacao":
            campos.innerHTML = `
                <strong> Possui infra?</strong>
                <div id="radios-instalacao-infra" class="div campos-especificos">  
                    
                    <input type="radio" name="instalacao-infra" id="radio-intInfra-sim" value="sim">
                    <label for="radio-intInfra-sim"> Sim </label>
                    
                    <input type="radio" name="instalacao-infra" id="radio-intInfra-nao" value="nao">
                    <label for="radio-intInfra-nao"> Não </label>
                </div>
                
                <strong>Instalação Padrão?</strong>
                <div id="radios-instalacao-padrao" class="div campos-especificos">
                    
                    <input type="radio" name="instalacao-padrao" id="radio-intPadrao-sim" value="sim">
                    <label for="radio-intPadrao-sim"> Sim </label>
                    
                    <input type="radio" name="instalacao-padrao" id="radio-intPadrao-nao" value="nao" >
                    <label for="radio-intPadrao-nao"> Não </label>
                </div>

                <div id="campos-instalacao-padrao" class="divInterna hidden">
                    <label for="num-distancia">Distância excedente em metros (somente números):</label>
                    <input type="number" name="num-distancia" id="num-distancia">
                </div>`;
            document.getElementById('radio-intPadrao-sim').addEventListener('change', function(){
                fecharElemento('campos-instalacao-padrao');
            });
            document.getElementById('radio-intPadrao-nao').addEventListener('change', function(){
                abrirElemento('campos-instalacao-padrao');
            });
            break;
        case "manutencao":
            campos.innerHTML = `<label for="defeito">Descrição do defeito</label>
            <input type="text" id="defeito" name="defeito" required>`
            break;
        default:
            campos.innerHTML = "";
            break;
    }

}

export function limparCampoServico() {
    const modalServico = document.getElementById("modal-servicos");
    const campos = modalServico.querySelectorAll("input, select, input[type='radio'], input[type='checkbox']");

    campos.forEach(campo => {
        if (campo.type === "radio" || campo.type === "checkbox"){
            campo.checked = false;
        }
        else {
            campo.value = "";
        }
    });

    const camposEspecificos = document.getElementById('campos-especificos');
    camposEspecificos.innerHTML = ""
    
}
function alteraCamposEspecificos() {
    let tipoServico = document.getElementById("slc-tipoServicos").value;

    let campos = document.getElementById("campos-especificos");

    switch (tipoServico) {
        case "instalacao":
            campos.innerHTML = `<p>
                <label for="instalacao-padrao">Instalação Padrão?</label>
                <input type="radio" name="instalacao-padrao" value="sim" onchange="document.getElementById('campos-instalacao-padrao').style.display = 'none'">
                Sim
                <input type="radio" name="instalacao-padrao" value="nao" onchange="document.getElementById('campos-instalacao-padrao').style.display = 'block'">
                Não</p>
                <div id="campos-instalacao-padrao" style="display: none;">
                    <label for="num-distancia">Distância excedente em metros (somente números):</label>
                    <input type="number" name="num-distancia" id="num-distancia">
                </div>`;
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

function salvarOS() {
    
}

function validarCamposOS() {
    let tipoServico = document.getElementById('slc-tipoServicos').value;
    const divServicoAtv = document.getElementById("campos-servicos");
    const tabelaMaquinas = document.getElementById("tabela-maquinas");
    const linhas = tabelaMaquinas.querySelectorAll("tbody tr");


    //validar campos-cliente 
    
    /* if (validarCamposCliente()) {

    } else {
        alert("Preencha todos os campos de cliente obrigatórios.");
        return;
    } */
    

    //validar campos-servicos

    // Verifica se foi adicionado um serviço
    /*
    if (divServicoAtv.style.display === "block") {
        
        // Verifica se os campos de serviços estão preenchidos
        if (validarCamposServicos()) {
            
        } else {
            alert("Preencha todos os campos de serviços obrigatórios.");
            return;
        }
    } else {
        alert("É preciso adcionar um serviço a Ordem de Serviço.");
        return;
    }
    */

    //validar campos-maquinas
    if (linhas.length !== 0) {
        if (validarCamposMaquinas()) {
            // Adicionar a lógica para salvar os dados da máquina
        }
        else {
            alert("Preencha todos os campos de máquinas obrigatórios.");
            return;
        }
    } else {
        alert("É preciso adicionar uma máquina ao Serviço.");
        return;
    }
}
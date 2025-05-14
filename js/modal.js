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
                    <input type="number" name="num-distancia">
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

function verificarInputs() {

}
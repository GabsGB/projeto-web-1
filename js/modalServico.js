function salvarServico() {

    if (validarCamposModalS()) {
        console.log("Campos validados com sucesso!");
        
        const servico = obterServico();
        console.log("Campos obtidos com sucesso!");

        window.osAtual.adicionarServico(servico);
        console.log("Serviço adicionado a OS!");
        
        adicionarLinhaServicos(servico);
        console.log("Linha adicionada com sucesso!");
        limparCampoServico();

        // window.osAtual.servicos.push(servico);
        console.log("Serviço adicionado com sucesso!");
        limparCampoServico();
        limparTabelaMaquinas();
        // console.log(window.osAtual)
    }
}

function alteraCamposEspecificos() {
    let tipoServico = document.getElementById("slc-tipoServicos").value;

    let campos = document.getElementById("campos-especificos");

    switch (tipoServico) {
        case "instalacao":
            campos.innerHTML = `
                <p id="radios-instalacao-infra">
                    <label for="instalacao-infra">Possui Infra?</label>
                    <input type="radio" name="instalacao-infra" value="sim">
                    Sim
                    <input type="radio" name="instalacao-infra" value="nao">
                    Não
                </p>

                <p id="radios-instalacao-padrao">
                    <label for="instalacao-padrao">Instalação Padrão?</label>
                    <input type="radio" name="instalacao-padrao" value="sim" onchange="fecharElemento('campos-instalacao-padrao')">
                    Sim
                    <input type="radio" name="instalacao-padrao" value="nao" onchange="abrirElemento('campos-instalacao-padrao')">
                    Não
                </p>

                <div id="campos-instalacao-padrao" class="divInterna hidden">
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

function limparCampoServico() {
    const modalServico = document.getElementById("modal-servicos");
    const campos = modalServico.querySelectorAll("input, select, input[type='radio'], input[type='checkbox']");
    campos.forEach(campo => {
        campo.value = "";
        campo.checked = false;
    });
    fecharElemento("modal-servicos")
}
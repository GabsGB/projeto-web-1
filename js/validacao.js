// Funções de validação de tipos de campos do formulário
function marcarCampoInvalido(campo) {
    campo.style.backgroundColor = "LightCoral";
}

function marcarCampoValido(campo) {
    campo.style.backgroundColor = "white";
}

function validarCampoVazio(campo) {
    if (!campo || campo.value.trim() === "") {
        marcarCampoInvalido(campo);
        return false;
    }
    marcarCampoValido(campo);
    return true;
}

function validarSelects(container) {
    let valido = true;
    const selects = container.querySelectorAll("select");
    
    selects.forEach(select => {
        if (!validarCampoVazio(select)) valido = false;
    });

    return valido;
}

function validarRadios(radios) {
    const checked = Array.from(radios).some(radio => radio.checked);

    // Verifica se algum radio está selecionado
    if (!checked) {
        radios.forEach(radio => {            
            radio.parentElement.style.backgroundColor = "LightCoral";
        })
        return false;
    } else {
        radios.forEach(radio => {
            radio.parentElement.style.backgroundColor = "transparent";
        })
        return true;
    }
}

// Validação dos campos do formulário de cliente, serviços e máquinas
function validarCamposOs() {
    console.log("INICIANDO VALIDAÇÃO DE CAMPOS DA OS ")

    // validação CLIENTE

    if(!validarCamposCliente()) {
        alert("Preencha todos os campos de cliente!");
        return;
    }
    console.log("Cliente validado")

    
    // validação SERVIÇO
    if(!validarCamposModalS())return
    
}

function validarCamposModalS() {
    const tabelaServico = document.getElementById("tbl-servicos");
    const div = document.getElementById('modal-servicos');

    if (div.classList.contains("hidden") && validarTabelaVazia(tabelaServico)) {
        alert("É preciso adcionar um serviço a Ordem de Serviço.");
        return;
    }

    if (!validarCamposServicos()) {
        alert("Preencha todos os campos de serviços obrigatórios.");
        return;
    }

    // validação MAQUINAS

    const tabelaMaquinas = document.getElementById("tbl-maquinas");
    
    if (!validarTabelaVazia(tabelaMaquinas)) {
        if (!validarCamposMaquinas()) {
            alert("Preencha todos os campos de máquinas obrigatórios.");
            return;
        }
    } else {
        alert("É preciso adicionar uma máquina ao Serviço.");
        return;
    }

    console.log("Servicos e maquinas validados")
    console.log("FIM DA VALIDAÇÃO DE CAMPOS DA OS!")
    return true;
}

function validarTabelaVazia(tabela) {
    
    const linhas = tabela.querySelectorAll("tbody tr");
    
    return linhas.length <= 0;
}

function validarCamposCliente() {
    let valido = true;
    
    const divCampos = document.getElementById("campos-clientes")
    const camposCliente = divCampos.querySelectorAll("input");

    const camposClienteRequeridos = divCampos.querySelectorAll('[required]');

    camposClienteRequeridos.forEach(input => {
        if (!validarCampoVazio(input)) valido = false;
    });

    return valido;

}

function validarCamposServicos() {
    let valido = true;

    const tipoServico = document.getElementById("slc-tipoServicos").value;

    const camposServicos = document.getElementById("modal-servicos");
    //Validação de selects
    if (!validarSelects(camposServicos)) valido = false;

    switch (tipoServico) {
        case "instalacao":
            const pInstalacaoInfra = document.getElementById("radios-instalacao-infra")
            const radiosInstalacaoInfra = pInstalacaoInfra.querySelectorAll('input');

            if (!validarRadios(radiosInstalacaoInfra)) {
                valido = false;
            }

            const pInstalacaoPadrao = document.getElementById("radios-instalacao-padrao")
            const radiosInstalacaoPadrao = pInstalacaoPadrao.querySelectorAll('input[name="instalacao-padrao"]');
            const numDistancia = document.getElementById("num-distancia");

            if (!validarRadios(radiosInstalacaoPadrao)) {
                valido = false;
            } else {
                const valorRadioSelecionado = Array.from(radiosInstalacaoPadrao).find(radio => radio.checked)?.value;

                if (valorRadioSelecionado === "nao") {
                    if (!validarCampoVazio(numDistancia)) valido = false;
                } else {
                    marcarCampoValido(numDistancia);
                }
            }
            break;


        case "manutencao":
            const defeito = document.getElementById("defeito");

            if (!validarCampoVazio(defeito)) {
                marcarCampoInvalido(defeito);
                valido = false;
            } else marcarCampoValido(defeito);

            break;
    }
    
    console.log("Final da validação de serviços!" + valido);

    return valido;
}

function validarCamposMaquinas() {
    let valido = true;

    const tabelaMaquinas = document.getElementById("tbl-maquinas");
    const tbody = tabelaMaquinas.querySelector("tbody");
    const linhas = tbody.querySelectorAll("tr");

    linhas.forEach(linha => {
        linha.querySelectorAll('[required]').forEach(input => {
            // console.log('input: ' + input.value);
            if (!validarCampoVazio(input)) valido = false;
        });
    });

    return valido;
    
}
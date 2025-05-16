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

    const camposServicos = document.getElementById("campos-servicos");
    const radiosInstalacao = document.querySelectorAll('input[name="instalacao-padrao"]');
    const numDistancia = document.getElementById("num-distancia");

    //Validação de selects
    if (!validarSelects(camposServicos)) valido = false;

    //validação de radio
    if (!validarRadios(radiosInstalacao)) {
        valido = false;
    } else{
        // Se o radio "não" estiver selecionado, valida o campo de distância
        const valorRadio = Array.from(radiosInstalacao).find(radio => radio.checked).value;
        console.log(valorRadio);

        if (valorRadio === "nao") {
            if (!validarCampoVazio(numDistancia)){
                
                marcarCampoInvalido(numDistancia);
                valido = false;
            } 
        } else {
            marcarCampoValido(numDistancia);
        }
    }

    return valido;
}

function validarCamposMaquinas() {
    let valido = true;

    const tabelaMaquinas = document.getElementById("tabela-maquinas");
    const tbody = tabelaMaquinas.querySelector("tbody");
    const linhas = tbody.querySelectorAll("tr");

    linhas.forEach(linha => {
        linha.querySelectorAll('[required').forEach(input => {
            // console.log('input: ' + input.value);
            if (!validarCampoVazio(input)) valido = false;
        });
    });

    return valido;
    
}
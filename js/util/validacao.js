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
export function validarCamposOs() {
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

export function validarCamposModalS() {
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

export function validarMaquinasDuplicadas(array) {
    const listaChecado = new Set();
    let indexDuplicados = [];

    array.forEach((obj, index) => {
        const keys = Object.keys(obj);
        const keysSemUltimo = keys.slice(0, -1); // todas menos a última
        const objSemUltimoCampo = {};

        keysSemUltimo.forEach(key => {
            objSemUltimoCampo[key] = obj[key];
        });

        const str = JSON.stringify(objSemUltimoCampo);

        if (listaChecado.has(str)) {
            indexDuplicados.push(index);
        } else {
            listaChecado.add(str);
        }
    });

    return indexDuplicados;
}

export function validarServicoDuplicado(servicoNovo, servicos, debug = true) {
    return servicos.some((servicoArmazenado, index) => {
        if (debug) console.log(`\n🔍 Verificando possível duplicidade com serviço armazenado #${index + 1}`);
        if (debug) console.log(`\n🔍 Serviço armazenado inteiro:`);
        if (debug) console.log(servicoArmazenado);
        if (debug) console.log(`\n🔍 Serviço Novo:`);
        if (debug) console.log(servicoNovo);

        // 1️⃣ Comparar campos principais (exceto 'quantidade' e 'maquinas')
        function compararCamposPrincipais() {
            const chaves = Object.keys(servicoNovo).filter(
                k => k !== "maquinas" && k !== "quantidade"
            );

            for (let chave of chaves) {
                const valNovo = servicoNovo[chave];
                const valArmazenado = servicoArmazenado[chave];

                if (debug) console.log(`🔑 Comparando campo '${chave}':`, valNovo, valArmazenado);

                const ambosObjetos = typeof valNovo === 'object' && valNovo !== null &&
                                     typeof valArmazenado === 'object' && valArmazenado !== null;

                if (ambosObjetos) {
                    if (JSON.stringify(valNovo) !== JSON.stringify(valArmazenado)) {
                        if (debug) console.log("❌ Diferença detectada em objeto:", chave);
                        return false;
                    }
                } else {
                    if (valNovo !== valArmazenado) {
                        if (debug) console.log("❌ Valores diferentes:", chave);
                        return false;
                    }
                }
            }

            if (debug) console.log("✅ Todos os campos principais coincidem.");
            return true;
        }

        // 2️⃣ Comparar a quantidade de máquinas
        function compararQuantidade() {
            if (debug) console.log(`🔢 Comparando quantidade: ${servicoNovo.quantidade} vs ${servicoArmazenado.quantidade}`);
            const iguais = servicoNovo.quantidade === servicoArmazenado.quantidade;
            if (debug) console.log(iguais ? "✅ Quantidade igual." : "❌ Quantidades diferentes!");
            return iguais;
        }

        // 3️⃣ Comparar máquinas
        function compararMaquinas() {
            const normalizarMaquina = maquina => {
                const entradasOrdenadas = Object.entries(maquina)
                    .sort(([a], [b]) => a.localeCompare(b));
                return JSON.stringify(Object.fromEntries(entradasOrdenadas));
            };

            const maquinasNovo = servicoNovo.maquinas.map(normalizarMaquina).sort();
            const maquinasArmazenado = servicoArmazenado.maquinas.map(normalizarMaquina).sort();

            if (debug) {
                console.log("🛠️ Comparando máquinas...");
                console.log("📦 Novo:", maquinasNovo);
                console.log("📦 Armazenado:", maquinasArmazenado);
            }

            if (maquinasNovo.length !== maquinasArmazenado.length) {
                if (debug) console.log("❌ Quantidade de máquinas diferente!");
                return false;
            }

            const iguais = JSON.stringify(maquinasNovo) === JSON.stringify(maquinasArmazenado);
            if (debug) console.log(iguais ? "✅ Máquinas iguais." : "❌ Máquinas diferentes!");
            return iguais;
        }

        // 🔁 Executar validações na ordem
        const duplicado = (
            compararCamposPrincipais() &&
            compararQuantidade() &&
            compararMaquinas()
        );

        if (debug) {
            if (duplicado) console.log("⚠️ Serviço duplicado detectado!");
            else console.log("✔️ Serviço não é duplicado.");
        }

        return duplicado;
    });
}


function adicionarLinhaMaquinas() {
    console.log("Adicionando linha à tabela");    
    // Obter a tabela
    const tabela = document.getElementById("tabela-maquinas");
    // console.log(tabela);
    const tbody = tabela.querySelector("tbody");
    console.log(tbody);

    // Criar uma nova linha
    const novaLinha = tbody.insertRow();

    // Criar células para a nova linha
    let celula1 = novaLinha.insertCell(0);
    let celula2 = novaLinha.insertCell(1);
    let celula3 = novaLinha.insertCell(2);
    let celula4 = novaLinha.insertCell(3);
    let celula5 = novaLinha.insertCell(4);
    let celula6 = novaLinha.insertCell(5);
    let celula7 = novaLinha.insertCell(6);
    let celula8 = novaLinha.insertCell(7);
    

    // Adicionar conteúdo às células
    celula1.innerHTML = "<input type='text' placeholder='Tipo' required>";
    celula2.innerHTML = "<input type='text' placeholder='Marca' required>";
    celula3.innerHTML = "<input type='number' placeholder='Capacidade' required>";
    celula4.innerHTML = "<input type='text' placeholder='Marca' required>";
    celula5.innerHTML = "<input type='text' placeholder='Info Adicional'>";
    celula6.innerHTML = "<input type='text' placeholder='Gás Refri' required>";
    celula7.innerHTML = "<input type='number' placeholder='Quantidade' required>";
    celula8.innerHTML = "<button onclick='removerLinha(this)'>Remover</button>";
    
}

function removerLinha(botao) {
    console.log("Removendo linha da tabela");
    // Obter a linha do botão clicado
    const linha = botao.parentNode.parentNode;
    // Remover a linha da tabela
    linha.parentNode.removeChild(linha);
}

function salvarMaquinas() {
    const tabela = document.getElementById("tabela-maquinas");
    const tbody = tabela.querySelector("tbody");
    const linhas = tbody.querySelectorAll("tr");

    console.log("Salvando máquinas");
    // Obter a tabela
    

    // Criar um array para armazenar os dados das máquinas
    let maquinas = [];

    // Iterar sobre as linhas da tabela
    linhas.forEach(linha => {
        let tipo = linha.cells[0].querySelector("input").value;
        let marca = linha.cells[1].querySelector("input").value;
        let capacidade = linha.cells[2].querySelector("input").value;
        let modelo = linha.cells[3].querySelector("input").value;
        let infoAdicional = linha.cells[4].querySelector("input").value;
        let gasRefrigerante = linha.cells[5].querySelector("input").value;
        let quantidade = linha.cells[6].querySelector("input").value;

        // Adicionar os dados da máquina ao array
        maquinas.push({
            tipo: tipo,
            marca: marca,
            capacidade: capacidade,
            modelo: modelo,
            infoAdicional: infoAdicional,
            gasRefrigerante: gasRefrigerante,
            quantidade: quantidade
        });
    });

    console.log(maquinas);

}
    
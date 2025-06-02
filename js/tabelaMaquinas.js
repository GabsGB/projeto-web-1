function adicionarLinhaMaquinas() {
    // console.log("Adicionando linha à tabela");    
    // Obter a tabela
    const tabela = document.getElementById("tbl-maquinas");
    // console.log(tabela);
    const tbody = tabela.querySelector("tbody");
    // console.log(tbody);

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

function limparTabelaMaquinas() {
    console.log("Limpando tabela");
    const tabela = document.getElementById("tbl-maquinas");
    const tbody = tabela.querySelector("tbody");
    tbody.innerHTML = ""; // Limpa todas as linhas do corpo da tabela
}
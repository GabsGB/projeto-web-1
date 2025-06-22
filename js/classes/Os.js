import { Instalacao } from "./Instalacao.js";
import { Desinstalacao } from "./Desinstalacao.js";
import { Manutencao } from "./Manutencao.js";
import { Higienizacao } from "./Higienizacao.js";

export class Os{
    constructor() {
        this.cliente = null;
        this.servicos = [];
        this.numeroOs = 0;
        this.dataAbertura = new Date();
    }

    async atualizarNumOS() {
        try {
                const resposta = await fetch("https://script.google.com/macros/s/AKfycbyDaypJ07MLdCo3kmzsBpiFakUS8ASvCFjsrCZrx9Kn_9NfIVqoJ_UmGAUpWH8t5qhI/exec?acao=getNumOs");
        
                if (!resposta.ok) {
                    throw new Error(`Erro ao buscar número da OS!`);
                }
        
                const dados = await resposta.text();
                console.log("Número obtido:", dados);
                this.numeroOs = dados+1;

            } catch (erro) {
                console.error("Erro ao buscar número da OS:", erro);
            }
     }

    atualizarCliente({cliente}) {
        this.cliente = cliente;
    }

    adicionarServico(servico) {
        let servicoNovo = null;
        switch(servico.tipoServico) {
            case "Instalação":
                servicoNovo = new Instalacao(servico);
                break;
            case "Desinstalação":
                servicoNovo = new Desinstalacao(servico);
                break;
            case "Manutenção":
                servicoNovo = new Manutencao(servico);
                break;
            case "Higienização":
                servicoNovo = new Higienizacao(servico);
                break;
            default:
                console.alert("Nenhum serviço encontrado");
                return;
                break;
        }
        // console.log("Serviço a ser adicionado:")
        // console.log(servicoNovo)
        this.servicos.push(servicoNovo);
    }
    
    removerServico(index){
        if (this.servicos.length === 0)throw new Error ("Lista de serviços vazia! não é possivel retirar nenhum serviço.");

        if (index < 0 || index >= this.servicos.length) throw new Error ("Index inválido!");

        // console.log("Serviço a ser removido:");
        // console.log(this.servicos[index]);
        this.servicos.splice(index, 1);
        // console.log("Serviço removido!");
    }

    resetarOrdemServico() {
        this.cliente = null;
        this.servicos = [];
        this.numeroOs = 0;
        this.dataAbertura = new Date();
    }
}
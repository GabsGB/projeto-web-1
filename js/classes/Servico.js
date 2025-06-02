export class Servico{
    constructor(servico) {
        this.tipoServico = servico.tipoServico;
        this.dificuldade = servico.dificuldade;
        this.infoAdicionais = servico.infoAdicionais || {}
        this.maquinas = servico.maquinas;
    }
}
class Servico{
    constructor(tipoServico, aparelhos=[], difculdade = null) {
        this.tipoServico = tipoServico;
        this.aparelhos = aparelhos;
        this.dificuldade = difculdade;
    }
}

export default Servico;
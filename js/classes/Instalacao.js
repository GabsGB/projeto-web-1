class Instalacao extends Servico{
    constructor(tipoServico = "Instalação", dificuldade, aparelhos, instalacaoPadrao, distanciaExcedente) {
        super(tipoServico, dificuldade, aparelhos);
        this.instalacaoPadrao = instalacaoPadrao;
        this.distanciaExcedente = distanciaExcedente;
    }
}

export default Instalacao;
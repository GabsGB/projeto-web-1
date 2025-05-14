class manutencao extends Servico{
    constructor(tipoServico = "Manutenção", aparelhos, defeito) {
        super(tipoServico, aparelhos);
        this.defeito = defeito;
    }
}

export default Manutencao;
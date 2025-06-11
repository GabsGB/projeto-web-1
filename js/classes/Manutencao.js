import {Servico} from './Servico.js';

export class Manutencao extends Servico{
    constructor(servico) {
        super({
            tipoServico: "Manutenção",
            dificuldade: servico.dificuldade,
            infoAdicionais: servico.infoAdicionais,
            maquinas: servico.maquinas,
            quantidade: servico.quantidade
        });
    }
}
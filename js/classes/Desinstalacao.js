import {Servico} from './Servico.js';

export class Desinstalacao extends Servico{
    constructor(servico) {
        super({
            tipoServico: "Desinstalação",
            dificuldade: servico.dificuldade,
            infoAdicionais: servico.infoAdicionais,
            maquinas: servico.maquinas,
            quantidade: servico.quantidade
        });
    }
}
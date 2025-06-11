import {Servico} from './Servico.js';

export class Higienizacao extends Servico{
    constructor(servico) {
        super({
            tipoServico:"Higienização",
            dificuldade: servico.dificuldade,
            infoAdicionais: servico.infoAdicionais,
            maquinas: servico.maquinas,
            quantidade: servico.quantidade
        });   
    }
}
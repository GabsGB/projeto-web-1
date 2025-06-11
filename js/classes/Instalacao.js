import {Servico} from './Servico.js';

export class Instalacao extends Servico{
    constructor(servico) {
        super({
            tipoServico:"Instalação",
            dificuldade:servico.dificuldade,
            infoAdicionais:servico.infoAdicionais,
            maquinas: servico.maquinas,
            quantidade: servico.quantidade
        });
    }
}
import {Servico} from './Servico.js';

export class Higienizacao extends Servico{
    constructor(servico) {
        super("Higienização", servico.dificuldade, servico.infoAdicionais, servico.maquinas);   
    }
}
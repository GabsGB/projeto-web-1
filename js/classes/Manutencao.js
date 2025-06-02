import {Servico} from './Servico.js';

export class Manutencao extends Servico{
    constructor(servico) {
        super("Manutenção", servico.dificuldade, servico.infoAdicionais, servico.maquinas);
    }
}
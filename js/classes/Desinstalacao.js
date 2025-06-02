import {Servico} from './Servico.js';

export class Desinstalacao extends Servico{
    constructor(servico) {
        super("Desinstalação", servico.dificuldade, servico.infoAdicionais, servico.maquinas);
    }
}
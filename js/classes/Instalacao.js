import {Servico} from './Servico.js';

export class Instalacao extends Servico{
    constructor(servico) {
        super("Instalação", servico.dificuldade, servico.infoAdicionais, servico.maquinas);
    }
}
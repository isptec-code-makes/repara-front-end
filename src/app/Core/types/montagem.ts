import { Peca } from './peca';
import { Equipamento } from './equipamento';
import { Servico } from './servico';
import { PecaPedido } from './peca-pedido';
import { BaseFilter } from './filters/base-filter';

export interface Montagem extends Servico {
    id?: number;
    createdOn?: string;
    updatedOn?: string;
    pecaPedido?: PecaPedido | null;
    peca?: Peca;
    pecaId?: number;
    equipamentoId?: number;
    equipamento?: Equipamento;
}

export interface MontagemFilter extends BaseFilter {
    equipamentoId?: number;
}

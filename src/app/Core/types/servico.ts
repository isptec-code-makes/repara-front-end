import { EnumData } from '../interfaces/EnumData';
import { Funcionario } from './funcionario';

export interface Servico {
    especialidade?: string;
    dateInit?: string | null;
    dateEnd?: string | null;
    relatorio?: string | null;
    funcionarioId?: number | null;
    funcionario?: Funcionario | null;
    estado?: ServicoEstado;
}

export enum ServicoEstado {
    Iniciado = 1,
    Cancelado,
    Terminado,
    Pendente
}

export const ServicoEstados: Array<EnumData> = [
    { id: ServicoEstado.Iniciado, description: 'Iniciado' },
    { id: ServicoEstado.Cancelado, description: 'Cancelado' },
    { id: ServicoEstado.Terminado, description: 'Terminado' },
    { id: ServicoEstado.Pendente, description: 'Pendente' }
];

export function RetornaServicoEstado(id: number) {
    return ServicoEstados.find((g) => g.id === id) ?? null;
}

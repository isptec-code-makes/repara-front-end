export interface PagamentoLancamentoValidacao {
    id?: number;
    pagamentoId?: number;
    gestor?: number | null;
    dataValidacao?: string | null;
    userIdPagamentoVaidacao?: string | null;
}


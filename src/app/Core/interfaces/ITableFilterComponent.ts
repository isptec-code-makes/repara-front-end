import { EnumData } from './EnumData';
import { GetAllResponde } from '../types/getAllResponde';
import { Table } from 'primeng/table';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { TableColumn } from './tableColumn';

export interface ITableFilterComponent<T, T2> {
    // variavel para armazenar a referênia a tabela
    table: Table;

    // variável para armazenar os filtos da tabela
    filter: T2;

    // variavel para armazenar os registros da tabela
    data: Array<T>;

    columns: Array<TableColumn>;

    // estado do sidebar dos filtros avançados
    //showFilterSidebar: boolean;

    // controle do carregamento dos dados
    loading: boolean;
    //loadingExport: boolean;
    //loadingImport: boolean;

    // controle da estrutura da tabela
    rowsPerPageOptions: Array<number>;
    currentPageReportTemplate: string;

    // variáveis para a paginação
    pageSize: number;
    totalCount: number;
    currentPage: number;

    // Variavel para armazenar os periodos dos filtros (diario, semanal, mensal)
    //periodDates: Array<EnumData>;

    // vairiaveis para os filtros avançados
    //appliedFilter: boolean;
    //lastDataFilter: any;

    //menuFilerOptions: Array<MenuItem>;

    // variaveis para controlar os intervalos de datas dos registros
    //dataInicioFilter: any;
    //dataFimFilter: any;

    // Método para carregar os dados da tabela
    loadLazy(event: LazyLoadEvent): void;

    // método para processar a paginação de uma tabela
    loadPaginationData(dataResponse: GetAllResponde<T>): void;

    // Método para aplicar pesquisa global
    onGlobalFilter(event: Event): void;

    // Método para abrir e fechar o filtro global
    //openSidebarFilter(): void;

    // método para limpar os filtros aplicados a uma tabela
    //clearFilters(): void;

    // método para aplicar filtros e atualizar os dados da tabela
    //aplyFilters(): void;

    // método para aplicar filtos relacionados ao periodo
    //applyLastPeriodicFilter(): void;

    // método para remover um filtro de uma table
    //removeFilter(filter: string): void;

    // método para verificar se o botão para aplicar os filtros deve estar abilitado
    //enableFilterButton(): boolean;

    // método para validar as datas de um filtro
    //validateDateFormFilter(): void

    // método para importar dados
    //importData(): void;

    // método para exportar dados
    //exportData(): void;
}

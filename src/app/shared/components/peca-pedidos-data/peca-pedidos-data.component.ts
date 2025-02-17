import { Component, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { ITableFilterComponent } from '../../../Core/interfaces/ITableFilterComponent';
import { Table, TableModule } from 'primeng/table';
import { TableColumn } from '../../../Core/interfaces/tableColumn';
import { ConfigService } from '../../../Core/services/config.service';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { GetAllResponde } from '../../../Core/types/getAllResponde';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { EnumData } from '../../../Core/interfaces/EnumData';
import { PecaPedido, PecaPedidoEstados, PecaPedidoFilter } from '../../../Core/types/peca-pedido';
import { PecaPedidoService } from '../../../Core/services/peca-pedido.service';

@Component({
    selector: 'app-peca-pedidos-data',
    imports: [
        CommonModule,
        TableModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        TextareaModule,
        SelectModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        TagModule,
        InputIconModule,
        IconFieldModule,
        ConfirmDialogModule
    ],
    templateUrl: './peca-pedidos-data.component.html',
    styleUrl: './peca-pedidos-data.component.scss',
    providers: [MessageService, ConfirmationService]
})
export class PecaPedidosDataComponent implements ITableFilterComponent<PecaPedido, PecaPedidoFilter>, OnInit {
    configService = inject(ConfigService);

    @ViewChild('table') table!: Table;

    filter!: PecaPedidoFilter;

    data: Array<PecaPedido> = [];

    columns!: Array<TableColumn>;

    loading: boolean = false;

    rowsPerPageOptions: Array<number> = this.configService.getConfig.pagingRange;
    currentPageReportTemplate: string = this.configService.getConfig.currentPageReportTemplate;

    pageSize: number = this.configService.getConfig.defaultPageSize;
    totalCount: number = 0;
    currentPage: number = 0;

    baseUrl = this.configService.getConfig.baseUrl;

    // métodos para o curd
    pecaPeidoDialog: boolean = false;

    pecaPeido!: PecaPedido;

    submitted: boolean = false;

    statuses!: any[];

    //////////
    estados: Array<EnumData> = PecaPedidoEstados;

    constructor(
        private pecaPeidoService: PecaPedidoService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.columns = [
            { field: 'id', header: '#', sortable: true },
            { field: 'createdOn', header: 'Data Criação', sortable: true },
            { field: 'preco', header: 'Preço', sortable: true },
            { field: 'pecaId', header: 'Peça', sortable: true },
            { field: 'montagemId', header: 'Montagem', sortable: true },
            { field: 'dateProcessed', header: 'Data Processamento', sortable: true },
            { field: 'estado', header: 'Estado', sortable: true }
        ];
    }

    loadLazy(event: LazyLoadEvent | any): void {
        this.loading = true;
        this.data = [];

        const pageNumber = Math.floor(event.first! / event.rows!) + 1;
        const pageSize = event.rows!;

        this.filter = {
            pageNumber: pageNumber,
            pageSize: pageSize,
            sortBy: event.sortField,
            isDecsending: event.sortOrder != 1,
            search: event.globalFilter
        };

        this.pecaPeidoService.getAll(this.filter).subscribe({
            next: (response) => {
                console.log(response);
                this.loadPaginationData(response);
                this.loading = false;
            },
            error: (err: HttpErrorResponse) => {
                this.loading = false;
                // TODO: Adicionar um toast
                console.error('Erro ao carregar dados: ', err);
            }
        });
    }

    loadPaginationData(dataResponse: GetAllResponde<PecaPedido>) {
        this.pageSize = dataResponse.pageSize;
        this.currentPage = dataResponse.currentPage;
        this.totalCount = dataResponse.totalCount;
        this.data = dataResponse.data;
    }

    onGlobalFilter(event: Event) {
        this.table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    // métodos para o curd

    editPecaPedido(pecaPeido: PecaPedido) {
        this.pecaPeido = { ...pecaPeido };
        this.pecaPeidoDialog = true;
    }

    hideDialog() {
        this.pecaPeidoDialog = false;
        this.submitted = false;
    }

    deletePecaPedido(pecaPeido: PecaPedido) {
        this.confirmationService.confirm({
            message: 'tem a certeza que pretende excluir ' + pecaPeido.id + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',

            accept: () => {
                this.pecaPeidoService.delete(Number(pecaPeido.id)).subscribe({
                    next: (response) => {
                        this.table.reset();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'PecaPedido excluído',
                            life: 3000
                        });
                        this.pecaPeido = {};
                    },
                    error: (err: HttpErrorResponse) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: err.error.message,
                            life: 3000
                        });
                        console.error('Erro ao excluir funcionário: ', err);
                    }
                });
            }
        });
    }

    savePecaPedido() {
        this.submitted = true;
        console.log(this.pecaPeido);

        if (this.pecaPeido.createdOn?.trim()) {
            if (this.pecaPeido.id) {
                this.pecaPeidoService.update(this.pecaPeido, Number(this.pecaPeido.id)).subscribe({
                    next: (response) => {
                        this.table.reset();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'PecaPedido atualizado',
                            life: 3000
                        });
                    },
                    error: (err: HttpErrorResponse) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: err.error.message,
                            life: 3000
                        });
                        console.error('Erro ao atualizar funcionário: ', err);
                    }
                });
            } else {
                this.pecaPeidoService.create(this.pecaPeido).subscribe({
                    next: (response) => {
                        this.table.reset();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'PecaPedido criado',
                            life: 3000
                        });
                    },
                    error: (err: HttpErrorResponse) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: err.error.message,
                            life: 3000
                        });
                        console.error('Erro ao criar funcionário: ', err);
                    }
                });
            }

            this.pecaPeidoDialog = false;
            this.pecaPeido = {};
        }
    }
}

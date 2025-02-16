import { Component, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { ITableFilterComponent } from '../../../Core/interfaces/ITableFilterComponent';
import { SolicitacaoEstados, SolicitacaoPrioridades, Solicitacao, SolicitacaoFilter } from '../../../Core/types/solicitacao';
import { Table, TableModule } from 'primeng/table';
import { TableColumn } from '../../../Core/interfaces/tableColumn';
import { SolicitacaoService } from '../../../Core/services/solicitacao.service';
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
import { Router } from '@angular/router';

@Component({
    selector: 'app-solicitacaos-data',
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
        ConfirmDialogModule,
        TextareaModule
    ],
    templateUrl: './solicitacaos-data.component.html',
    styleUrl: './solicitacaos-data.component.scss',
    providers: [MessageService, ConfirmationService]
})
export class SolicitacaosDataComponent implements ITableFilterComponent<Solicitacao, SolicitacaoFilter>, OnInit {
    configService = inject(ConfigService);

    @ViewChild('table') table!: Table;

    filter!: SolicitacaoFilter;

    data: Array<Solicitacao> = [];

    columns!: Array<TableColumn>;

    loading: boolean = false;

    rowsPerPageOptions: Array<number> = this.configService.getConfig.pagingRange;
    currentPageReportTemplate: string = this.configService.getConfig.currentPageReportTemplate;

    pageSize: number = this.configService.getConfig.defaultPageSize;
    totalCount: number = 0;
    currentPage: number = 0;

    baseUrl = this.configService.getConfig.baseUrl;

    // métodos para o curd
    solicitacaoDialog: boolean = false;

    solicitacao!: Solicitacao;

    submitted: boolean = false;

    statuses!: any[];

    //////////
    estados: Array<EnumData> = SolicitacaoEstados;
    prioridades: Array<EnumData> = SolicitacaoPrioridades;

    constructor(
        private solicitacaoService: SolicitacaoService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.columns = [
            { field: 'id', header: 'ID', sortable: true },
            { field: 'clienteId', header: 'Cliente', sortable: true },
            { field: 'prioridade', header: 'Prioridade', sortable: true },
            { field: 'estado', header: 'Estado', sortable: true },
            { field: 'preco', header: 'Preço', sortable: true },
            { field: 'createdOn', header: 'Data de criação', sortable: true }
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

        this.solicitacaoService.getAll(this.filter).subscribe({
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

    loadPaginationData(dataResponse: GetAllResponde<Solicitacao>) {
        this.pageSize = dataResponse.pageSize;
        this.currentPage = dataResponse.currentPage;
        this.totalCount = dataResponse.totalCount;
        this.data = dataResponse.data;
    }

    onGlobalFilter(event: Event) {
        this.table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    // métodos para o curd

    detailSolicitacao(solicitacao: Solicitacao) {
        this.router.navigate(['/solicitacoes', solicitacao.id]);
    }

    openNew() {
        this.solicitacao = {};
        this.submitted = false;
        this.solicitacaoDialog = true;
    }

    editSolicitacao(solicitacao: Solicitacao) {
        this.solicitacao = { ...solicitacao };
        this.solicitacaoDialog = true;
    }

    hideDialog() {
        this.solicitacaoDialog = false;
        this.submitted = false;
    }

    deleteSolicitacao(solicitacao: Solicitacao) {
        this.confirmationService.confirm({
            message: 'tem a certeza que pretende excluir esta solicitação ?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',

            accept: () => {
                this.solicitacaoService.delete(Number(solicitacao.id)).subscribe({
                    next: (response) => {
                        this.table.reset();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Solicitacao excluído',
                            life: 3000
                        });
                        this.solicitacao = {};
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

    saveSolicitacao() {
        this.submitted = true;
        console.log(this.solicitacao);

        if (this.solicitacao.descricaoProblema) {
            if (this.solicitacao.id) {
                this.solicitacaoService.update(this.solicitacao, Number(this.solicitacao.id)).subscribe({
                    next: (response) => {
                        this.table.reset();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Solicitacao atualizado',
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
                this.solicitacaoService.create(this.solicitacao).subscribe({
                    next: (response) => {
                        this.table.reset();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Solicitacao criado',
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

            this.solicitacaoDialog = false;
            this.solicitacao = {};
        }
    }
}

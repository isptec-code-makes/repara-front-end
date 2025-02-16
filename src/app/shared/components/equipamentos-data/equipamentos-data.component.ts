import { Component, effect, inject, Input, OnInit, Signal, ViewChild, viewChild } from '@angular/core';
import { ITableFilterComponent } from '../../../Core/interfaces/ITableFilterComponent';
import { Equipamento, EquipamentoCategorias, EquipamentoFilter } from '../../../Core/types/equipamento';
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
import { EquipamentoService } from '../../../Core/services/equipamento.service';
import { EnumData } from '../../../Core/interfaces/EnumData';
import { Router } from '@angular/router';

@Component({
    selector: 'app-equipamentos-data',
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
    templateUrl: './equipamentos-data.component.html',
    styleUrl: './equipamentos-data.component.scss',
    providers: [MessageService, ConfirmationService]
})
export class EquipamentosDataComponent implements ITableFilterComponent<Equipamento, EquipamentoFilter>, OnInit {
    configService = inject(ConfigService);

    @ViewChild('table') table!: Table;

    @Input() solicitacaoId?: Signal<number>;

    filter!: EquipamentoFilter;

    data: Array<Equipamento> = [];

    columns!: Array<TableColumn>;

    loading: boolean = false;

    rowsPerPageOptions: Array<number> = this.configService.getConfig.pagingRange;
    currentPageReportTemplate: string = this.configService.getConfig.currentPageReportTemplate;

    pageSize: number = this.configService.getConfig.defaultPageSize;
    totalCount: number = 0;
    currentPage: number = 0;

    baseUrl = this.configService.getConfig.baseUrl;

    // métodos para o curd
    equipamentoDialog: boolean = false;

    equipamento!: Equipamento;

    submitted: boolean = false;

    statuses!: any[];

    //////////
    categorias: Array<EnumData> = EquipamentoCategorias;

    constructor(
        private equipamentoService: EquipamentoService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {
        effect(() => {});
    }

    ngOnInit(): void {
        this.columns = [
            { field: 'id', header: '#', sortable: true },
            { field: 'categoria', header: 'Categoria', sortable: true },
            { field: 'marca', header: 'Marca', sortable: true },
            { field: 'modelo', header: 'Modelo', sortable: true }
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

        if (this.solicitacaoId) {
            this.filter.solicitacaoId = this.solicitacaoId();
        }

        console.log(this.filter);

        this.equipamentoService.getAll(this.filter).subscribe({
            next: (response) => {
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

    loadPaginationData(dataResponse: GetAllResponde<Equipamento>) {
        this.pageSize = dataResponse.pageSize;
        this.currentPage = dataResponse.currentPage;
        this.totalCount = dataResponse.totalCount;
        this.data = dataResponse.data;
    }

    onGlobalFilter(event: Event) {
        this.table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    // métodos para o curd

    detailEquipamento(equipamento: Equipamento) {
        this.router.navigate(['/equipamentos', equipamento.id]);
    }

    openNew() {
        this.equipamento = {};
        this.submitted = false;
        this.equipamentoDialog = true;
    }

    editEquipamento(equipamento: Equipamento) {
        this.equipamento = { ...equipamento };
        this.equipamentoDialog = true;
    }

    hideDialog() {
        this.equipamentoDialog = false;
        this.submitted = false;
    }

    deleteEquipamento(equipamento: Equipamento) {
        this.confirmationService.confirm({
            message: 'tem a certeza que pretende excluir ' + equipamento.modelo + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',

            accept: () => {
                this.equipamentoService.delete(Number(equipamento.id)).subscribe({
                    next: (response) => {
                        this.table.reset();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Equipamento excluído',
                            life: 3000
                        });
                        this.equipamento = {};
                    },
                    error: (err: HttpErrorResponse) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: err.error.message,
                            life: 3000
                        });
                        console.error('Erro ao excluir equipamento: ', err);
                    }
                });
            }
        });
    }

    saveEquipamento() {
        this.submitted = true;
        console.log(this.equipamento);
        if (this.equipamento.modelo?.trim()) {
            if (this.equipamento.id) {
                this.equipamentoService.update(this.equipamento, Number(this.equipamento.id)).subscribe({
                    next: (response) => {
                        this.table.reset();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Equipamento atualizado',
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
                        console.error('Erro ao atualizar equipamento: ', err);
                    }
                });
            } else {
                if (this.solicitacaoId) {
                    this.equipamento.solicitacaoId = this.solicitacaoId();
                    this.equipamentoService.create(this.equipamento).subscribe({
                        next: (response) => {
                            this.table.reset();
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Sucesso',
                                detail: 'Equipamento criado',
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
                            console.error('Erro ao criar equipamento: ', err);
                        }
                    });
                }
            }

            this.equipamentoDialog = false;
            this.equipamento = {};
        }
    }
}

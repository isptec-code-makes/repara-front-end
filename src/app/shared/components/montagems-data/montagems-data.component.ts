import { Component, inject, Input, OnInit, Signal, signal, ViewChild, viewChild, WritableSignal } from '@angular/core';
import { ITableFilterComponent } from '../../../Core/interfaces/ITableFilterComponent';
import { Montagem, MontagemFilter } from '../../../Core/types/montagem';
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
import { MontagemService } from '../../../Core/services/montagem.service';
import { PecaService } from '../../../Core/services/peca.service';
import { Peca } from '../../../Core/types/peca';

@Component({
    selector: 'app-montagems-data',
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
    templateUrl: './montagems-data.component.html',
    styleUrl: './montagems-data.component.scss',
    providers: [MessageService, ConfirmationService]
})
export class MontagemsDataComponent implements ITableFilterComponent<Montagem, MontagemFilter>, OnInit {
    configService = inject(ConfigService);

    @ViewChild('table') table!: Table;

    @Input() equipamentoId?: Signal<number>;

    pecas: WritableSignal<Array<Peca>> = signal([]);

    filter!: MontagemFilter;

    data: Array<Montagem> = [];

    columns!: Array<TableColumn>;

    loading: boolean = false;

    rowsPerPageOptions: Array<number> = this.configService.getConfig.pagingRange;
    currentPageReportTemplate: string = this.configService.getConfig.currentPageReportTemplate;

    pageSize: number = this.configService.getConfig.defaultPageSize;
    totalCount: number = 0;
    currentPage: number = 0;

    baseUrl = this.configService.getConfig.baseUrl;

    // métodos para o curd
    montagemDialog: boolean = false;

    montagem!: Montagem;

    submitted: boolean = false;

    statuses!: any[];

    constructor(
        private montagemService: MontagemService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private pecaService: PecaService
    ) {}

    ngOnInit(): void {
        this.columns = [
            { field: 'id', header: '#', sortable: true },
            { field: 'createdOn', header: 'Data de Criação', sortable: true },
            { field: 'updatedOn', header: 'Data de Atualização', sortable: true }
        ];

        this.pecaService.getAll({}).subscribe({
            next: (response) => {
                this.pecas.set(response.data);
            },
            error: (err: HttpErrorResponse) => {
                console.error('Erro ao carregar peças: ', err);
            }
        });
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

        if (this.equipamentoId) {
            this.filter.equipamentoId = this.equipamentoId();
        }

        this.montagemService.getAll(this.filter).subscribe({
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

    loadPaginationData(dataResponse: GetAllResponde<Montagem>) {
        this.pageSize = dataResponse.pageSize;
        this.currentPage = dataResponse.currentPage;
        this.totalCount = dataResponse.totalCount;
        this.data = dataResponse.data;
    }

    onGlobalFilter(event: Event) {
        this.table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    // métodos para o curd

    openNew() {
        this.montagem = {};
        this.submitted = false;
        this.montagemDialog = true;
    }

    editMontagem(montagem: Montagem) {
        this.montagem = { ...montagem };
        this.montagemDialog = true;
    }

    hideDialog() {
        this.montagemDialog = false;
        this.submitted = false;
    }

    deleteMontagem(montagem: Montagem) {
        this.confirmationService.confirm({
            message: 'tem a certeza que pretende excluir essa montagem?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',

            accept: () => {
                this.montagemService.delete(Number(montagem.id)).subscribe({
                    next: (response) => {
                        this.table.reset();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Montagem excluído',
                            life: 3000
                        });
                        this.montagem = {};
                    },
                    error: (err: HttpErrorResponse) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: err.error.message,
                            life: 3000
                        });
                        console.error('Erro ao excluir montagem: ', err);
                    }
                });
            }
        });
    }

    saveMontagem() {
        this.submitted = true;
        console.log(this.montagem);

        if (this.montagem.pecaId) {
            if (this.montagem.id) {
                this.montagemService.update(this.montagem, Number(this.montagem.id)).subscribe({
                    next: (response) => {
                        this.table.reset();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Montagem atualizado',
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
                        console.error('Erro ao atualizar montagem: ', err);
                    }
                });
            } else {
                if (this.equipamentoId) {
                    this.montagem.equipamentoId = this.equipamentoId();
                    this.montagemService.create(this.montagem).subscribe({
                        next: (response) => {
                            this.table.reset();
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Sucesso',
                                detail: 'Montagem criado',
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
                            console.error('Erro ao criar montagem: ', err);
                        }
                    });
                }
            }

            this.montagemDialog = false;
            this.montagem = {};
        }
    }

    // métodos para as peças

    serarchPecas(event: any) {
        this.pecaService.getAll({ search: event.query }).subscribe({
            next: (response) => {
                this.pecas.set(response.data);
            },
            error: (err: HttpErrorResponse) => {
                console.error('Erro ao carregar peças: ', err);
            }
        });
    }
}

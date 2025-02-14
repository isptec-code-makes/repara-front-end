import { Component, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { ITableFilterComponent } from '../../../Core/interfaces/ITableFilterComponent';
import { Funcionario, FuncionarioFilter } from '../../../Core/types/funcionario';
import { Table, TableModule } from 'primeng/table';
import { TableColumn } from '../../../Core/interfaces/tableColumn';
import { FuncionarioService } from '../../../Core/services/funcionario.service';
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

@Component({
    selector: 'app-funcionarios-data',
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
    templateUrl: './funcionarios-data.component.html',
    styleUrl: './funcionarios-data.component.scss',
    providers: [MessageService, ConfirmationService]
})
export class FuncionariosDataComponent implements ITableFilterComponent<Funcionario, FuncionarioFilter>, OnInit {
    configService = inject(ConfigService);

    @ViewChild('table') table!: Table;

    filter!: FuncionarioFilter;

    data: Array<Funcionario> = [];

    columns!: Array<TableColumn>;

    loading: boolean = false;

    rowsPerPageOptions: Array<number> = this.configService.getConfig.pagingRange;
    currentPageReportTemplate: string = this.configService.getConfig.currentPageReportTemplate;

    pageSize: number = this.configService.getConfig.defaultPageSize;
    totalCount: number = 0;
    currentPage: number = 0;

    baseUrl = this.configService.getConfig.baseUrl;

    // métodos para o curd
    funcionarioDialog: boolean = false;

    funcionario!: Funcionario;

    submitted: boolean = false;

    statuses!: any[];

    constructor(
        private funcionarioService: FuncionarioService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.columns = [
            { field: 'id', header: '#', sortable: true },
            { field: 'nome', header: 'Nome', sortable: true },
            { field: 'email', header: 'Email', sortable: true },
            { field: 'telefone', header: 'Telefone', sortable: true },
            { field: 'ocupado', header: 'Ocupado', sortable: true },
            //{ field: 'horarioTrabalho', header: 'Horário de Trabalho', sortable: true },
            { field: 'especialidades', header: 'Especialidades', sortable: true }
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

        this.funcionarioService.getAll(this.filter).subscribe({
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

    loadPaginationData(dataResponse: GetAllResponde<Funcionario>) {
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
        this.funcionario = {};
        this.submitted = false;
        this.funcionarioDialog = true;
    }

    editFuncionario(funcionario: Funcionario) {
        this.funcionario = { ...funcionario };
        this.funcionarioDialog = true;
    }

    hideDialog() {
        this.funcionarioDialog = false;
        this.submitted = false;
    }

    deleteFuncionario(funcionario: Funcionario) {
        this.confirmationService.confirm({
            message: 'tem a certeza que pretende excluir ' + funcionario.nome + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',

            accept: () => {
                this.funcionarioService.delete(Number(funcionario.id)).subscribe({
                    next: (response) => {
                        this.table.reset();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Funcionario excluído',
                            life: 3000
                        });
                        this.funcionario = {};
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

    saveFuncionario() {
        this.submitted = true;
        console.log(this.funcionario);

        if (this.funcionario.nome?.trim()) {
            if (this.funcionario.id) {
                this.funcionarioService.update(this.funcionario, Number(this.funcionario.id)).subscribe({
                    next: (response) => {
                        this.table.reset();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Funcionario atualizado',
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
                this.funcionarioService.create(this.funcionario).subscribe({
                    next: (response) => {
                        this.table.reset();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Funcionario criado',
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

            this.funcionarioDialog = false;
            this.funcionario = {};
        }
    }
}

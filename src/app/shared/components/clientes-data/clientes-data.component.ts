import { Component, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { ITableFilterComponent } from '../../../Core/interfaces/ITableFilterComponent';
import { Cliente, ClienteFilter } from '../../../Core/types/cliente';
import { Table, TableModule } from 'primeng/table';
import { TableColumn } from '../../../Core/interfaces/tableColumn';
import { ClienteService } from '../../../Core/services/cliente.service';
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
    selector: 'app-clientes-data',
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
    templateUrl: './clientes-data.component.html',
    styleUrl: './clientes-data.component.scss',
    providers: [MessageService, ConfirmationService]
})
export class ClientesDataComponent implements ITableFilterComponent<Cliente, ClienteFilter>, OnInit {
    configService = inject(ConfigService);

    @ViewChild('table') table!: Table;

    filter!: ClienteFilter;

    data: Array<Cliente> = [];

    columns!: Array<TableColumn>;

    loading: boolean = false;

    rowsPerPageOptions: Array<number> = this.configService.getConfig.pagingRange;
    currentPageReportTemplate: string = this.configService.getConfig.currentPageReportTemplate;

    pageSize: number = this.configService.getConfig.defaultPageSize;
    totalCount: number = 0;
    currentPage: number = 0;

    baseUrl = this.configService.getConfig.baseUrl;

    // métodos para o curd
    clienteDialog: boolean = false;

    cliente!: Cliente;

    submitted: boolean = false;

    statuses!: any[];

    constructor(
        private clienteService: ClienteService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.columns = [
            { field: 'id', header: '#', sortable: true },
            { field: 'nome', header: 'Nome', sortable: true },
            { field: 'email', header: 'Email', sortable: true },
            { field: 'telefone', header: 'Telefone', sortable: true },
            { field: 'endereco', header: 'Endereço', sortable: true }
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

        this.clienteService.getAll(this.filter).subscribe({
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

    loadPaginationData(dataResponse: GetAllResponde<Cliente>) {
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
        this.cliente = {};
        this.submitted = false;
        this.clienteDialog = true;
    }

    editCliente(cliente: Cliente) {
        this.cliente = { ...cliente };
        this.clienteDialog = true;
    }

    hideDialog() {
        this.clienteDialog = false;
        this.submitted = false;
    }

    deleteCliente(cliente: Cliente) {
        this.confirmationService.confirm({
            message: 'tem a certeza que pretende excluir ' + cliente.nome + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',

            accept: () => {
                this.clienteService.delete(Number(cliente.id)).subscribe({
                    next: (response) => {
                        this.table.reset();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Cliente excluído',
                            life: 3000
                        });
                        this.cliente = {};
                    },
                    error: (err: HttpErrorResponse) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: err.error.message,
                            life: 3000
                        });
                        console.error('Erro ao excluir cliente: ', err);
                    }
                });
            }
        });
    }

    saveCliente() {
        this.submitted = true;
        console.log(this.cliente);

        if (this.cliente.nome?.trim()) {
            if (this.cliente.id) {
                this.clienteService.update(this.cliente, Number(this.cliente.id)).subscribe({
                    next: (response) => {
                        this.table.reset();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Cliente atualizado',
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
                        console.error('Erro ao atualizar cliente: ', err);
                    }
                });
            } else {
                this.clienteService.create(this.cliente).subscribe({
                    next: (response) => {
                        this.table.reset();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Cliente criado',
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
                        console.error('Erro ao criar cliente: ', err);
                    }
                });
            }

            this.clienteDialog = false;
            this.cliente = {};
        }
    }
}

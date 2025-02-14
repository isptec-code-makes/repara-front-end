import { Component, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { ITableFilterComponent } from '../../../Core/interfaces/ITableFilterComponent';
import { EquipamentoCategorias, Peca, PecaFilter } from '../../../Core/types/peca';
import { Table, TableModule } from 'primeng/table';
import { TableColumn } from '../../../Core/interfaces/tableColumn';
import { PecaService } from '../../../Core/services/peca.service';
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

@Component({
    selector: 'app-pecas-data',
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
    templateUrl: './pecas-data.component.html',
    styleUrl: './pecas-data.component.scss',
    providers: [MessageService, ConfirmationService]
})
export class PecasDataComponent implements ITableFilterComponent<Peca, PecaFilter>, OnInit {
    configService = inject(ConfigService);

    @ViewChild('table') table!: Table;

    filter!: PecaFilter;

    data: Array<Peca> = [];

    columns!: Array<TableColumn>;

    loading: boolean = false;

    rowsPerPageOptions: Array<number> = this.configService.getConfig.pagingRange;
    currentPageReportTemplate: string = this.configService.getConfig.currentPageReportTemplate;

    pageSize: number = this.configService.getConfig.defaultPageSize;
    totalCount: number = 0;
    currentPage: number = 0;

    baseUrl = this.configService.getConfig.baseUrl;

    // métodos para o curd
    pecaDialog: boolean = false;

    peca!: Peca;

    submitted: boolean = false;

    statuses!: any[];

    //////////
    categorias: Array<EnumData> = EquipamentoCategorias;

    constructor(
        private pecaService: PecaService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.columns = [
            { field: 'id', header: '#', sortable: true },
            { field: 'designacao', header: 'Designacao', sortable: true },
            { field: 'preco', header: 'Preço', sortable: true },
            { field: 'modelo', header: 'Modelo', sortable: true },
            { field: 'marca', header: 'Marca', sortable: true },
            { field: 'categoria', header: 'Categoria', sortable: true },
            { field: 'estoque', header: 'Estoque', sortable: true }
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

        this.pecaService.getAll(this.filter).subscribe({
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

    loadPaginationData(dataResponse: GetAllResponde<Peca>) {
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
        this.peca = {};
        this.submitted = false;
        this.pecaDialog = true;
    }

    editPeca(peca: Peca) {
        this.peca = { ...peca };
        this.pecaDialog = true;
    }

    hideDialog() {
        this.pecaDialog = false;
        this.submitted = false;
    }

    deletePeca(peca: Peca) {
        this.confirmationService.confirm({
            message: 'tem a certeza que pretende excluir ' + peca.designacao + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',

            accept: () => {
                this.pecaService.delete(Number(peca.id)).subscribe({
                    next: (response) => {
                        this.table.reset();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Peca excluído',
                            life: 3000
                        });
                        this.peca = {};
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

    savePeca() {
        this.submitted = true;
        console.log(this.peca);

        if (this.peca.designacao?.trim()) {
            if (this.peca.id) {
                this.pecaService.update(this.peca, Number(this.peca.id)).subscribe({
                    next: (response) => {
                        this.table.reset();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Peca atualizado',
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
                this.pecaService.create(this.peca).subscribe({
                    next: (response) => {
                        this.table.reset();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Peca criado',
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

            this.pecaDialog = false;
            this.peca = {};
        }
    }
}

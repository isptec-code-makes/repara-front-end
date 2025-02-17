import { Component, effect, OnInit, signal, WritableSignal } from '@angular/core';
import { MontagemsDataComponent } from '../../shared/components/montagems-data/montagems-data.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipamentoService } from '../../Core/services/equipamento.service';
import { Equipamento } from '../../Core/types/equipamento';
import { Diagnostico } from '../../Core/types/diagnostico';
import { CommonModule, JsonPipe } from '@angular/common';
import { BlockUI } from 'primeng/blockui';
import { PanelModule } from 'primeng/panel';
import { FuncionarioDetailComponent } from '../../shared/components/funcionario-detail/funcionario-detail.component';
import { ServicoEstadoComponent } from '../../shared/components/servico-estado/servico-estado.component';
import { ButtonModule } from 'primeng/button';
import { ServicoEstado, ServicoEstados } from '../../Core/types/servico';
import { DiagnosticoService } from '../../Core/services/diagnostico.service';
import { DialogModule } from 'primeng/dialog';
import { TextareaModule } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-equipamento',
    imports: [MontagemsDataComponent, JsonPipe, BlockUI, PanelModule, FuncionarioDetailComponent, ServicoEstadoComponent, ButtonModule, CommonModule, DialogModule, TextareaModule, FormsModule],
    templateUrl: './equipamento.component.html',
    styleUrl: './equipamento.component.scss'
})
export class EquipamentoComponent implements OnInit {
    equipamento: WritableSignal<Equipamento> = signal({});
    diagnostico: WritableSignal<Diagnostico> = signal({});

    diagnosticoLoading: boolean = false;

    equipamentoId = signal(0);

    servicosEstados = ServicoEstado;

    relatorioDialog: boolean = false;
    relatorio!: string;
    servicoEstado!: ServicoEstado;

    constructor(
        private activatedRoute: ActivatedRoute,
        private equipamentoService: EquipamentoService,
        private diagnosticoservice: DiagnosticoService,
        private router: Router
    ) {
        effect(() => {});
    }

    ngOnInit(): void {
        const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

        if (Number.isInteger(id)) {
            this.equipamentoId.set(id);
            this.loadEquipamentocao(Number(id));
            this.loadDiagnostico(Number(id));
        } else {
            this.router.navigate(['/notfound']);
        }
    }

    private loadEquipamentocao(id: number): void {
        this.equipamentoService.getById(id).subscribe({
            next: (equipamento) => this.equipamento.set(equipamento),
            error: (error) => console.error(error)
        });
    }

    private loadDiagnostico(id: number): void {
        this.equipamentoService.getDiagnostico(id).subscribe({
            next: (diagnostico) => this.diagnostico.set(diagnostico),
            error: (error) => console.error(error)
        });
    }

    actualizarDiagnosticoEstado(estado: ServicoEstado) {
        let diagnostico: Diagnostico = {
            estado: estado
        };

        if (this.relatorio) diagnostico.relatorio = this.relatorio;

        this.diagnosticoLoading = true;
        this.diagnosticoservice.update(diagnostico, Number(this.diagnostico().id)).subscribe({
            next: (diagnostico) => {
                this.loadDiagnostico(Number(this.equipamentoId()));
                this.diagnosticoLoading = false;
            },
            error: (error) => {
                console.error(error);
                this.diagnosticoLoading = false;
            }
        });
    }

    atualizarRelatorio() {
        this.actualizarDiagnosticoEstado(this.servicoEstado);
        this.cancelRelatorio();
    }

    openDialog(servicoEstado: ServicoEstado) {
        this.servicoEstado = servicoEstado;
        this.relatorioDialog = true;
    }

    cancelRelatorio() {
        this.relatorioDialog = false;
        this.relatorio = '';
    }
}

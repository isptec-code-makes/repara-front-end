import { Component, Input, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { FuncionarioService } from '../../../Core/services/funcionario.service';
import { Funcionario } from '../../../Core/types/funcionario';
import { ChipModule } from 'primeng/chip';

@Component({
    selector: 'app-funcionario-detail',
    imports: [ChipModule],
    templateUrl: './funcionario-detail.component.html',
    styleUrl: './funcionario-detail.component.scss'
})
export class FuncionarioDetailComponent implements OnInit {
    @Input({ required: true }) funcionarioId!: number | undefined;

    funcionario: WritableSignal<Funcionario> = signal({});

    constructor(private funcionarioService: FuncionarioService) {}

    ngOnInit(): void {
        this.funcionarioService.getById(Number(this.funcionarioId)).subscribe({
            next: (funcionario) => this.funcionario.set(funcionario),
            error: (error) => console.error(error)
        });
    }
}

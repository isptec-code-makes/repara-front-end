import { Component, Input } from '@angular/core';
import { ServicoEstado } from '../../../Core/types/servico';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'app-servico-estado',
    imports: [CommonModule, TagModule],
    templateUrl: './servico-estado.component.html',
    styleUrl: './servico-estado.component.scss'
})
export class ServicoEstadoComponent {
    estados = ServicoEstado;

    @Input({ required: true }) estado!: ServicoEstado | undefined;
}

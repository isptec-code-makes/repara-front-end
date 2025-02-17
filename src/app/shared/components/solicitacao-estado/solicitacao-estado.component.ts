import { Component, Input } from '@angular/core';
import { SolicitacaoEstado } from '../../../Core/types/solicitacao';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'app-solicitacao-estado',
    imports: [CommonModule, TagModule],
    templateUrl: './solicitacao-estado.component.html',
    styleUrl: './solicitacao-estado.component.scss'
})
export class SolicitacaoEstadoComponent {
    estados = SolicitacaoEstado;
    @Input({ required: true }) estado!: SolicitacaoEstado | undefined;
}

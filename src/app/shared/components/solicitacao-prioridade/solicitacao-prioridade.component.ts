import { Component, Input } from '@angular/core';
import { SolicitacaoPrioridade } from '../../../Core/types/solicitacao';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'app-solicitacao-prioridade',
    imports: [CommonModule, TagModule],
    templateUrl: './solicitacao-prioridade.component.html',
    styleUrl: './solicitacao-prioridade.component.scss'
})
export class SolicitacaoPrioridadeComponent {
    prioridades = SolicitacaoPrioridade;
    @Input({ required: true }) prioridade!: SolicitacaoPrioridade | undefined;
}

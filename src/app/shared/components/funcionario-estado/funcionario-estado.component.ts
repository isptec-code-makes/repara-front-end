import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'app-funcionario-estado',
    imports: [CommonModule, TagModule],
    templateUrl: './funcionario-estado.component.html',
    styleUrl: './funcionario-estado.component.scss'
})
export class FuncionarioEstadoComponent {
    @Input({ required: true }) estado!: boolean | undefined;
}

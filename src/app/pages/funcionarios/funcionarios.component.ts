import { Component } from '@angular/core';
import { FuncionariosDataComponent } from '../../shared/components/funcionarios-data/funcionarios-data.component';

@Component({
    selector: 'app-funcionarios',
    imports: [FuncionariosDataComponent],
    templateUrl: './funcionarios.component.html',
    styleUrl: './funcionarios.component.scss'
})
export class FuncionariosComponent {}

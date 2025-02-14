import { Component } from '@angular/core';
import { ClientesDataComponent } from '../../shared/components/clientes-data/clientes-data.component';

@Component({
    selector: 'app-clientes',
    imports: [ClientesDataComponent],
    templateUrl: './clientes.component.html',
    styleUrl: './clientes.component.scss'
})
export class ClientesComponent {}

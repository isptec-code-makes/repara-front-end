import { Component } from '@angular/core';
import { PecaPedidosDataComponent } from '../../shared/components/peca-pedidos-data/peca-pedidos-data.component';

@Component({
    selector: 'app-compras',
    imports: [PecaPedidosDataComponent],
    templateUrl: './compras.component.html',
    styleUrl: './compras.component.scss'
})
export class ComprasComponent {}

import { Component } from '@angular/core';
import { SolicitacaosDataComponent } from '../../shared/components/solicitacoes-data/solicitacaos-data.component';

@Component({
    selector: 'app-solicitacaos',
    imports: [SolicitacaosDataComponent],
    templateUrl: './solicitacaos.component.html',
    styleUrl: './solicitacaos.component.scss'
})
export class SolicitacaosComponent {}

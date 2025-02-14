import { Component } from '@angular/core';
import { PecasDataComponent } from '../../shared/components/pecas-data/pecas-data.component';

@Component({
    selector: 'app-pecas',
    imports: [PecasDataComponent],
    templateUrl: './pecas.component.html',
    styleUrl: './pecas.component.scss'
})
export class PecasComponent {}

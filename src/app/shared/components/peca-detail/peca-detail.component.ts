import { Component, Input, signal, WritableSignal } from '@angular/core';
import { PecaService } from '../../../Core/services/peca.service';
import { Peca } from '../../../Core/types/peca';

@Component({
    selector: 'app-peca-detail',
    imports: [],
    templateUrl: './peca-detail.component.html',
    styleUrl: './peca-detail.component.scss'
})
export class PecaDetailComponent {
    @Input({ required: true }) pecaId!: number | undefined;

    peca: WritableSignal<Peca> = signal({});

    constructor(private pecaService: PecaService) {}

    ngOnInit(): void {
        this.pecaService.getById(Number(this.pecaId)).subscribe({
            next: (peca) => this.peca.set(peca),
            error: (error) => console.error(error)
        });
    }
}

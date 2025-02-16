import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { MontagemsDataComponent } from '../../shared/components/montagems-data/montagems-data.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipamentoService } from '../../Core/services/equipamento.service';
import { Equipamento } from '../../Core/types/equipamento';

@Component({
    selector: 'app-equipamento',
    imports: [MontagemsDataComponent],
    templateUrl: './equipamento.component.html',
    styleUrl: './equipamento.component.scss'
})
export class EquipamentoComponent implements OnInit {
    equipamento: WritableSignal<Equipamento> = signal({});
    equipamentoId = signal(0);

    constructor(
        private activatedRoute: ActivatedRoute,
        private equipamentoService: EquipamentoService,
        private router: Router
    ) {}

    ngOnInit(): void {
        const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

        if (Number.isInteger(id)) {
            this.loadEquipamentocao(Number(id));
            this.equipamentoId.set(id);
        } else {
            this.router.navigate(['/notfound']);
        }
    }

    private loadEquipamentocao(id: number): void {
        this.equipamentoService.getById(id).subscribe({
            next: (equipamento) => this.equipamento.set(equipamento),
            error: (error) => console.error(error)
        });
    }
}

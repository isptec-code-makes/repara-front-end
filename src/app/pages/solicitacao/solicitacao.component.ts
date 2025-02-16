import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Solicitacao } from '../../Core/types/solicitacao';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitacaoService } from '../../Core/services/solicitacao.service';
import { JsonPipe } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { Timeline } from 'primeng/timeline';

interface EventItem {
    status?: string;
    date?: string;
    icon?: string;
    color?: string;
    image?: string;
}

@Component({
    selector: 'app-solicitacao',
    imports: [JsonPipe, TabsModule, Timeline],
    templateUrl: './solicitacao.component.html',
    styleUrl: './solicitacao.component.scss'
})
export class SolicitacaoComponent implements OnInit {
    solicitacao: WritableSignal<Solicitacao> = signal({});

    events: EventItem[];

    constructor(
        private activatedRoute: ActivatedRoute,
        private solicitacaoService: SolicitacaoService,
        private router: Router
    ) {
        this.events = [
            { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
            { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
            { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
            { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
        ];
    }

    ngOnInit(): void {
        const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

        if (Number.isInteger(id)) {
            this.loadSolicitacao(Number(id));
        } else {
            this.router.navigate(['/notfound']);
        }
    }

    private loadSolicitacao(id: number): void {
        this.solicitacaoService.getById(id).subscribe({
            next: (solicitacao) => this.solicitacao.set(solicitacao),
            error: (error) => console.error(error)
        });
    }
}

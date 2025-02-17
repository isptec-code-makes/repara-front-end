import { Component, Input, signal, WritableSignal } from '@angular/core';
import { Cliente } from '../../../Core/types/cliente';
import { ClienteService } from '../../../Core/services/cliente.service';
import { ChipModule } from 'primeng/chip';

@Component({
    selector: 'app-cliente-detail',
    imports: [ChipModule],
    templateUrl: './cliente-detail.component.html',
    styleUrl: './cliente-detail.component.scss'
})
export class ClienteDetailComponent {
    @Input({ required: true }) clienteId!: number | undefined;

    cliente: WritableSignal<Cliente> = signal({});

    constructor(private clienteService: ClienteService) {}

    ngOnInit(): void {
        this.clienteService.getById(Number(this.clienteId)).subscribe({
            next: (cliente) => this.cliente.set(cliente),
            error: (error) => console.error(error)
        });
    }
}

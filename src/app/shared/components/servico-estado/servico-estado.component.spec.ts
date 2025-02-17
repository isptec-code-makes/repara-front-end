import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicoEstadoComponent } from './servico-estado.component';

describe('ServicoEstadoComponent', () => {
  let component: ServicoEstadoComponent;
  let fixture: ComponentFixture<ServicoEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicoEstadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicoEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

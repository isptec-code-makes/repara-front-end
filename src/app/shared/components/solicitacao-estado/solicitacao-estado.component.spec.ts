import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacaoEstadoComponent } from './solicitacao-estado.component';

describe('SolicitacaoEstadoComponent', () => {
  let component: SolicitacaoEstadoComponent;
  let fixture: ComponentFixture<SolicitacaoEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitacaoEstadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitacaoEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

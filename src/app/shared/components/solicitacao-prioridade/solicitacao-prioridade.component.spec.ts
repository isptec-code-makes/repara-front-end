import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacaoPrioridadeComponent } from './solicitacao-prioridade.component';

describe('SolicitacaoPrioridadeComponent', () => {
  let component: SolicitacaoPrioridadeComponent;
  let fixture: ComponentFixture<SolicitacaoPrioridadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitacaoPrioridadeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitacaoPrioridadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

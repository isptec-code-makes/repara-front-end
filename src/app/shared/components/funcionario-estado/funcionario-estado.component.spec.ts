import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioEstadoComponent } from './funcionario-estado.component';

describe('FuncionarioEstadoComponent', () => {
  let component: FuncionarioEstadoComponent;
  let fixture: ComponentFixture<FuncionarioEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionarioEstadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionarioEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionariosDataComponent } from './funcionarios-data.component';

describe('FuncionariosDataComponent', () => {
  let component: FuncionariosDataComponent;
  let fixture: ComponentFixture<FuncionariosDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionariosDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionariosDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

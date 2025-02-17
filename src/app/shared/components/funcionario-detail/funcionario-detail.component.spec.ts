import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioDetailComponent } from './funcionario-detail.component';

describe('FuncionarioDetailComponent', () => {
  let component: FuncionarioDetailComponent;
  let fixture: ComponentFixture<FuncionarioDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionarioDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionarioDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

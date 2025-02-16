import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacaosComponent } from './solicitacaos.component';

describe('SolicitacaosComponent', () => {
  let component: SolicitacaosComponent;
  let fixture: ComponentFixture<SolicitacaosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitacaosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitacaosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

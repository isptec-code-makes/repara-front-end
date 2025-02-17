import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PecaDetailComponent } from './peca-detail.component';

describe('PecaDetailComponent', () => {
  let component: PecaDetailComponent;
  let fixture: ComponentFixture<PecaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PecaDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PecaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

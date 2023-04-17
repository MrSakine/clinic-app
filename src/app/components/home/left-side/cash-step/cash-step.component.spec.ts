import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashStepComponent } from './cash-step.component';

describe('CashStepComponent', () => {
  let component: CashStepComponent;
  let fixture: ComponentFixture<CashStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceStepComponent } from './insurance-step.component';

describe('InsuranceStepComponent', () => {
  let component: InsuranceStepComponent;
  let fixture: ComponentFixture<InsuranceStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuranceStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

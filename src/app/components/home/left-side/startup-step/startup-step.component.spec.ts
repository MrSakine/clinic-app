import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupStepComponent } from './startup-step.component';

describe('StartupStepComponent', () => {
  let component: StartupStepComponent;
  let fixture: ComponentFixture<StartupStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartupStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartupStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

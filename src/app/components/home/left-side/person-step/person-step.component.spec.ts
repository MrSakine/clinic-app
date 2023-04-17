import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonStepComponent } from './person-step.component';

describe('PersonStepComponent', () => {
  let component: PersonStepComponent;
  let fixture: ComponentFixture<PersonStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

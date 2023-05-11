import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseServiceDialogComponent } from './choose-service-dialog.component';

describe('ChooseServiceDialogComponent', () => {
  let component: ChooseServiceDialogComponent;
  let fixture: ComponentFixture<ChooseServiceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseServiceDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseServiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

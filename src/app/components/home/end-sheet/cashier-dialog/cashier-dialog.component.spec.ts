import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierDialogComponent } from './cashier-dialog.component';

describe('CashierDialogComponent', () => {
  let component: CashierDialogComponent;
  let fixture: ComponentFixture<CashierDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashierDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashierDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteItemBottomSheetComponent } from './delete-item-bottom-sheet.component';

describe('DeleteItemBottomSheetComponent', () => {
  let component: DeleteItemBottomSheetComponent;
  let fixture: ComponentFixture<DeleteItemBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteItemBottomSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteItemBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

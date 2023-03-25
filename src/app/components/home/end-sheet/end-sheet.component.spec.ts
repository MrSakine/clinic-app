import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndSheetComponent } from './end-sheet.component';

describe('EndSheetComponent', () => {
  let component: EndSheetComponent;
  let fixture: ComponentFixture<EndSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

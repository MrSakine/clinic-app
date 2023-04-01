import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoElementComponent } from './no-element.component';

describe('NoElementComponent', () => {
  let component: NoElementComponent;
  let fixture: ComponentFixture<NoElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

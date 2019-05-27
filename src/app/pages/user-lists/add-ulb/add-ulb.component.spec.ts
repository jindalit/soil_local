import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUlbComponent } from './add-ulb.component';

describe('AddUlbComponent', () => {
  let component: AddUlbComponent;
  let fixture: ComponentFixture<AddUlbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUlbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUlbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

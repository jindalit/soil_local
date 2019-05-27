import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFpoComponent } from './add-fpo.component';

describe('AddFpoComponent', () => {
  let component: AddFpoComponent;
  let fixture: ComponentFixture<AddFpoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFpoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

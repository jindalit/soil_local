import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearULBComponent } from './near-ulb.component';

describe('NearULBComponent', () => {
  let component: NearULBComponent;
  let fixture: ComponentFixture<NearULBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearULBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearULBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OntransitComponent } from './ontransit.component';

describe('OntransitComponent', () => {
  let component: OntransitComponent;
  let fixture: ComponentFixture<OntransitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OntransitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OntransitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

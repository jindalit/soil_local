import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearFpoComponent } from './near-fpo.component';

describe('NearFpoComponent', () => {
  let component: NearFpoComponent;
  let fixture: ComponentFixture<NearFpoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearFpoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearFpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

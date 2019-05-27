import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearFarmerComponent } from './near-farmer.component';

describe('NearFarmerComponent', () => {
  let component: NearFarmerComponent;
  let fixture: ComponentFixture<NearFarmerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearFarmerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearFarmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

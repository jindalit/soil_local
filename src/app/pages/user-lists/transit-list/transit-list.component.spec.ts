import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitListComponent } from './transit-list.component';

describe('TransitListComponent', () => {
  let component: TransitListComponent;
  let fixture: ComponentFixture<TransitListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransitListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

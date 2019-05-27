import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UlbListComponent } from './ulb-list.component';

describe('UlbListComponent', () => {
  let component: UlbListComponent;
  let fixture: ComponentFixture<UlbListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UlbListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UlbListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

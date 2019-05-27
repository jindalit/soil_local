import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FpoListComponent } from './fpo-list.component';

describe('FpoListComponent', () => {
  let component: FpoListComponent;
  let fixture: ComponentFixture<FpoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FpoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FpoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

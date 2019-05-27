import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearTestlabComponent } from './near-testlab.component';

describe('NearTestlabComponent', () => {
  let component: NearTestlabComponent;
  let fixture: ComponentFixture<NearTestlabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearTestlabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearTestlabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

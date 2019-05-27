import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputtaxComponent } from './outputtax.component';

describe('OutputtaxComponent', () => {
  let component: OutputtaxComponent;
  let fixture: ComponentFixture<OutputtaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputtaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputtaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

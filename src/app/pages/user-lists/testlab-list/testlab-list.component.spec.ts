import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestlabListComponent } from './testlab-list.component';

describe('TestlabListComponent', () => {
  let component: TestlabListComponent;
  let fixture: ComponentFixture<TestlabListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestlabListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestlabListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

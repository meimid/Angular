import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListoperationComponent } from './listoperation.component';

describe('ListoperationComponent', () => {
  let component: ListoperationComponent;
  let fixture: ComponentFixture<ListoperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListoperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListoperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

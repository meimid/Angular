import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCreateCompComponent } from './account-create-comp.component';

describe('AccountCreateCompComponent', () => {
  let component: AccountCreateCompComponent;
  let fixture: ComponentFixture<AccountCreateCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountCreateCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCreateCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

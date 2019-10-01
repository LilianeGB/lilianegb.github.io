import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CantoresComponent } from './cantores.component';

describe('CantoresComponent', () => {
  let component: CantoresComponent;
  let fixture: ComponentFixture<CantoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CantoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CantoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

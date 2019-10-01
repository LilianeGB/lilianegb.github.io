import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CantorSearchComponent } from './cantor-search.component';

describe('CantorSearchComponent', () => {
  let component: CantorSearchComponent;
  let fixture: ComponentFixture<CantorSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CantorSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CantorSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

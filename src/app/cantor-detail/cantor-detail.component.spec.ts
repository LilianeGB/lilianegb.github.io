import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CantorDetailComponent } from './cantor-detail.component';

describe('CantorDetailComponent', () => {
  let component: CantorDetailComponent;
  let fixture: ComponentFixture<CantorDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CantorDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CantorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

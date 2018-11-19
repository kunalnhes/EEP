import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzlegameComponent } from './puzzlegame.component';

describe('PuzzlegameComponent', () => {
  let component: PuzzlegameComponent;
  let fixture: ComponentFixture<PuzzlegameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuzzlegameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzlegameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleQueryGameComponent } from './simple-query-game.component';

describe('SimpleQueryGameComponent', () => {
  let component: SimpleQueryGameComponent;
  let fixture: ComponentFixture<SimpleQueryGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleQueryGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleQueryGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

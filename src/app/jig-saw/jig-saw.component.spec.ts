import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JigSawComponent } from './jig-saw.component';

describe('JigSawComponent', () => {
  let component: JigSawComponent;
  let fixture: ComponentFixture<JigSawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JigSawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JigSawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

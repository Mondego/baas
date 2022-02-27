import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JbfComponent } from './jbf.component';

describe('JbfComponent', () => {
  let component: JbfComponent;
  let fixture: ComponentFixture<JbfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JbfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JbfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

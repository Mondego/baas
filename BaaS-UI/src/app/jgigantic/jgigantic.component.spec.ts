import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JgiganticComponent } from './jgigantic.component';

describe('JgiganticComponent', () => {
  let component: JgiganticComponent;
  let fixture: ComponentFixture<JgiganticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JgiganticComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JgiganticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

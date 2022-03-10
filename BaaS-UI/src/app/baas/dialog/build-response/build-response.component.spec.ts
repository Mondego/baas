import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildResponseComponent } from './build-response.component';

describe('BuildResponseComponent', () => {
  let component: BuildResponseComponent;
  let fixture: ComponentFixture<BuildResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

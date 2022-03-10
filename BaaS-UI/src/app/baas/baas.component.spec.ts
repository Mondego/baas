import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaasComponent } from './baas.component';

describe('RepoFormComponent', () => {
  let component: BaasComponent;
  let fixture: ComponentFixture<BaasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

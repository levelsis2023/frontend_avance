import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasHijasComponent } from './areas-hijas.component';

describe('AreasHijasComponent', () => {
  let component: AreasHijasComponent;
  let fixture: ComponentFixture<AreasHijasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreasHijasComponent]
    });
    fixture = TestBed.createComponent(AreasHijasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

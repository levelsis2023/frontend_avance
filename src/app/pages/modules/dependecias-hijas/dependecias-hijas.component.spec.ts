import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependeciasHijasComponent } from './dependecias-hijas.component';

describe('DependeciasHijasComponent', () => {
  let component: DependeciasHijasComponent;
  let fixture: ComponentFixture<DependeciasHijasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DependeciasHijasComponent]
    });
    fixture = TestBed.createComponent(DependeciasHijasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

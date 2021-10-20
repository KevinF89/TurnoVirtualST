import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    component = new HomeComponent();
  }));

;

  it('Funcion sumar debería dar 10', () => {
    expect(component.sumar(5,5)).toEqual(10);
  });
});

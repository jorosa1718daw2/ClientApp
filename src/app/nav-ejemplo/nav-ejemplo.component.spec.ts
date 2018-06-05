
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavEjemploComponent } from './nav-ejemplo.component';

describe('NavEjemploComponent', () => {
  let component: NavEjemploComponent;
  let fixture: ComponentFixture<NavEjemploComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NavEjemploComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavEjemploComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalComponentComponent } from './historical-component.component';

describe('HistoricalComponentComponent', () => {
  let component: HistoricalComponentComponent;
  let fixture: ComponentFixture<HistoricalComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricalComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateCounterComponent } from './state-counter.component';

describe('StateCounterComponent', () => {
  let component: StateCounterComponent;
  let fixture: ComponentFixture<StateCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StateCounterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StateCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

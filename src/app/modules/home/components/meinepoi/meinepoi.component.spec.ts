import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeinepoiComponent } from './meinepoi.component';

describe('MeinepoiComponent', () => {
  let component: MeinepoiComponent;
  let fixture: ComponentFixture<MeinepoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeinepoiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeinepoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

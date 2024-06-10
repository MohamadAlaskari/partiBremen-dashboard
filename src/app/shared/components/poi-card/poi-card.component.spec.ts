import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiCardComponent } from './poi-card.component';

describe('PoiCardComponent', () => {
  let component: PoiCardComponent;
  let fixture: ComponentFixture<PoiCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoiCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PoiCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

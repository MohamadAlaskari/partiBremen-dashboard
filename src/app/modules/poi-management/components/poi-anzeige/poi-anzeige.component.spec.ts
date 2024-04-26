import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiAnzeigeComponent } from './poi-anzeige.component';

describe('PoiAnzeigeComponent', () => {
  let component: PoiAnzeigeComponent;
  let fixture: ComponentFixture<PoiAnzeigeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoiAnzeigeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PoiAnzeigeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

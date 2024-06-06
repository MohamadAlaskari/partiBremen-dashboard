import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiModalComponent } from './poi-modal.component';

describe('PoiModalComponent', () => {
  let component: PoiModalComponent;
  let fixture: ComponentFixture<PoiModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoiModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PoiModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

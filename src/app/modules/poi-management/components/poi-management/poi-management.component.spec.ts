import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiManagementComponent } from './poi-management.component';

describe('PoiManagementComponent', () => {
  let component: PoiManagementComponent;
  let fixture: ComponentFixture<PoiManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoiManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoiManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

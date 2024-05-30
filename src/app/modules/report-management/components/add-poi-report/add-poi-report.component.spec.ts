import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPoiReportComponent } from './add-poi-report.component';

describe('AddPoiReportComponent', () => {
  let component: AddPoiReportComponent;
  let fixture: ComponentFixture<AddPoiReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPoiReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPoiReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

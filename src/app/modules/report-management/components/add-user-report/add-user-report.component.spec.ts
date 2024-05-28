import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserReportComponent } from './add-user-report.component';

describe('AddUserReportComponent', () => {
  let component: AddUserReportComponent;
  let fixture: ComponentFixture<AddUserReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUserReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUserReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

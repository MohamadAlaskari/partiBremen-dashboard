import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommentReportComponent } from './add-comment-report.component';

describe('AddCommentReportComponent', () => {
  let component: AddCommentReportComponent;
  let fixture: ComponentFixture<AddCommentReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCommentReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCommentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

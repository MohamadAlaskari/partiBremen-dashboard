import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentDetailsModalComponent } from './comment-details-modal.component';

describe('CommentDetailsModalComponent', () => {
  let component: CommentDetailsModalComponent;
  let fixture: ComponentFixture<CommentDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentDetailsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommentDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

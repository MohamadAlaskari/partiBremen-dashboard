import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentManagementComponent } from './comment-management.component';

describe('CommentManagementComponent', () => {
  let component: CommentManagementComponent;
  let fixture: ComponentFixture<CommentManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

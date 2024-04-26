import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdditionComponent } from './user-addition.component';

describe('UserAdditionComponent', () => {
  let component: UserAdditionComponent;
  let fixture: ComponentFixture<UserAdditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserAdditionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAdditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

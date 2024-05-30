import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyAnzeigeComponent } from './survey-anzeige.component';

describe('SurveyAnzeigeComponent', () => {
  let component: SurveyAnzeigeComponent;
  let fixture: ComponentFixture<SurveyAnzeigeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SurveyAnzeigeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyAnzeigeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

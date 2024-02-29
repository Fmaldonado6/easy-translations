import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxEasyTranslationsComponent } from './easy-translations.component';

describe('NgxEasyTranslationsComponent', () => {
  let component: NgxEasyTranslationsComponent;
  let fixture: ComponentFixture<NgxEasyTranslationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxEasyTranslationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgxEasyTranslationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

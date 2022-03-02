import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidWordsComponent } from './valid-words.component';

describe('ValidWordsComponent', () => {
  let component: ValidWordsComponent;
  let fixture: ComponentFixture<ValidWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidWordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorFatalComponent } from './error-fatal.component';

describe('ErrorFatalComponent', () => {
  let component: ErrorFatalComponent;
  let fixture: ComponentFixture<ErrorFatalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorFatalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorFatalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

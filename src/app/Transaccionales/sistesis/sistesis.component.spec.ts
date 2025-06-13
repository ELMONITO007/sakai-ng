import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SistesisComponent } from './sistesis.component';

describe('SistesisComponent', () => {
  let component: SistesisComponent;
  let fixture: ComponentFixture<SistesisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SistesisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SistesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

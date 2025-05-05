import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratistaCrearComponent } from './laboratista-crear.component';

describe('LaboratistaCrearComponent', () => {
  let component: LaboratistaCrearComponent;
  let fixture: ComponentFixture<LaboratistaCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaboratistaCrearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaboratistaCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

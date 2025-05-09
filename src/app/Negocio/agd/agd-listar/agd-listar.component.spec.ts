import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgdListarComponent } from './agd-listar.component';

describe('AgdListarComponent', () => {
  let component: AgdListarComponent;
  let fixture: ComponentFixture<AgdListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgdListarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgdListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

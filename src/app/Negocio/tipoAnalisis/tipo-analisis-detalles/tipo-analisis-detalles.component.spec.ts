import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoAnalisisDetallesComponent } from './tipo-analisis-detalles.component';

describe('TipoAnalisisDetallesComponent', () => {
  let component: TipoAnalisisDetallesComponent;
  let fixture: ComponentFixture<TipoAnalisisDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoAnalisisDetallesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoAnalisisDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

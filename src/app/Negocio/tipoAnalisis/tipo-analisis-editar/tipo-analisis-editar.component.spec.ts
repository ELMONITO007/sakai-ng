import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoAnalisisEditarComponent } from './tipo-analisis-editar.component';

describe('TipoAnalisisEditarComponent', () => {
  let component: TipoAnalisisEditarComponent;
  let fixture: ComponentFixture<TipoAnalisisEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoAnalisisEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoAnalisisEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

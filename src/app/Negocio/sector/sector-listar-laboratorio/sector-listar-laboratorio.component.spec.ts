import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorListarLaboratorioComponent } from './sector-listar-laboratorio.component';

describe('SectorListarLaboratorioComponent', () => {
  let component: SectorListarLaboratorioComponent;
  let fixture: ComponentFixture<SectorListarLaboratorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectorListarLaboratorioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectorListarLaboratorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

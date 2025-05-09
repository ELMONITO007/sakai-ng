import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenEnsayoEditarComponent } from './orden-ensayo-editar.component';

describe('OrdenEnsayoEditarComponent', () => {
  let component: OrdenEnsayoEditarComponent;
  let fixture: ComponentFixture<OrdenEnsayoEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenEnsayoEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenEnsayoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

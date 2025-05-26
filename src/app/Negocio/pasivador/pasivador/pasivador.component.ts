import { Component, Input, OnInit } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';

import { CommonModule } from '@angular/common';

import { DividerModule } from 'primeng/divider';
import { PasivadorEditarComponent } from '../pasivador-editar/pasivador-editar.component';
import { PasivadorDetalleComponent } from '../pasivador-detalle/pasivador-detalle.component';
import { PasivadorServiceService } from '../../../Servicios/Pasivador-service.service';

@Component({
  selector: 'app-pasivador',
    imports: [ButtonModule, InputIconModule, PasivadorEditarComponent, CommonModule, PasivadorDetalleComponent,DividerModule],
  templateUrl: './pasivador.component.html',
  styleUrl: './pasivador.component.scss'
})
export class PasivadorComponent implements OnInit {
    editar: boolean = false;
    vacio: boolean = false;
    detalle: boolean = true;
    @Input() id: number;
  @Input() puedeEditar:boolean = false;
    constructor(private service: PasivadorServiceService) {}

    ngOnInit(): void {
        this.service.obtenerTodos(this.id).subscribe((data) => {
        
            if (data.fechaEnsayo == null && data.contenidodePasivador == null && this.puedeEditar) {
                this.vacio = true;
                this.detalle = false;
                this.editar = false;

            }
             if( data.fechaEnsayo != null && data.contenidodePasivador != null  && this.puedeEditar ){
                this.editar = false;
                this.vacio = false;
                this.detalle = true;
                 
            }
            if(!this.puedeEditar){
                this.editar = false;
                this.vacio = false;
                this.detalle = true;
            }
        });
    }

    verDetalles(){
        this.editar = false;
        this.vacio = false;
        this.detalle = true;
    }
    editarAgd() {
        this.editar = true;
        this.vacio = false;
        this.detalle = false;
    }

}

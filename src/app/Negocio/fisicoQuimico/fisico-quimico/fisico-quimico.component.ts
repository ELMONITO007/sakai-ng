import { Component, Input, OnInit } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';

import { CommonModule } from '@angular/common';

import { DividerModule } from 'primeng/divider';
import { FisicoDetalleComponent } from '../fisico-detalle/fisico-detalle.component';
import { FisicoEditarComponent } from '../fisico-editar/fisico-editar.component';
import { FisicoQuimicoServiceService } from '../../../Servicios/FisicoQuimico-service.service';

@Component({
    selector: 'app-fisico-quimico',
    imports: [ButtonModule, InputIconModule, FisicoEditarComponent, CommonModule, FisicoDetalleComponent, DividerModule],

    templateUrl: './fisico-quimico.component.html',
    providers: [FisicoQuimicoServiceService],
    standalone: true,
    styleUrl: './fisico-quimico.component.scss'
})
export class FisicoQuimicoComponent implements OnInit {
    editar: boolean = false;
    vacio: boolean = false;
    detalle: boolean = true;
    @Input() id: number;
   @Input() puedeEditar:boolean = false;
 @Input() temperatura: string;
    constructor(private service: FisicoQuimicoServiceService) {}

 ngOnInit(): void {

        this.service.obtenerTodos(this.id).subscribe((data) => {
            if (data.fechaEnsayo == null && data.contenidoBifenilos == null && data.aguaRelativa == null && data.tensionInterfasial == null && this.puedeEditar) {
                this.vacio = true;
                this.detalle = false;
                this.editar = false;
            }
             if( data.fechaEnsayo != null && data.contenidoBifenilos != null && data.aguaRelativa != null && data.tensionInterfasial != null && this.puedeEditar ){
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
    edit() {
        this.editar = true;
        this.vacio = false;
        this.detalle = false;
    }

}

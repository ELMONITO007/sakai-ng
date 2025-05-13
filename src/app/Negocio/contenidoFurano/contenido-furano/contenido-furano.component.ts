import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputIconModule } from 'primeng/inputicon';

import { ContenidoFuranoServiceService } from '../../../Servicios/ContenidoFurano-service.service';
import { ContenidoEditarComponent } from "../contenido-editar/contenido-editar.component";
import { ContenidoDetalleComponent } from "../contenido-detalle/contenido-detalle.component";

@Component({
  selector: 'app-contenido-furano',
  imports: [ButtonModule, InputIconModule, CommonModule, DividerModule, ContenidoEditarComponent, ContenidoDetalleComponent],
  templateUrl: './contenido-furano.component.html',
  styleUrl: './contenido-furano.component.scss',
  providers: [ContenidoFuranoServiceService],
})
export class ContenidoFuranoComponent  implements OnInit {
    editar: boolean = false;
    vacio: boolean = false;
    detalle: boolean = true;
    @Input() id: number;
    constructor(private service: ContenidoFuranoServiceService) {}
    ngOnInit(): void {
        this.service.obtenerTodos(this.id).subscribe((data) => {
            if (data.hmf == null && data.acf == null ) {
                this.vacio = true;
                this.detalle = false;
                this.editar = false;
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

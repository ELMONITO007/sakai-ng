import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputIconModule } from 'primeng/inputicon';
import { CorrosividadServiceService } from '../../../Servicios/Corrosividad-service.service';
import { CorrosividadDetalleComponent } from '../corrosividad-detalle/corrosividad-detalle.component';
import { CorrosividadEditarComponent } from '../corrosividad-editar/corrosividad-editar.component';

@Component({
    selector: 'app-corrosividad',
    imports: [ButtonModule, InputIconModule, DividerModule, CorrosividadDetalleComponent, CorrosividadEditarComponent, CommonModule],
    templateUrl: './corrosividad.component.html',
    styleUrl: './corrosividad.component.scss',
    providers: [CorrosividadComponent],
    standalone: true
})
export class CorrosividadComponent implements OnInit {
    editar: boolean = false;
    vacio: boolean = false;
    detalle: boolean = true;
     @Input() puedeEditar:boolean = false;
    @Input() id: number;
    constructor(private service: CorrosividadServiceService) {}
    ngOnInit(): void {
        this.service.obtenerTodos(this.id).subscribe((data) => {
            if (data.fechaSubida == null && this.puedeEditar) {
                this.vacio = true;
                this.detalle = false;
                this.editar = false;
            }
             if( data.fechaSubida != null  && this.puedeEditar ){
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

    verDetalles() {
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

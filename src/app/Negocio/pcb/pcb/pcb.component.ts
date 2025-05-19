import { Component, Input, OnInit } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';

import { CommonModule } from '@angular/common';

import { DividerModule } from 'primeng/divider';


import { PcbEditarComponent } from '../pcb-editar/pcb-editar.component';
import { PcbDetalleComponent } from '../pcb-detalle/pcb-detalle.component';
import { PCBServiceService } from '../../../Servicios/PCB-service.service';


@Component({
  selector: 'app-pcb',
  imports: [ButtonModule, InputIconModule, PcbEditarComponent, CommonModule, PcbDetalleComponent,DividerModule],
  templateUrl: './pcb.component.html',
  styleUrl: './pcb.component.scss'
})
export class PcbComponent implements OnInit {
    editar: boolean = false;
    vacio: boolean = false;
    detalle: boolean = true;
    @Input() id: number;
      @Input() estado: string;

    constructor(private service: PCBServiceService) {}

    ngOnInit(): void {
        this.service.obtenerTodos(this.id).subscribe((data) => {
        
            if (data.fechaEnsayo == null && data.contenidodePCB == 0 && this.estado=="En Proceso") {
                this.vacio = true;
                this.detalle = false;
                this.editar = false;

            }
            if(this.estado!="En Proceso"){
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

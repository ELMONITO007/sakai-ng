import { Component, Input, OnInit } from '@angular/core';
import { AgdEditarComponent } from '../agd-editar/agd-editar.component';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { AgdServiceService } from '../../../Servicios/Agd-service.service';
import { CommonModule } from '@angular/common';
import { AgdDetalleComponent } from "../agd-detalle/agd-detalle.component";
import { DividerModule } from 'primeng/divider';

@Component({
    selector: 'app-agd',
    imports: [ButtonModule, InputIconModule, AgdEditarComponent, AgdEditarComponent, CommonModule, AgdDetalleComponent,DividerModule],
    templateUrl: './agd.component.html',
    styleUrl: './agd.component.scss',
    providers: [AgdServiceService],
    standalone: true
})
export class AgdComponent implements OnInit {
    editar: boolean = false;
    vacio: boolean = false;
    detalle: boolean = true;
    @Input() id: number;
    @Input() estado: string;

    constructor(private service: AgdServiceService) {}

    ngOnInit(): void {
        this.service.obtenerTodos(this.id).subscribe((data) => {
    
            if (data.hidrogeno == null && data.oxigeno == null && data.nitrogeno == null && data.dioxidodeCarbono == null && this.estado=="En Proceso") {
                this.vacio = true;
                
                this.detalle = false;
                this.editar = false;
                 

            }
            if(this.estado!="En Proceso"){
                this.editar = false;
                this.vacio = false;
                this.detalle = true;
                 console.log(this.estado);
            }
        });
    }

    verDetalles(){
        this.editar = false;
        this.vacio = false;
        this.detalle = true;
    }
    editarAgd() {
        if (this.estado == "En Proceso") {
        this.editar = true;
        this.vacio = false;
        this.detalle = false;}
        else {
            this.editar = false;
            this.vacio = false;
            this.detalle = false;
        }
    }
}

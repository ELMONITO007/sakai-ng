import { Component, Input, input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MenuItem, MessageService } from 'primeng/api';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TabsModule } from 'primeng/tabs';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { HttpClientModule } from '@angular/common/http';
import { BreadcrumbRouterComponent } from '../../breadcrumbRouter/breadcrumb-router/breadcrumb-router.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { agdDTO } from '../../../Entidades/agd';


import { AgdServiceService } from '../../../Servicios/Agd-service.service';
import { CommonModule } from '@angular/common';
import { AgdEditarComponent } from "../agd-editar/agd-editar.component";

@Component({
    selector: 'app-agd-detalle',
    imports: [ButtonModule, InputTextModule, ToastModule, MessageModule, CommonModule, TabsModule, CardModule, HttpClientModule, DialogModule, AgdEditarComponent],
    providers: [MessageService, DialogService, AgdServiceService],
    standalone: true,
    templateUrl: './agd-detalle.component.html',
    styleUrl: './agd-detalle.component.scss'
})
export class AgdDetalleComponent implements OnInit {
    constructor(
        private messageService: MessageService,
     
        private service: AgdServiceService,
        public dialogService: DialogService
    ) {}
    modelo: agdDTO;
  
    ref: DynamicDialogRef | undefined;
    visibleDelete: boolean = false;

    @Input() id: number ;
    ngOnInit(): void {
   
            this.service.obtenerTodos(this.id).subscribe((data) => {
                this.modelo = data;
                if (this.modelo.hidrogeno == null && this.modelo.oxigeno == null && this.modelo.nitrogeno == null && this.modelo.dioxidodeCarbono == null) {
                 this.detalle=false;
               
                   
                }
            });
        
    }

    detalle:boolean=true;
    editar(id: number) {
      this.detalle=false;
    }
link(link: string) {
        window.open("https://drive.google.com/file/d/"+link, '_blank');
    }

    eliminar(id: number) {
        this.service.borrar(id).subscribe((data) => {
            this.messageService.add({ severity: 'success', summary: 'Agd Eliminado', detail: 'El agd se ha eliminado correctamente', life: 3000 });
        });
        this.ngOnInit();
        this.visibleDelete = false;
    }
    closeDelete() {
        this.visibleDelete = false;
    }
    idDelete: number = 0;
    openDelete(id: number) {
        this.idDelete = id;
        this.visibleDelete = true;
    }
}

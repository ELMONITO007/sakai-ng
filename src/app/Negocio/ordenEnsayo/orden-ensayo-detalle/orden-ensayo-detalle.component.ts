import { Component, input, OnInit } from '@angular/core';
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
import { ordenEnsayoDTO } from '../../../Entidades/ordenEnsayo';
import { OrdenEnsayoServiceService } from '../../../Servicios/OrdenEnsayo-service.service';
import { CommonModule } from '@angular/common';

import { AgdComponent } from '../../agd/agd/agd.component';
import { ContenidoFuranoComponent } from "../../contenidoFurano/contenido-furano/contenido-furano.component";
import { CorrosividadComponent } from '../../corrosividad/corrosividad/corrosividad.component';
import { FisicoQuimicoComponent } from '../../fisicoQuimico/fisico-quimico/fisico-quimico.component';
import { PasivadorComponent } from '../../pasivador/pasivador/pasivador.component';
import { PcbComponent } from '../../pcb/pcb/pcb.component';

export interface Analisis {
    nombre: string;
    modulo: string;
    orden: number;
}
@Component({
    selector: 'app-orden-ensayo-detalle',
    imports: [ButtonModule, InputTextModule, ToastModule, MessageModule, CommonModule, BreadcrumbRouterComponent,PasivadorComponent,PcbComponent,
         TabsModule, CardModule, HttpClientModule, DialogModule, AgdComponent, ContenidoFuranoComponent,CorrosividadComponent,FisicoQuimicoComponent],
    providers: [MessageService, DialogService, OrdenEnsayoServiceService],
    templateUrl: './orden-ensayo-detalle.component.html',
    styleUrl: './orden-ensayo-detalle.component.scss'
})
export class OrdenEnsayoDetalleComponent implements OnInit {
    constructor(
        private messageService: MessageService,
        private route: Router,
        private activatedRoute: ActivatedRoute,
        private service: OrdenEnsayoServiceService,
        public dialogService: DialogService
    ) {}
    modelo: ordenEnsayoDTO;
    items: MenuItem[] = [];
    ref: DynamicDialogRef | undefined;
    visibleDelete: boolean = false;
    loading: boolean = false;
    analisis: Analisis[] = [];

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params) => {
            const id = params['id'];

            this.service.obtenerUno(id).subscribe((data) => {
                this.modelo = data;
                this.items = [
                    { label: 'Home', icon: 'pi pi-home', route: '/index', primary: false },
                    { label: 'OrdenEnsayo', icon: 'pi pi-fw pi-user', route: '/ordenEnsayo', primary: false },
                    { label: 'Detalle OE N° ' + data.numeroOrden, icon: 'pi pi-fw pi-user', route: '/ordenEnsayo' + id, primary: true }
                ];
            });
            this.service.Ensayos(id).subscribe((ensayo) => {
                for (let i = 0; i < ensayo.length; i++) {
                    this.analisis.push({ nombre: ensayo[i], modulo: '<app-'+ensayo[i]+' [id]="modelo.id_OrdenEnsayo"></app-'+ensayo[i]+'>', orden: i });
                }

            });
        });
    }
    editar(id: number) {
        this.ref = this.dialogService.open(OrdenEnsayoDetalleComponent, {
            width: '70%',
            height: '50%',
            data: {
                id: id
            },
            maximizable: true
        });
        this.ref.onClose.subscribe((d) => {
            if (d !== null) {
                this.messageService.add({ severity: 'success', summary: 'Orden Ensayo Editado', detail: 'La orden de Ensayo se ha editado correctamente', life: 3000 });
                this.ngOnInit();
            }
        });
    }
    eliminar(id: number) {
        this.service.borrar(id).subscribe((data) => {
            this.messageService.add({ severity: 'success', summary: 'Orden de Ensayo Eliminado', detail: 'La orden de Ensayo se ha eliminado correctamente', life: 3000 });
        });
        this.ngOnInit();
        this.visibleDelete = false;
    }
    closeDelete() {
        this.visibleDelete = false;
    }
    idDelete: number;
    openDelete(id: number) {
        this.idDelete = id;
        this.visibleDelete = true;
    }
}

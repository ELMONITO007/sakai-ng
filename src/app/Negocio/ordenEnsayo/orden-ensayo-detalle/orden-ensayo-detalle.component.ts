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
import { ordenEnsayoDTO, ordenEnsayoCreacionDTO } from '../../../Entidades/ordenEnsayo';
import { OrdenEnsayoServiceService } from '../../../Servicios/OrdenEnsayo-service.service';
import { CommonModule } from '@angular/common';
import { AgdDetalleComponent } from "../../agd/agd-detalle/agd-detalle.component";

@Component({
    selector: 'app-orden-ensayo-detalle',
    imports: [ButtonModule, InputTextModule, ToastModule, MessageModule, CommonModule, BreadcrumbRouterComponent, TabsModule, CardModule, HttpClientModule, DialogModule, AgdDetalleComponent],
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
    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params) => {
            const id = params['id'];
            this.items = [
                { label: 'Home', icon: 'pi pi-home', route: '/index',primary: false },
                { label: 'OrdenEnsayo', icon: 'pi pi-fw pi-user', route: '/ordenEnsayo',primary: false },
                { label: 'Detalle', icon: 'pi pi-fw pi-user', route: '/ordenEnsayo' + id ,primary: true}
            ];
            this.service.obtenerUno(id).subscribe((data) => {
                this.modelo = data;
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

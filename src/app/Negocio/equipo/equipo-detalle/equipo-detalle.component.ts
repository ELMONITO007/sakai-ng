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
import { equipoDTO, equipoCreacionDTO } from '../../../Entidades/equipo';
import { EquipoCrearComponent } from '../equipo-crear/equipo-crear.component';
import { EquipoEditarComponent } from '../equipo-editar/equipo-editar.component';
import { EquipoServiceService } from '../../../Servicios/Equipo-service.service';

@Component({
    selector: 'app-equipo-detalle',
    imports: [ButtonModule, InputTextModule, ToastModule, MessageModule, TabsModule, CardModule, HttpClientModule, BreadcrumbRouterComponent, DialogModule],
    providers: [MessageService, DialogService, EquipoServiceService],
    standalone: true,
    templateUrl: './equipo-detalle.component.html',
    styleUrl: './equipo-detalle.component.scss'
})
export class EquipoDetalleComponent implements OnInit {
    constructor(
        private messageService: MessageService,
        private route: Router,
        private activatedRoute: ActivatedRoute,
        private service: EquipoServiceService,
        public dialogService: DialogService
    ) {}
    modelo: equipoDTO;
    items: MenuItem[] = [];
    ref: DynamicDialogRef | undefined;
    visibleDelete: boolean = false;
    loading: boolean = false;
    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params) => {
            const id = params['id'];
            this.items = [
                { label: 'Home', icon: 'pi pi-home', route: '/', primary: false },
                { label: 'Equipo', icon: 'pi pi-fw pi-user', route: '/equipo', primary: false },
                { label: 'Detalle', icon: 'pi pi-fw pi-user', route: '/equipo' + id, primary: true },
            ];
            this.service.obtenerUno(id).subscribe((data) => {
                this.modelo = data;
            });
        });
    }
    editar(id: number) {
        this.ref = this.dialogService.open(EquipoEditarComponent, {
            width: '70%',
            height: '50%',
            data: {
                id: id
            },
            maximizable: true
        });
        this.ref.onClose.subscribe((d) => {
            if (d !== null) {
                this.messageService.add({ severity: 'success', summary: 'Equipo Editado', detail: 'El equipo se ha editado correctamente', life: 3000 });
                this.ngOnInit();
            }
        });
    }
    eliminar(id: number) {
        this.service.borrar(id).subscribe((data) => {
            this.messageService.add({ severity: 'success', summary: 'Equipo Eliminado', detail: 'El equipo se ha eliminado correctamente', life: 3000 });
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

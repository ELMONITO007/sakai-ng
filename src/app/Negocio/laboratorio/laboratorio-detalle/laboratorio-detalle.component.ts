import { Component, input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MenuItem, MessageService } from 'primeng/api';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TabsModule } from 'primeng/tabs';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { HttpClientModule } from '@angular/common/http';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { laboratorioDTO, laboratorioCreacionDTO } from '../../../Entidades/laboratorio';
import { LaboratorioCrearComponent } from '../laboratorio-crear/laboratorio-crear.component';
import { LaboratorioEditarComponent } from '../laboratorio-editar/laboratorio-editar.component';
import { LaboratorioServiceService } from '../../../Servicios/Laboratorio-service.service';
import { UsuarioLaboratistaComponent } from '../../usuario/usuario-laboratista/usuario-laboratista.component';
import { BreadcrumbRouterComponent } from "../../breadcrumbRouter/breadcrumb-router/breadcrumb-router.component";
import { SectorListarLaboratorioComponent } from "../../sector/sector-listar-laboratorio/sector-listar-laboratorio.component";

@Component({
    selector: 'app-laboratorio-detalle',
    imports: [ButtonModule, InputTextModule, ToastModule, MessageModule, TabsModule, CardModule, HttpClientModule, DialogModule, UsuarioLaboratistaComponent, BreadcrumbRouterComponent, SectorListarLaboratorioComponent],
    providers: [MessageService, DialogService, LaboratorioServiceService],
    templateUrl: './laboratorio-detalle.component.html',
    styleUrl: './laboratorio-detalle.component.scss'
})
export class LaboratorioDetalleComponent implements OnInit {
    constructor(
        private messageService: MessageService,
        private route: Router,
        private activatedRoute: ActivatedRoute,
        private service: LaboratorioServiceService,
        public dialogService: DialogService
    ) {}
    modelo: laboratorioDTO;
    items: MenuItem[] = [];
    ref: DynamicDialogRef | undefined;
    visibleDelete: boolean = false;
    loading: boolean = false;
    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params) => {
            const id = params['id'];
          
            this.service.obtenerUno(id).subscribe((data) => {
                this.modelo = data;
                  this.items = [
                { label: 'Home', icon: 'pi pi-home', route: '/index', primary: false },
                { label: 'Laboratorio', icon: 'pi pi-fw pi-user', route: '/laboratorio', primary: false },
                { label: 'Detalle Laboratorio '+data.nombreLaboratorio, icon: 'pi pi-fw pi-user', route: '/laboratorio/' + id, primary: true }
            ];
            });
        });
    }
    editar(id: number) {
        this.ref = this.dialogService.open(LaboratorioEditarComponent, {
            width: '70%',
            height: '50%',
            data: {
                id: id
            },
            maximizable: true
        });
        this.ref.onClose.subscribe((d) => {
            if (d !== null) {
                this.messageService.add({ severity: 'success', summary: 'Laboratorio Editado', detail: 'El laboratorio se ha editado correctamente', life: 3000 });
                this.ngOnInit();
            }
        });
    }
    idDelete: number;
    eliminar(id: number) {
        this.service.borrar(id).subscribe((data) => {
            this.messageService.add({ severity: 'success', summary: 'Laboratorio Eliminado', detail: 'El laboratorio se ha eliminado correctamente', life: 3000 });
        });
        this.ngOnInit();
        this.visibleDelete = false;
    }
    closeDelete() {
        this.visibleDelete = false;
    }
    openDelete(id: number) {
        this.idDelete = id;
        this.visibleDelete = true;
    }
}

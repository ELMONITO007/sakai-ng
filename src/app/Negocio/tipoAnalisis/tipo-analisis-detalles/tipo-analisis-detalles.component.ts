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
import { tipoAnalisisDTO, tipoAnalisisCreacionDTO } from '../../../Entidades/tipoAnalisis';

import { TipoAnalisisEditarComponent } from '../tipo-analisis-editar/tipo-analisis-editar.component';
import { TipoAnalisisServiceService } from '../../../Servicios/TipoAnalisis-service.service';
import { ItemAnalisisListarComponent } from '../../itemAnalisis/item-analisis-listar/item-analisis-listar.component';

@Component({
    selector: 'app-tipo-analisis-detalles',
    imports: [ButtonModule, InputTextModule, ToastModule, MessageModule, TabsModule, CardModule, HttpClientModule, BreadcrumbRouterComponent,ItemAnalisisListarComponent, DialogModule],
    providers: [MessageService, DialogService, TipoAnalisisServiceService],
    templateUrl: './tipo-analisis-detalles.component.html',
    styleUrl: './tipo-analisis-detalles.component.scss',
    standalone: true
})
export class TipoAnalisisDetallesComponent implements OnInit {
    constructor(
        private messageService: MessageService,
        private route: Router,
        private activatedRoute: ActivatedRoute,
        private service: TipoAnalisisServiceService,
        public dialogService: DialogService
    ) {}
    modelo: tipoAnalisisDTO;
    items: MenuItem[] = [];
    ref: DynamicDialogRef | undefined;
    visibleDelete: boolean = false;
    loading: boolean = false;
    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params) => {
            const id = params['id'];
            this.items = [
                { label: 'Home', icon: 'pi pi-home', route: '/', primary: false },
                { label: 'Tipo Analisis', icon: 'pi pi-fw pi-user', route: '/tipo', primary: false },
                { label: 'Detalle', icon: 'pi pi-fw pi-user', route: '/tipo/' + id, primary: true }
            ];
            this.service.obtenerUno(id).subscribe((data) => {
                this.modelo = data;
            });
        });
    }
    editar(id: number) {
        this.ref = this.dialogService.open(TipoAnalisisEditarComponent, {
            width: '70%',
            height: '50%',
            data: {
                id: id
            },
            maximizable: true
        });
        this.ref.onClose.subscribe((d) => {
            if (d !== null) {
                this.messageService.add({ severity: 'success', summary: 'TipoAnalisis Editado', detail: 'El tipoAnalisis se ha editado correctamente', life: 3000 });
                this.ngOnInit();
            }
        });
    }
  
}

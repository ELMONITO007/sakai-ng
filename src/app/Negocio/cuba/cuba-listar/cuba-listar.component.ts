import { Component, OnInit, ViewChild } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { Table, TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { Router } from '@angular/router';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { BreadcrumbRouterComponent } from '../../breadcrumbRouter/breadcrumb-router/breadcrumb-router.component';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { cubaDTO, cubaCreacionDTO } from '../../../Entidades/cuba';

import { CubaEditarComponent } from '../cuba-editar/cuba-editar.component';
import { CubaServiceService } from '../../../Servicios/Cuba-service.service';
import { CubaCrearComponent } from '../cuba-crear/cuba-crear.component';
import { LaboratorioServiceService } from '../../../Servicios/Laboratorio-service.service';
import { laboratorioDTO } from '../../../Entidades/laboratorio';
export interface CubaLaboratorio {
    id_Cuba: number;
    Laboratorio: string;
    codigoCuba: string;
    enUso: string ;
}
@Component({
    selector: 'app-cuba-listar',
    standalone: true,
    imports: [ButtonModule, CardModule, TableModule, HttpClientModule, ToolbarModule, IconFieldModule, BreadcrumbRouterComponent, InputIconModule, InputTextModule, DialogModule, MessageModule, ToastModule],
    providers: [CubaServiceService, DialogService, MessageService,LaboratorioServiceService],
    templateUrl: './cuba-listar.component.html',
    styleUrl: './cuba-listar.component.scss'
})
export class CubaListarComponent implements OnInit {
    visibleDelete: boolean = false;
    loading: boolean = false;
    ref: DynamicDialogRef | undefined;
    @ViewChild('dt1') dt1!: Table;
    items: MenuItem[] = [];
    unLabarotorio:laboratorioDTO;
    visible: boolean = false;
    modelo: CubaLaboratorio[] = [];
    constructor(
        private service: CubaServiceService,
        public dialogService: DialogService,
        private messageService: MessageService,
        private route: Router,
        private laboratorioService: LaboratorioServiceService
    ) {}
    ngOnInit(): void {
        this.modelo = [];
        this.service.obtenerTodos().subscribe(data => {
           for (let i = 0; i < data.length; i++) {
            this.laboratorioService.obtenerUno(data[i].id_Laboratorio).subscribe(labo => {

            
                this.modelo.push({
                    id_Cuba: data[i].id_Cuba,
                    Laboratorio: labo.nombreLaboratorio,
                    codigoCuba: data[i].codigoCuba,
                    enUso: data[i].enUso ? 'Si' : 'No'
                });
              });
            }
        
        });

        this.items = [
            { label: 'Home', icon: 'pi pi-home', route: '', primary: false },
            { label: 'Cuba', icon: 'pi pi-fw pi-user', route: '/cuba', primary: true }
        ];
    }
    exportCSV() {
        this.dt1.exportCSV();
    }
    applyGlobalFilterToDataTable(event: Event, table: Table) {
        const filterValue = (event.target as HTMLInputElement).value;
        table.filterGlobal(filterValue, 'contains');
    }
    clear(table: Table) {
        table.clear();
    }
    editar(id: number) {
        this.ref = this.dialogService.open(CubaEditarComponent, {
            width: '50%',
            height: '35%',
            data: {
                id: id
            },
            maximizable: true
        });
        this.ref.onClose.subscribe((d) => {
            if (d !== null) {
                this.messageService.add({ severity: 'success', summary: 'Cuba Editado', detail: 'El cuba se ha editado correctamente', life: 3000 });
                this.ngOnInit();
            }
        });
    }

    visibleCrear: boolean = false;

    closeCrear() {
        this.visibleCrear = false;
    }
    openCrear() {
        this.visibleCrear = true;
    }
    crear() {
        this.ref = this.dialogService.open(CubaCrearComponent, {
            width: '30%',
            height: '30%',

            maximizable: true
        });
        this.ref.onClose.subscribe((d) => {
            if (d !== null) {
                this.messageService.add({ severity: 'success', summary: 'Cuba Creado', detail: 'La cuba se ha creado correctamente', life: 3000 });
                this.ngOnInit();
            }
        });
    }
    eliminar(id: number) {
        this.service.borrar(id).subscribe((data) => {
            this.ngOnInit();
            this.messageService.add({ severity: 'success', summary: 'Cuba Eliminado', detail: 'La cuba se ha eliminado correctamente', life: 3000 });
        });
     
        this.visibleDelete = false;
    }
    closeDelete() {
        this.visibleDelete = false;
    }
    openDelete() {
        this.visibleDelete = true;
    }
    ir(id: number) {
        this.route.navigate(['/cuba/detalles', id]);
    }
    exportExcel(dt1: Table) {
        var options = {
            fileName: 'Cuba.xlsx',
            fieldSeparator: ';',
            quoteStrings: '"',
            decimalseparator: ',',
            headers: ['id_Cuba', 'id_Laboratorio', 'codigoCuba', 'enUso']
        };
        new ngxCsv(this.modelo, 'Cuba', options);
    }
}

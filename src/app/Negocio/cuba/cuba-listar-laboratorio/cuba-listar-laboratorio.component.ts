import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { Table, TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { Router } from '@angular/router';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { BreadcrumbRouterComponent } from '../../breadcrumbRouter/breadcrumb-router/breadcrumb-router.component';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import {cubaDTO,cubaCreacionDTO } from '../../../Entidades/cuba';

import { CubaEditarComponent } from '../cuba-editar/cuba-editar.component';
import { CubaServiceService } from '../../../Servicios/Cuba-service.service';
import { CubaCrearComponent } from '../cuba-crear/cuba-crear.component';
import { laboratorioDTO } from '../../../Entidades/laboratorio';
import { LaboratorioServiceService } from '../../../Servicios/Laboratorio-service.service';
import { CubaLaboratorio } from '../cuba-listar/cuba-listar.component';

@Component({
  selector: 'app-cuba-listar-laboratorio',
  standalone: true,
  imports: [ButtonModule,
    CardModule,
    TableModule,
    HttpClientModule,ToolbarModule,
    IconFieldModule, 
    InputIconModule,
    InputTextModule, DialogModule,MessageModule,ToastModule],
    providers: [CubaServiceService, DialogService,MessageService],
  templateUrl: './cuba-listar-laboratorio.component.html',
  styleUrl: './cuba-listar-laboratorio.component.scss'
})
export class CubaListarLaboratorioComponent implements OnInit {
    visibleDelete: boolean = false;
    loading: boolean = false;
    ref: DynamicDialogRef | undefined;
    @ViewChild('dt1') dt1!: Table;
    items: MenuItem[] = [];
    unLabarotorio:laboratorioDTO;
    visible: boolean = false;
    modelo: CubaLaboratorio[] = [];
    @Input() id: number ;
    constructor(
        private service: CubaServiceService,
        public dialogService: DialogService,
        private messageService: MessageService,
        private route: Router,
        public config:DynamicDialogConfig,
        private laboratorioService: LaboratorioServiceService
    ) {}
    ngOnInit(): void {
        this.modelo = [];
        this.service.ReadLaboratorio(this.config.data['id']).subscribe(data => {
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

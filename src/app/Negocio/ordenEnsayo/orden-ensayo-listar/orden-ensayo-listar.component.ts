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
import { ordenEnsayoVistaLaboratistaDTO } from '../../../Entidades/ordenEnsayo';
import { OrdenEnsayoServiceService } from '../../../Servicios/OrdenEnsayo-service.service';
import { OrdenEnsayoCrearComponent } from '../orden-ensayo-crear/orden-ensayo-crear.component';
import { OrdenEnsayoEditarComponent } from '../orden-ensayo-editar/orden-ensayo-editar.component';
import { UsuarioServiceService } from '../../../Servicios/Usuario-service.service';
import { usuarioDTO } from '../../../Entidades/usuario';

import { LaboratorioServiceService } from '../../../Servicios/Laboratorio-service.service';
import { sectorDTO } from '../../../Entidades/sector';
import { EquipoServiceService } from '../../../Servicios/Equipo-service.service';

@Component({
    selector: 'app-orden-ensayo-listar',
    standalone: true,
    imports: [ButtonModule, CardModule, TableModule, HttpClientModule, ToolbarModule, IconFieldModule, BreadcrumbRouterComponent, InputIconModule, InputTextModule, DialogModule, MessageModule, ToastModule],
    providers: [OrdenEnsayoServiceService, DialogService, MessageService, UsuarioServiceService, LaboratorioServiceService, EquipoServiceService],
    templateUrl: './orden-ensayo-listar.component.html',
    styleUrl: './orden-ensayo-listar.component.scss'
})
export class OrdenEnsayoListarComponent implements OnInit {
    visibleDelete: boolean = false;
    loading: boolean = false;
    ref: DynamicDialogRef | undefined;
    @ViewChild('dt1') dt1!: Table;
    items: MenuItem[] = [];
    visible: boolean = false;
    modelo: ordenEnsayoVistaLaboratistaDTO[] = [];

    sector: sectorDTO;
    idDelete: number = 0;
    usuario: usuarioDTO;

    constructor(
        private service: OrdenEnsayoServiceService,
        public dialogService: DialogService,
        private messageService: MessageService,
        private route: Router,
        private usuarioService: UsuarioServiceService,

        private equipoService: EquipoServiceService,

        private laboratorioService: LaboratorioServiceService
    ) {}
    ngOnInit(): void {
       // this.usuario = this.usuarioService.getUsuarioLogeado();
     
        this.service.ReadbyLaboratista('benitand').subscribe((data) => {
            for (let i = 0; i < data.length; i++) {
                this.equipoService.obtenerUno(data[i].id_Equipo).subscribe((equipo) => {
                    this.modelo.push({
                        id_OrdenEnsayo: data[i].id_OrdenEnsayo,
                        numeroOrden: data[i].numeroOrden,
                        equipo: equipo.codigo,
                        estado: data[i].estado,
                        usuario: data[i].nombreUsuario,
                        fechaCreacion: data[i].fechaCreacion,
                        fechaExtraccion: data[i].fechaExtraccion,
                        fechaFinalizacion: data[i].fechaFinalizacion,
                        nombreSector: data[i].nombreSector,
                       
                    });
                });
            }
        });
        this.items = [
            { label: 'Home', icon: 'pi pi-home', route: '', primary: false },
            { label: 'OrdenEnsayo', icon: 'pi pi-fw pi-user', route: '/ordenEnsayo', primary: true }
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
        this.ref = this.dialogService.open(OrdenEnsayoEditarComponent, {
            width: '70%',
            height: '60%',
            data: {
                id: id
            },
            maximizable: true,
            header: 'Editar Orden de Ensayo'
        });
        this.ref.onClose.subscribe((d) => {
            if (d !== null) {
                this.messageService.add({ severity: 'success', summary: 'OrdenEnsayo Editado', detail: 'El ordenEnsayo se ha editado correctamente', life: 3000 });
                this.ngOnInit();
            }
        });
    }
    crear() {
        this.ref = this.dialogService.open(OrdenEnsayoCrearComponent, {
            width: '70%',
            height: '50%',

            maximizable: true,
            header: 'Crear Orden de Ensayo'
        });
        this.ref.onClose.subscribe((d) => {
            if (d !== null) {
                this.messageService.add({ severity: 'success', summary: 'OrdenEnsayo Creado', detail: 'El ordenEnsayo se ha creado correctamente', life: 3000 });
                this.ngOnInit();
            }
        });
    }
    eliminar(id: number) {
        this.service.borrar(id).subscribe((data) => {
            this.messageService.add({ severity: 'success', summary: 'OrdenEnsayo Eliminado', detail: 'El ordenEnsayo se ha eliminado correctamente', life: 3000 });
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
    ir(id: number) {
        this.route.navigate(['/ordenEnsayo/', id]);
    }
    exportExcel(dt1: Table) {
        var options = {
            fileName: 'OrdenEnsayo.xlsx',
            fieldSeparator: ';',
            quoteStrings: '"',
            decimalseparator: ',',
            headers: [
                'id_OrdenEnsayo',
                'numeroOrden',
                'id_Equipo',
                'id_Laboratorio',
                'emailUsuario',
                'nombreUsuario',
                'fechaCreacion',
                'fechaExtraccion',
                'fechaFinalizacion',
                'fechaPedidoExtraccion',
                'cuba',
                'temperatura',
                'observaciones',
                'tipoAceite',
                'inhibido',
                'motivo',
                'tipoSolicitud',
                'urgencia',
                'nombreSector',
                'pais',
                'provincia',
                'estado',
                'nombreLaboratista',
                'usuarioLaboratista',
                'emailLaboratista'
            ]
        };
        new ngxCsv(this.modelo, 'OrdenEnsayo', options);
    }
}

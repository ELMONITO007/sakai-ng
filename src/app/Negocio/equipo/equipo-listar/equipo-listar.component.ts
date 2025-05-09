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
import { equipoDTO, equipoCreacionDTO } from '../../../Entidades/equipo';
import { EquipoCrearComponent } from '../equipo-crear/equipo-crear.component';
import { EquipoEditarComponent } from '../equipo-editar/equipo-editar.component';
import { EquipoServiceService } from '../../../Servicios/Equipo-service.service';

@Component({
    selector: 'app-equipo-listar',
    standalone: true,
    imports: [ButtonModule, CardModule, TableModule, HttpClientModule, ToolbarModule, IconFieldModule, BreadcrumbRouterComponent, InputIconModule, InputTextModule, DialogModule, MessageModule, ToastModule],
    providers: [EquipoServiceService, DialogService, MessageService],

    templateUrl: './equipo-listar.component.html',
    styleUrl: './equipo-listar.component.scss'
})
export class EquipoListarComponent implements OnInit {
    visibleDelete: boolean = false;
    loading: boolean = false;
    ref: DynamicDialogRef | undefined;
    @ViewChild('dt1') dt1!: Table;
    items: MenuItem[] = [];
    visible: boolean = false;
    modelo: equipoDTO[] = [];
    idDelete: number = 0;
    constructor(
        private service: EquipoServiceService,
        public dialogService: DialogService,
        private messageService: MessageService,
        private route: Router
    ) {}
    ngOnInit(): void {
        this.service.obtenerTodos().subscribe((data) => {
            this.modelo = data;
            this.loading = false;
        });

        this.items = [
            { label: 'Home', icon: 'pi pi-home', route: '',primary: false },
            { label: 'Equipo', icon: 'pi pi-fw pi-user', route: '/equipo',primary: true },
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
        this.ref = this.dialogService.open(EquipoEditarComponent, {
            width: '70%',
            height: '90%',
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
    crear() {
        this.ref = this.dialogService.open(EquipoCrearComponent, {
            width: '70%',
            height: '90%',
            header: 'Crear Equipo',

            maximizable: true
        });
        this.ref.onClose.subscribe((d) => {
            if (d !== null) {
                this.messageService.add({ severity: 'success', summary: 'Equipo Creado', detail: 'El equipo se ha creado correctamente', life: 3000 });
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
    openDelete(id: number) {
      this.idDelete = id;
        this.visibleDelete = true;
    }
    ir(id: number) {
        this.route.navigate(['/equipo/', id]);
    }
    exportExcel(dt1: Table) {
        var options = {
            fileName: 'Equipo.xlsx',
            fieldSeparator: ';',
            quoteStrings: '"',
            decimalseparator: ',',
            headers: [
                'id_Equipo',
                'codigo',
                'tipoEquipo',
                'marca',
                'modelo',
                'numeroSerie',
                'fechaInstalacion',
                'fechaFabricacion',
                'ubicacion',
                'id_Sector',
                'detalle',
                'estado',
                'fase',
                'potenciaPrimario',
                'potenciaSecundario',
                'potenciaTerciario',
                'tensionPrimario',
                'tensionSecundario',
                'tensionTerciario',
                'tipoAceite',
                'volumenAceite',
                'inhibido',
                'fechaVencimiento'
            ]
        };
        new ngxCsv(this.modelo, 'Equipo', options);
    }
}

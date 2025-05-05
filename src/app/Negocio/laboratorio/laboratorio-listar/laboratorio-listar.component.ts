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
import { laboratorioDTO, laboratorioCreacionDTO } from '../../../Entidades/laboratorio';
import { LaboratorioCrearComponent } from '../laboratorio-crear/laboratorio-crear.component';
import { LaboratorioEditarComponent } from '../laboratorio-editar/laboratorio-editar.component';
import { LaboratorioServiceService } from '../../../Servicios/Laboratorio-service.service';
@Component({
    selector: 'app-laboratorio-listar',
    standalone: true,
    imports: [ButtonModule, CardModule, TableModule, HttpClientModule, ToolbarModule, IconFieldModule, BreadcrumbRouterComponent, InputIconModule, InputTextModule, DialogModule, MessageModule, ToastModule],
    providers: [LaboratorioServiceService, DialogService, MessageService],
    templateUrl: './laboratorio-listar.component.html',
    styleUrl: './laboratorio-listar.component.scss'
})
export class LaboratorioListarComponent implements OnInit {
    visibleDelete: boolean = false;
    loading: boolean = false;
    ref: DynamicDialogRef | undefined;
    @ViewChild('dt1') dt1!: Table;
    items: MenuItem[] = [];
    visible: boolean = false;
    modelo: laboratorioDTO[] = [];
    idDelete: number = 0;
    constructor(
        private service: LaboratorioServiceService,
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
            { label: 'Home', icon: 'pi pi-home', route: '' },
            { label: 'Laboratorio', icon: 'pi pi-fw pi-user', route: '/laboratorio' }
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
    crear() {
        this.ref = this.dialogService.open(LaboratorioCrearComponent, {
            width: '70%',
            height: '50%',

            maximizable: true
        });
        this.ref.onClose.subscribe((d) => {
            if (d !== null) {
                this.messageService.add({ severity: 'success', summary: 'Laboratorio Creado', detail: 'El laboratorio se ha creado correctamente', life: 3000 });
                this.ngOnInit();
            }
        });
    }
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
    ir(id: number) {
        this.route.navigate(['/laboratorio/', id]);
    }
    exportExcel(dt1: Table) {
        var options = {
            fileName: 'Laboratorio.xlsx',
            fieldSeparator: ';',
            quoteStrings: '"',
            decimalseparator: ',',
            headers: ['id_Laboratorio', 'nombreLaboratorio', 'telefono', 'direccion', 'email']
        };
        new ngxCsv(this.modelo, 'Laboratorio', options);
    }
}

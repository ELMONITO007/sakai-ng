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
import { tipoAnalisisDTO, tipoAnalisisCreacionDTO } from '../../../Entidades/tipoAnalisis';
import { TipoAnalisisServiceService } from '../../../Servicios/TipoAnalisis-service.service';
import { TipoAnalisisEditarComponent } from '../tipo-analisis-editar/tipo-analisis-editar.component';
@Component({
    selector: 'app-tipo-analisis-listar',

    templateUrl: './tipo-analisis-listar.component.html',
    styleUrl: './tipo-analisis-listar.component.scss',
    standalone: true,
    imports: [ButtonModule, CardModule, TableModule, HttpClientModule, ToolbarModule, IconFieldModule, BreadcrumbRouterComponent, InputIconModule, InputTextModule, DialogModule, MessageModule, ToastModule],
    providers: [TipoAnalisisServiceService, DialogService, MessageService]
})
export class TipoAnalisisListarComponent implements OnInit {
    visibleDelete: boolean = false;
    loading: boolean = false;
    ref: DynamicDialogRef | undefined;
    @ViewChild('dt1') dt1!: Table;
    items: MenuItem[] = [];
    visible: boolean = false;
    modelo: tipoAnalisisDTO[] = [];
    constructor(
        private service: TipoAnalisisServiceService,
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
            { label: 'Tipo Analisis', icon: 'pi pi-fw pi-user', route: '/tipoAnalisis' }
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

    itemAnalisis(id: number) {
       
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

    eliminar(id: number) {
        this.service.borrar(id).subscribe((data) => {
            this.messageService.add({ severity: 'success', summary: 'TipoAnalisis Eliminado', detail: 'El tipoAnalisis se ha eliminado correctamente', life: 3000 });
        });
        this.ngOnInit();
        this.visibleDelete = false;
    }
    closeDelete() {
        this.visibleDelete = false;
    }
    openDelete() {
        this.visibleDelete = true;
    }
    ir(id: number) {
        this.route.navigate(['/tipoAnalisis/detalles', id]);
    }
    exportExcel(dt1: Table) {
        var options = {
            fileName: 'TipoAnalisis.xlsx',
            fieldSeparator: ';',
            quoteStrings: '"',
            decimalseparator: ',',
            headers: ['id_TipoAnalisis', 'id_Norma', 'nombreTipoAnalisis', 'descripcion']
        };
        new ngxCsv(this.modelo, 'TipoAnalisis', options);
    }
}

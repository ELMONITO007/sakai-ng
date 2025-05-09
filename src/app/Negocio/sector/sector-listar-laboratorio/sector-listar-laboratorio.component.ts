import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
import { sectorDTO, sectorCreacionDTO } from '../../../Entidades/sector';

import { SectorServiceService } from '../../../Servicios/Sector-service.service';
import { SectorLaboratorioComponent } from '../sector-laboratorio/sector-laboratorio.component';

@Component({
    selector: 'app-sector-listar-laboratorio',
    imports: [ButtonModule, CardModule, TableModule, HttpClientModule, ToolbarModule, IconFieldModule, BreadcrumbRouterComponent, InputIconModule, InputTextModule, DialogModule, MessageModule, ToastModule],
    providers: [SectorServiceService, DialogService, MessageService],
    templateUrl: './sector-listar-laboratorio.component.html',
    styleUrl: './sector-listar-laboratorio.component.scss'
})
export class SectorListarLaboratorioComponent implements OnInit {
    constructor(
        private service: SectorServiceService,
        public dialogService: DialogService,
        private messageService: MessageService,
        private route: Router
    ) {}
    @Input() id: number;
    visibleDelete: boolean = false;
    loading: boolean = false;
    ref: DynamicDialogRef | undefined;
    @ViewChild('dt1') dt1!: Table;
    items: MenuItem[] = [];
    visible: boolean = false;
    modelo: sectorDTO[] = [];
    idDelete: number = 0;
    ngOnInit(): void {
        this.service.obtenerPorPadre(this.id).subscribe((data) => {
            this.modelo = data;
            this.loading = false;
        });
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

    crear() {}
    eliminar(id: number) {}
    closeDelete() {
        this.visibleDelete = false;
    }
    openDelete(id) {
        const ref = this.dialogService.open(SectorLaboratorioComponent, {
            header: 'Reasignar Laboratorio',
            width: '30%',
            height: '30%',
            
        

            data: { id_Sector: id, id_Laboratorio: this.id }
        });
        ref.onClose.subscribe((data) => {
            if (data != null) {
                this.ngOnInit();
                this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'El sector fue eliminado' });
            }
        });
    }
    ir(id: number) {
        this.route.navigate(['/sector/detalles', id]);
    }
    exportExcel(dt1: Table) {
        var options = {
            fileName: 'Sector.xlsx',
            fieldSeparator: ';',
            quoteStrings: '"',
            decimalseparator: ',',
            headers: ['id_Sector', 'nombreSector', 'coordenada', 'pais', 'provincia', 'codigo', 'detalle', 'id_Laboratorio']
        };
        new ngxCsv(this.modelo, 'Sector', options);
    }
}

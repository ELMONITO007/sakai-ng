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
import { itemAnalisisDTO, itemAnalisisCreacionDTO } from '../../../Entidades/itemAnalisis';

import { ItemAnalisisEditarComponent } from '../item-analisis-editar/item-analisis-editar.component';
import { ItemAnalisisServiceService } from '../../../Servicios/ItemAnalisis-service.service';
import { InputGroup } from 'primeng/inputgroup';

@Component({
    selector: 'app-item-analisis-listar',
    standalone: true,
    imports: [ButtonModule, CardModule, TableModule, HttpClientModule, ToolbarModule, IconFieldModule, BreadcrumbRouterComponent, InputIconModule, InputTextModule, DialogModule, MessageModule, ToastModule],
    providers: [ItemAnalisisServiceService, DialogService, MessageService],
    templateUrl: './item-analisis-listar.component.html',
    styleUrl: './item-analisis-listar.component.scss'
})
export class ItemAnalisisListarComponent implements OnInit {
    visibleDelete: boolean = false;
    loading: boolean = false;
    @Input() id: number=2;
    ref: DynamicDialogRef | undefined;
    @ViewChild('dt1') dt1!: Table;
    items: MenuItem[] = [];
    visible: boolean = false;
    modelo: itemAnalisisDTO[] = [];
    constructor(
        private service: ItemAnalisisServiceService,
        public dialogService: DialogService,
        private messageService: MessageService,
        private route: Router
    ) {}
    ngOnInit(): void {
        this.service.obtenerPorPadre(this.id).subscribe((data) => {
            this.modelo = data;
            this.loading = false;
        });

        this.items = [
            { label: 'Home', icon: 'pi pi-home', route: '' },
            { label: 'Item Analisis', icon: 'pi pi-fw pi-tag', route: '/itemAnalisis' }
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
        this.ref = this.dialogService.open(ItemAnalisisEditarComponent, {
            width: '70%',
            height: '50%',
            data: {
                id: id
            },
            maximizable: true
        });
        this.ref.onClose.subscribe((d) => {
            if (d !== null) {
                this.messageService.add({ severity: 'success', summary: 'ItemAnalisis Editado', detail: 'El itemAnalisis se ha editado correctamente', life: 3000 });
                this.ngOnInit();
            }
        });
    }
  
   
    closeDelete() {
        this.visibleDelete = false;
    }
    openDelete() {
        this.visibleDelete = true;
    }
    ir(id: number) {
        this.route.navigate(['/itemAnalisis/detalles', id]);
    }
    exportExcel(dt1: Table) {
        var options = {
            fileName: 'ItemAnalisis.xlsx',
            fieldSeparator: ';',
            quoteStrings: '"',
            decimalseparator: ',',
            headers: ['id_ItemAnalisis', 'id_TipoAnalisis', 'nombreItemAnalisis', 'abreviatura', 'valorMaximo', 'valorMinimo', 'medida']
        };
        new ngxCsv(this.modelo, 'ItemAnalisis', options);
    }
}

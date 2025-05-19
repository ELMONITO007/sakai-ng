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
import {bitacoraDTO,bitacoraCreacionDTO } from '../../../Entidades/bitacora';

import { BitacoraServiceService } from '../../../Servicios/Bitacora-service.service';

@Component({
  selector: 'app-bitacora-listar',
 standalone: true,
  imports: [ButtonModule,
    CardModule,
    TableModule,
    HttpClientModule,ToolbarModule,
    IconFieldModule,
    BreadcrumbRouterComponent,
    InputIconModule,
    InputTextModule, DialogModule,MessageModule,ToastModule],
    providers: [BitacoraServiceService, DialogService,MessageService],
  templateUrl: './bitacora-listar.component.html',
  styleUrl: './bitacora-listar.component.scss'
})
export class BitacoraListarComponent implements OnInit {
  visibleDelete: boolean = false; 
  loading: boolean = false;
  ref: DynamicDialogRef | undefined;
  @ViewChild('dt1') dt1!: Table;
  items: MenuItem[] = [];
   visible: boolean = false;
  modelo: bitacoraDTO[] = [];
  @Input() id: number ;
  constructor(
    private service: BitacoraServiceService,
    public dialogService: DialogService,private messageService: MessageService,private route: Router
  ) {}
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
  exportExcel(dt1: Table) {
var options = {
      fileName: 'Bitacora.xlsx',
      fieldSeparator: ';',
      quoteStrings: '"',
      decimalseparator: ',',
      headers: ['id_Bitacora','id_OrdenEnsayo','registro','fecha','hora','tipo','nombre',],
    };
    new ngxCsv(this.modelo, 'Bitacora', options);
  }
  	 
		  first = 0;

    rows = 10;


	
			    next() {
        this.first = this.first + this.rows;
    }

    prev() {
        this.first = this.first - this.rows;
    }

    reset() {
        this.first = 0;
    }

    pageChange(event) {
        this.first = event.first;
        this.rows = event.rows;
    }

    isLastPage(): boolean {
        return this.modelo ? this.first + this.rows >= this.modelo.length : true;
    }

    isFirstPage(): boolean {
        return this.modelo ? this.first === 0 : true;
    }
}

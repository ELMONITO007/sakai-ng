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
import { sectorDTO, sectorCreacionDTO } from '../../../Entidades/sector';
import { SectorCrearComponent } from '../sector-crear/sector-crear.component';
import { SectorEditarComponent } from '../sector-editar/sector-editar.component';
import { SectorServiceService } from '../../../Servicios/Sector-service.service';
import { laboratorioDTO } from '../../../Entidades/laboratorio';
import { LaboratorioServiceService } from '../../../Servicios/Laboratorio-service.service';
import { CubaListarLaboratorioComponent } from '../../cuba/cuba-listar-laboratorio/cuba-listar-laboratorio.component';
import { ColaboradorFijoCrearComponent } from '../../colaboradorFijo/colaborador-fijo-crear/colaborador-fijo-crear.component';
import { UsuarioColaborarFijoComponent } from '../../usuario/usuario-colaborar-fijo/usuario-colaborar-fijo.component';
export interface sectorLaboratorioDTO {
  id_Sector:number,
  nombreSector:string,
  coordenada:string,
  pais:string,
  provincia:string,
  codigo:string,
  detalle:string,
  Laboratorio:string,
}

@Component({
    selector: 'app-sector-listar',
    standalone: true,
    imports: [ButtonModule, CardModule, TableModule, HttpClientModule, ToolbarModule, IconFieldModule, BreadcrumbRouterComponent, InputIconModule, InputTextModule, DialogModule, MessageModule, ToastModule],
    providers: [SectorServiceService, DialogService, MessageService],
    templateUrl: './sector-listar.component.html',
    styleUrl: './sector-listar.component.scss'
})
export class SectorListarComponent implements OnInit {
    visibleDelete: boolean = false;
    loading: boolean = false;
    ref: DynamicDialogRef | undefined;
    @ViewChild('dt1') dt1!: Table;
    items: MenuItem[] = [];
    visible: boolean = false;
    modelo: sectorLaboratorioDTO[] = [];
    unLabo:laboratorioDTO;
    constructor(
        private service: SectorServiceService,
        public dialogService: DialogService,
        private messageService: MessageService,
        private route: Router,
        private laboratorioService: LaboratorioServiceService,
    ) {}
    ngOnInit(): void {
        this.modelo = [];
      this.items = [
        { label: 'Home', icon: 'pi pi-home', route: '', primary: false },
        { label: 'Sector', icon: 'pi pi-fw pi-user', route: '/sector', primary: true },
    ];
        this.service.obtenerTodos().subscribe(data => {
          for (let i = 0; i < data.length; i++) {
this.laboratorioService.obtenerUno(data[i].id_Laboratorio).subscribe((x) => {
            this.modelo.push({
              id_Sector: data[i].id_Sector,
              nombreSector: data[i].nombreSector,
              coordenada: data[i].coordenada,
              pais: data[i].pais,
              provincia: data[i].provincia,
              codigo: data[i].codigo,
              detalle: data[i].detalle,
              Laboratorio:x.nombreLaboratorio,

            });
          });
          }

            
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
    editar(id: number) {
        this.ref = this.dialogService.open(SectorEditarComponent, {
            width: '70%',
            height: '40%',
            data: {
                id: id
            },
            maximizable: true
        });
        this.ref.onClose.subscribe((d) => {
            if (d !== null) {
                this.messageService.add({ severity: 'success', summary: 'Sector Editado', detail: 'El sector se ha editado correctamente', life: 3000 });
                this.ngOnInit();
            }
        });
    }
    crear() {
        this.ref = this.dialogService.open(SectorCrearComponent, {
            width: '70%',
            height: '40%',

            maximizable: true
        });
        this.ref.onClose.subscribe((d) => {
            if (d !== null) {
                this.messageService.add({ severity: 'success', summary: 'Sector Creado', detail: 'El sector se ha creado correctamente', life: 3000 });
                this.ngOnInit();
            }
        });
    }
    Cubas(id) {
        this.ref = this.dialogService.open(CubaListarLaboratorioComponent, {
            width: '70%',
            height: '40%',
            data: {
                id: id
            },

            maximizable: true
        });
       
    }
    idDelete: number = 0;
    eliminar(id: number) {
        this.service.borrar(id).subscribe((data) => {
            this.messageService.add({ severity: 'success', summary: 'Sector Eliminado', detail: 'El sector se ha eliminado correctamente', life: 3000 });
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

    VerColaboradores(id: number) {
     this.route.navigate(['/colaborador/', id]);
        
    }
}

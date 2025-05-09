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
import { ActivatedRoute, Router } from '@angular/router';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { BreadcrumbRouterComponent } from '../../breadcrumbRouter/breadcrumb-router/breadcrumb-router.component';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';

import { UsuarioServiceService } from '../../../Servicios/Usuario-service.service';
import { usuarioDTO } from '../../../Entidades/usuario';
import { UsuarioCrearComponent } from '../usuario-crear/usuario-crear.component';
import { UsuarioEditarComponent } from '../usuario-editar/usuario-editar.component';
import { colaboradoresFijosDTO } from '../../../Entidades/colaboradoresFijos';
import { ColaboradoresFijosServiceService } from '../../../Servicios/ColaboradoresFijos-service.service';
import { RefreshIcon } from 'primeng/icons';
import { LaboratistaCrearComponent } from '../../laboratista/laboratista-crear/laboratista-crear.component';
import { LaboratistaServiceService } from '../../../Servicios/Laboratista-service.service';


@Component({
  selector: 'app-usuario-laboratista',
  standalone: true,
  imports: [ButtonModule, CardModule, TableModule, HttpClientModule, ToolbarModule, IconFieldModule, InputIconModule, InputTextModule, DialogModule, MessageModule, ToastModule],
  providers: [UsuarioServiceService, DialogService, MessageService, ColaboradoresFijosServiceService],
  templateUrl: './usuario-laboratista.component.html',
  styleUrl: './usuario-laboratista.component.scss'
})
export class UsuarioLaboratistaComponent implements OnInit {
    usuarios: usuarioDTO[] = [];
    items: MenuItem[] = [];
@Input() id: number 
    visibleDelete: boolean = false;
    loading: boolean = false;
    colaborador: colaboradoresFijosDTO;
    ref: DynamicDialogRef | undefined;
    @ViewChild('dt1') dt1!: Table;
    constructor(
        private usuarioService: UsuarioServiceService,
        private service: LaboratistaServiceService,
        public dialogService: DialogService,
        private messageService: MessageService,
        private route: Router,
        private activeRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
    
            this.usuarioService.readLaboratorio(this.id).subscribe((data) => {
                this.usuarios = data;
                this.loading = false;
                
            });
       
    }
    visible: boolean = false;
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

    AgregarUsuario() {
        this.activeRoute.params.subscribe((params) => {
        this.ref = this.dialogService.open(LaboratistaCrearComponent, {
            width: '70%',
            height: '50%',
            data: {
                id: params['id']
            },

            maximizable: true
        });
        this.ref.onClose.subscribe((d) => {
            if (d !== null) {
                this.messageService.add({ severity: 'success', summary: 'Usuario Creado', detail: 'El usuario se ha creado correctamente', life: 3000 });
                this.ngOnInit();
            }
        });
    });
    }
    eliminarUsuario(id: number) {
        this.loading = true;
        this.activeRoute.params.subscribe((params) => {
            this.service.borrar(id,this.id).subscribe((data) => {
                this.messageService.add({ severity: 'success', summary: 'Usuario Eliminado', detail: 'El usuario se ha eliminado correctamente', life: 3000 });
                this.ngOnInit();
                this.visibleDelete = false;
              });
        
           
        });
    }
    idDelete: number = 0;
    closeDelete() {
        
        this.visibleDelete = false;
    }
    openDelete(id: number) {
        this.idDelete = id;
        this.visibleDelete = true;
    }

    detalleUsuario(id: number) {
        this.route.navigate(['/usuario/' + id]);
    }

    exportExcel(table: Table) {
        var options = {
            fileName: 'Usuarios.xlsx',
            fieldSeparator: ';',
            quoteStrings: '"',
            decimalseparator: ',',
            headers: ['id_usuario', 'nombre', 'apellido', 'correo', 'usuario', 'contraseña', 'rol', 'bloqueado', 'Cantidad Intentos']
        };
        new ngxCsv(table.value, 'Usuarios', options);
    }

}

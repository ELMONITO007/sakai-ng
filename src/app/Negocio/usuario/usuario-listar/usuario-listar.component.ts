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

import { UsuarioServiceService } from '../../../Servicios/Usuario-service.service';
import { usuarioDTO } from '../../../Entidades/usuario';
import { UsuarioCrearComponent } from '../usuario-crear/usuario-crear.component';
import { UsuarioEditarComponent } from '../usuario-editar/usuario-editar.component';
@Component({
  selector: 'app-usuario-listar',
  standalone: true,
  imports: [ButtonModule,
    CardModule,
    TableModule,
    HttpClientModule,ToolbarModule,
    IconFieldModule,
    BreadcrumbRouterComponent,
    InputIconModule,
    InputTextModule, DialogModule,MessageModule,ToastModule],
    providers: [UsuarioServiceService, DialogService,MessageService],
  templateUrl: './usuario-listar.component.html',
  styleUrl: './usuario-listar.component.scss',
  


})
export class UsuarioListarComponent implements OnInit {

  usuarios: usuarioDTO[] = [];
  items: MenuItem[] = [];

  visibleDelete: boolean = false; 
  loading: boolean = false;
  ref: DynamicDialogRef | undefined;
  @ViewChild('dt1') dt1!: Table;
  constructor(
    private usuarioService: UsuarioServiceService,
    public dialogService: DialogService,private messageService: MessageService,private route: Router
  ) {}

  ngOnInit(): void {
    this.usuarioService.obtenerTodos().subscribe((data) => {
      this.usuarios = data;
      this.loading = false;
    });

    this.items = [
      { label: 'Home', icon: 'pi pi-home', route: '' },
      { label: 'Usuario', icon: 'pi pi-fw pi-user', route: '/usuario' },
    ];
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

  editarUsuario(id: number) {
    this.ref = this.dialogService.open(UsuarioEditarComponent, {
      width: '70%',
      height: '50%',
      data: {
        id: id,
      },
      maximizable: true,
    });
    this.ref.onClose.subscribe((d) => {
      if (d !== null) {
        this.messageService.add({ severity: 'success', summary: 'Usuario Editado', detail: 'El usuario se ha editado correctamente',life: 3000 });
        this.ngOnInit();
        
       
      }
    });
  }

  crearUsuario() {
    this.ref = this.dialogService.open(UsuarioCrearComponent, {
      width: '70%',
      height: '50%',
     
      maximizable: true,
    });
    this.ref.onClose.subscribe((d) => {
      if (d !== null) {
       
        this.messageService.add({ severity: 'success', summary: 'Usuario Creado', detail: 'El usuario se ha creado correctamente',life: 3000 });
        this.ngOnInit();
      }
    });
  }
  eliminarUsuario(id: number) {
    this.usuarioService.borrar(id).subscribe((data) => {
    
      this.messageService.add({ severity: 'success', summary: 'Usuario Eliminado', detail: 'El usuario se ha eliminado correctamente',life: 3000 });
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

  detalleUsuario(id: number) {
    this.route.navigate(['/usuario/'+id]);
  }

  exportExcel(table: Table) {
    var options = {
      fileName: 'Usuarios.xlsx',
      fieldSeparator: ';',
      quoteStrings: '"',
      decimalseparator: ',',
      headers:['id_usuario','nombre','apellido','correo','usuario','contraseña','rol','bloqueado','Cantidad Intentos'],
    };
    new ngxCsv(table.value, 'Usuarios', options);

  }


}

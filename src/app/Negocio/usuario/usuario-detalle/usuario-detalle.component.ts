import { Component, input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MenuItem, MessageService } from 'primeng/api';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TabsModule } from 'primeng/tabs';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { HttpClientModule } from '@angular/common/http';
import { BreadcrumbRouterComponent } from '../../breadcrumbRouter/breadcrumb-router/breadcrumb-router.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';


import { UsuarioEditarComponent } from '../usuario-editar/usuario-editar.component';
import { UsuarioServiceService } from '../../../Servicios/Usuario-service.service';
import { usuarioDTO } from '../../../Entidades/usuario';
@Component({
  selector: 'app-usuario-detalle',
  imports: [  ButtonModule,
    InputTextModule,ToastModule,
    MessageModule,
    TabsModule,
    CardModule,
    HttpClientModule,
    BreadcrumbRouterComponent,DialogModule],
  templateUrl: './usuario-detalle.component.html',
  styleUrl: './usuario-detalle.component.scss',
  providers: [UsuarioServiceService, DialogService, MessageService],
  standalone: true,
})
export class UsuarioDetalleComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private service: UsuarioServiceService,
    public dialogService: DialogService
  ) {}
  usuario: usuarioDTO;
  items: MenuItem[] = [];
    ref: DynamicDialogRef | undefined;
  visibleDelete: boolean = false;
  loading: boolean = false;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      this.items = [
        { label: 'Home', icon: 'pi pi-home', route: '/index' },
        { label: 'Usuario', icon: 'pi pi-fw pi-user', route: '/usuario' },
        { label: 'Detalle', icon: 'pi pi-fw pi-user', route: '/usuario/' + id },
      ];
      this.service.obtenerUno(id).subscribe(data => {
        this.usuario = data;
      });
    });
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
          this.ngOnInit();
          }
          this.messageService.add({ severity: 'success', summary: 'Usuario Editado', detail: 'El usuario se ha editado correctamente',life: 3000 });
        
      });
    }
    eliminarUsuario(id: number) {
      this.loading = true;
      this.service.borrar(id).subscribe((data) => {
      
        this.messageService.add({ severity: 'success', summary: 'Usuario Eliminado', detail: 'El usuario se ha eliminado correctamente',life: 3000 });
      });
      
      this.visibleDelete = false;
    }
    closeDelete() {
      this.visibleDelete = false;
    }
    openDelete() {
      this.visibleDelete = true;
    }

}

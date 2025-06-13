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
import { ordenEnsayoDTO } from '../../../Entidades/ordenEnsayo';
import { OrdenEnsayoServiceService } from '../../../Servicios/OrdenEnsayo-service.service';
import { CommonModule } from '@angular/common';

import { AgdComponent } from '../../agd/agd/agd.component';
import { ContenidoFuranoComponent } from '../../contenidoFurano/contenido-furano/contenido-furano.component';
import { CorrosividadComponent } from '../../corrosividad/corrosividad/corrosividad.component';
import { FisicoQuimicoComponent } from '../../fisicoQuimico/fisico-quimico/fisico-quimico.component';
import { PasivadorComponent } from '../../pasivador/pasivador/pasivador.component';
import { PcbComponent } from '../../pcb/pcb/pcb.component';
import { BitacoraListarComponent } from '../../bitacora/bitacora-listar/bitacora-listar.component';
import { OrdenEnsayoEditarComponent } from '../orden-ensayo-editar/orden-ensayo-editar.component';
import { LaboratorioServiceService } from '../../../Servicios/Laboratorio-service.service';
import { EquipoServiceService } from '../../../Servicios/Equipo-service.service';
import { equipoDTO } from '../../../Entidades/equipo';
import { laboratistaDTO } from '../../../Entidades/laboratista';
import { laboratorioDTO } from '../../../Entidades/laboratorio';
import { OrdenEnsayoRecepcionComponent } from '../orden-ensayo-recepcion/orden-ensayo-recepcion.component';
import { UsuarioServiceService } from '../../../Servicios/Usuario-service.service';
import { usuarioDTO } from '../../../Entidades/usuario';
import { VerificarOEService } from '../../../Servicios/verificar-oe.service';
import { SkeletonModule } from 'primeng/skeleton';
import { OrdenEnsayoQRComponent } from '../orden-ensayo-qr/orden-ensayo-qr.component';

export interface Analisis {
    nombre: string;
    modulo: string;
    orden: number;
}
@Component({
    selector: 'app-orden-ensayo-detalle',
    imports: [
        ButtonModule,
        InputTextModule,
        ToastModule,
        MessageModule,
        CommonModule,
        BreadcrumbRouterComponent,
        PasivadorComponent,
        PcbComponent,
        TabsModule,
        CardModule,
        HttpClientModule,
        DialogModule,SkeletonModule,OrdenEnsayoQRComponent,
        AgdComponent,
        ContenidoFuranoComponent,
        CorrosividadComponent,
        FisicoQuimicoComponent,
        BitacoraListarComponent
    ],
    providers: [MessageService, DialogService, OrdenEnsayoServiceService, LaboratorioServiceService, EquipoServiceService, UsuarioServiceService],
    templateUrl: './orden-ensayo-detalle.component.html',
    styleUrl: './orden-ensayo-detalle.component.scss'
})
export class OrdenEnsayoDetalleComponent implements OnInit {
    constructor(
        private messageService: MessageService,
        private route: Router,
        private activatedRoute: ActivatedRoute,
        private service: OrdenEnsayoServiceService,
        public dialogService: DialogService,
        private laboratorioService: LaboratorioServiceService,
        private equipoService: EquipoServiceService,
        private usuarioService: UsuarioServiceService
    ) {}
    modelo: ordenEnsayoDTO;
    items: MenuItem[] = [];
    ref: DynamicDialogRef | undefined;
    usuario: usuarioDTO;
    skeleton: boolean = true;
    visibleDelete: boolean = false;
    loading: boolean = false;
    analisis: Analisis[] = [];
    equipo: equipoDTO;
    laboratorio: laboratorioDTO;
    visibleCerrar: boolean = false;
    puedeEditar: boolean = false;
    puedeCerrar: boolean = false;
    ngOnInit(): void {
        this.analisis = [];
        this.activatedRoute.params.subscribe((params) => {
            const id = params['id'];
            this.usuarioService.getUsuarioLogeado().subscribe((usuario: usuarioDTO) => {
                this.service.VerificarEditarOE(usuario.id_Usuario, id).subscribe((puedeEditar) => {
                    this.puedeEditar = puedeEditar;
                   
                });
                this.service.VerificarCerrarOE(usuario.id_Usuario, id).subscribe((puedeCerrar) => {
                    this.puedeCerrar = puedeCerrar;
                });
            });
            this.service.obtenerUno(id).subscribe((data) => {
                console.log(data);
                this.laboratorioService.obtenerUno(data.id_Laboratorio).subscribe((labo) => {
                    this.laboratorio = labo;
                });
                this.equipoService.obtenerUno(data.id_Equipo).subscribe((equipo) => {
                    this.equipo = equipo;
                });

                this.modelo = data;

                this.items = [
                    { label: 'Home', icon: 'pi pi-home', route: '/index', primary: false },
                    { label: 'OrdenEnsayo', icon: 'pi pi-fw pi-user', route: '/ordenEnsayo', primary: false },
                    { label: 'Detalle OE N° ' + data.numeroOrden, icon: 'pi pi-fw pi-user', route: '/ordenEnsayo' + id, primary: true }
                ];
              
            });
            this.service.Ensayos(id).subscribe((ensayo) => {
                for (let i = 0; i < ensayo.length; i++) {
                    if (ensayo[i] != 'Pasivador') {
                        
                    
                    this.analisis.push({ nombre: ensayo[i], modulo: '<app-' + ensayo[i] + ' [id]="modelo.id_OrdenEnsayo"></app-' + ensayo[i] + '>', orden: i });
               }
                }
                  this.skeleton = false;
            });
            
        });

    }
    qr(id: number) {
        this.ref = this.dialogService.open(OrdenEnsayoQRComponent, {
            width: '30%',
            height: '70%',
            data: {
                id: id
            },
            maximizable: true,
           
        });
        this.ref.onClose.subscribe((d) => {
            if (d !== null) {
                this.messageService.add({ severity: 'success', summary: 'Orden Ensayo QR', detail: 'El QR se ha generado correctamente', life: 3000 });
                this.ngOnInit();
            }
        });
    }
    editar(id: number) {
        this.ref = this.dialogService.open(OrdenEnsayoEditarComponent, {
            width: '70%',
            height: '50%',
            data: {
                id: id
            },
            maximizable: true
        });
        this.ref.onClose.subscribe((d) => {
            if (d !== null) {
                this.messageService.add({ severity: 'success', summary: 'Orden Ensayo Editado', detail: 'La orden de Ensayo se ha editado correctamente', life: 3000 });
                this.ngOnInit();
            }
        });
    }
    eliminar(id: number) {
        this.service.borrar(id).subscribe((data) => {
            this.messageService.add({ severity: 'success', summary: 'Orden de Ensayo Eliminado', detail: 'La orden de Ensayo se ha eliminado correctamente', life: 3000 });
        });
        this.ngOnInit();
        this.visibleDelete = false;
    }
    closeDelete() {
        this.visibleDelete = false;
    }
    idDelete: number;
    openDelete(id: number) {
        this.idDelete = id;
        this.visibleDelete = true;
    }
    closeCerrar() {
        this.visibleCerrar = false;
    }
    idCerrar: number;
    openCerrar(id: number) {
        this.idCerrar = id;
        this.visibleCerrar = true;
    }
    cerrar(id: ordenEnsayoDTO) {
        this.usuarioService.getUsuarioLogeado().subscribe((usuario: usuarioDTO) => {
            id.nombreUsuario = usuario.userName;
            this.service.CerrarOrden(id).subscribe((data) => {
                this.messageService.add({ severity: 'success', summary: 'Orden de Ensayo Cerrada', detail: 'La orden de Ensayo se ha cerrado correctamente', life: 3000 });
                this.ngOnInit();
                this.visibleCerrar = false;
            });
        });
    }

    recibirCuba(id: number) {
        this.ref = this.dialogService.open(OrdenEnsayoRecepcionComponent, {
            width: '70%',
            height: '50%',
            data: {
                id: id
            },
            maximizable: true,
            header: 'Recepcion de cuba'
        });
        this.ref.onClose.subscribe((d) => {
            if (d !== null) {
                this.messageService.add({ severity: 'success', summary: 'Orden Ensayo Editado', detail: 'La orden de Ensayo se ha editado correctamente', life: 3000 });
                this.ngOnInit();
            }
        });
    }
}

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
import { equipoDTO, equipoCreacionDTO } from '../../../Entidades/equipo';
import { EquipoCrearComponent } from '../equipo-crear/equipo-crear.component';
import { EquipoEditarComponent } from '../equipo-editar/equipo-editar.component';
import { EquipoServiceService } from '../../../Servicios/Equipo-service.service';

@Component({
  selector: 'app-equipo-oe',
  imports: [ButtonModule, InputTextModule, ToastModule, MessageModule, TabsModule, CardModule, HttpClientModule, DialogModule],
    providers: [MessageService, DialogService, EquipoServiceService],
  templateUrl: './equipo-oe.component.html',
  styleUrl: './equipo-oe.component.scss'
})
export class EquipoOEComponent implements OnInit {
    constructor(
        private messageService: MessageService,
        private route: Router,
        private activatedRoute: ActivatedRoute,
        private service: EquipoServiceService,
        public dialogService: DialogService
    ) {}
    modelo: equipoDTO;
    items: MenuItem[] = [];
    ref: DynamicDialogRef | undefined;
    visibleDelete: boolean = false;
    loading: boolean = false;
    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params) => {
            const id = params['id'];
            
            this.service.obtenerUno(id).subscribe((data) => {
                this.modelo = data;
            });
        });
    }
  
ir(id: number) {
    this.route.navigate(['equipo/', id]);
    }
}

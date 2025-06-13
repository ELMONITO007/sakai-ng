import { Component, Input, input, OnInit } from '@angular/core';
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
import { corrosividadDTO, corrosividadCreacionDTO } from '../../../Entidades/corrosividad';

import { CorrosividadEditarComponent } from '../corrosividad-editar/corrosividad-editar.component';
import { CorrosividadServiceService } from '../../../Servicios/Corrosividad-service.service';
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CheckboxModule } from 'primeng/checkbox';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TooltipModule } from 'primeng/tooltip';
import { UsuarioServiceService } from '../../../Servicios/Usuario-service.service';
import { usuarioDTO } from '../../../Entidades/usuario';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
    selector: 'app-corrosividad-detalle',
    imports: [ButtonModule, CardModule, HttpClientModule, InputTextModule,DialogModule, CheckboxModule,InputNumberModule, FileUploadModule, MatIconModule, FormsModule, ReactiveFormsModule, CommonModule, FloatLabelModule, InputGroupModule, InputGroupAddonModule, TooltipModule],

    providers: [MessageService, DialogService, CorrosividadServiceService,UsuarioServiceService],
    templateUrl: './corrosividad-detalle.component.html',
    styleUrl: './corrosividad-detalle.component.scss'
})
export class CorrosividadDetalleComponent implements OnInit {
    constructor(
        private formBuilder: FormBuilder,

        private service: CorrosividadServiceService,
        private usuarioService: UsuarioServiceService,
    ) {}
    form: FormGroup;
    loading: boolean = false;
    @Input() id: number;
    @Input() puedeEditar: boolean = false;
    modelo: corrosividadDTO;
    usuario: usuarioDTO;
      @Input() estado: string;
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            determinacionCorrosivoCobre: ['', {}],
            determinacionCorrosivoPlata: ['', {}],
            potencialmenteCorrosivoCobre: ['', {}],
            potencialmenteCorrosivoPapel: ['', {}],
            contendioDBDS: ['', {}],
            contenidoPasivador: ['', {}],
            observaciones: ['', {}],

            fechaEnsayo: ['', {}],
            linkArchivo: ['', {}]
        });
        this.service.obtenerTodos(this.id).subscribe((x) => {
            this.modelo = x;
            if (this.modelo.fechaEnsayo != null) {
                this.form.get('determinacionCorrosivoCobre')?.setValue(this.modelo.determinacionCorrosivoCobre);
                this.form.get('determinacionCorrosivoPlata')?.setValue(this.modelo.determinacionCorrosivoPlata);
                this.form.get('potencialmenteCorrosivoCobre')?.setValue(this.modelo.potencialmenteCorrosivoCobre);
                this.form.get('potencialmenteCorrosivoPapel')?.setValue(this.modelo.potencialmenteCorrosivoPapel);
                this.form.get('contendioDBDS')?.setValue(this.modelo.contendioDBDS);
                this.form.get('contenidoPasivador')?.setValue(this.modelo.contenidoPasivador);
                this.form.get('observaciones')?.setValue(this.modelo.observaciones);

                this.form.get('fechaEnsayo')?.setValue(new Date(this.modelo.fechaEnsayo).toISOString().split('T')[0]);
                this.form.get('linkArchivo')?.setValue(this.modelo.linkArchivo);
            }
        });
    }

    link(link: string) {
        window.open('https://drive.google.com/file/d/' + link, '_blank');
    }
    visibleDelete: boolean = false;
    eliminar(id: number) {
        this.usuarioService.getUsuarioLogeado().subscribe((x) => {
            this.usuario = x;
        this.service.borrar(id, this.usuario.email).subscribe((data) => {});
        this.ngOnInit();
        this.visibleDelete = false;
        });
    }
    closeDelete() {
        this.visibleDelete = false;
    }
    idDelete: number = 0;
    openDelete(id: number) {
        this.idDelete = id;
        this.visibleDelete = true;
    }
}

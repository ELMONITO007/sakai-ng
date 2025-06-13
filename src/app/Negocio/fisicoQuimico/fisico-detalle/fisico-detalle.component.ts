import { Component, input, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

import { TooltipModule } from 'primeng/tooltip';
import { fisicoQuimicoDTO } from '../../../Entidades/fisicoQuimico';
import { FisicoQuimicoServiceService } from '../../../Servicios/FisicoQuimico-service.service';

import { MatIconModule } from '@angular/material/icon';
import { InputNumberModule } from 'primeng/inputnumber';

import { DialogModule } from 'primeng/dialog';
import { UsuarioServiceService } from '../../../Servicios/Usuario-service.service';
import { usuarioDTO } from '../../../Entidades/usuario';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
    selector: 'app-fisico-detalle',
    imports: [ButtonModule, CardModule, HttpClientModule, InputTextModule,SkeletonModule, DialogModule, InputNumberModule, MatIconModule, FormsModule, ReactiveFormsModule, CommonModule, FloatLabelModule, InputGroupModule, InputGroupAddonModule, TooltipModule],

    providers: [FisicoQuimicoServiceService, UsuarioServiceService],
    standalone: true,
    templateUrl: './fisico-detalle.component.html',
    styleUrl: './fisico-detalle.component.scss'
})
export class FisicoDetalleComponent implements OnInit {
    constructor(
        private formBuilder: FormBuilder,

        private service: FisicoQuimicoServiceService,
        private usuarioService: UsuarioServiceService
    ) {}
    form: FormGroup;
    @Input() id: number;
    @Input() temperatura: string;
    @Input() puedeEditar: boolean = false;
    loading: boolean = false;
    modelo: fisicoQuimicoDTO;
    usuario: usuarioDTO;
    @Input() estado: string;

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            rigidezDialectrica: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            tangenteDelta: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            tensionInterfasial: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            indiceNeutralizacion: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            contenidoInhibador: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            contenidoParticulas: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            contenidoBifenilos: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            humedadAceite: [
                '',
                {
                    validators: [Validators.required]
                }
            ],

            fechaEnsayo: ['', {}],
            linkArchivo: ['', {}],
            observaciones: ['', {}],
            aguaCorregida: ['', {}],
            aguaRelativa: ['', {}]
        });
        this.service.obtenerTodos(this.id).subscribe((x) => {
            this.modelo = x;
            console.log(this.modelo);

            this.form.get('tensionInterfasial')?.setValue(this.modelo.tensionInterfasial);
            this.form.get('rigidezDialectrica')?.setValue(this.modelo.rigidezDialectrica);
            this.form.get('tangenteDelta')?.setValue(this.modelo.tangenteDelta);
            this.form.get('indiceNeutralizacion')?.setValue(this.modelo.indiceNeutralizacion);
            this.form.get('contenidoInhibador')?.setValue(this.modelo.contenidoInhibador);
            this.form.get('contenidoParticulas')?.setValue(this.modelo.contenidoParticulas);
            this.form.get('contenidoBifenilos')?.setValue(this.modelo.contenidoBifenilos);
            this.form.get('humedadAceite')?.setValue(this.modelo.humedadAceite);

            this.form.get('aguaCorregida')?.setValue(this.modelo.aguaCorregida);

            this.form.get('aguaRelativa')?.setValue(this.modelo.aguaRelativa);

            this.form.get('fechaEnsayo')?.setValue(new Date(this.modelo.fechaEnsayo).toISOString().split('T')[0]);
            this.form.get('linkArchivo')?.setValue(this.modelo.linkArchivo);
            this.form.get('observaciones')?.setValue(this.modelo.observaciones);
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
    diag: any;
    visible3: boolean = false;
    diagnostico(id: number) {
        this.visible3 = true;
        this.loading = true;

        this.service.ObtenerDiagnostico(id).subscribe((x: any) => {
            if (x != null) {
                this.loading = false;
                this.diag = x.candidates[0].content.parts[0].text;
            }
        });
    }
}

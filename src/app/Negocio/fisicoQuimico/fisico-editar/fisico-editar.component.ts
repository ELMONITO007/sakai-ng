import { Component, LOCALE_ID, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { TooltipModule } from 'primeng/tooltip';
import { fisicoQuimicoDTO, fisicoQuimicoCreacionDTO } from '../../../Entidades/fisicoQuimico';
import { FisicoQuimicoServiceService } from '../../../Servicios/FisicoQuimico-service.service';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { InputNumberModule } from 'primeng/inputnumber';

import { FileUploadModule } from 'primeng/fileupload';
import { UsuarioServiceService } from '../../../Servicios/Usuario-service.service';
import { usuarioDTO } from '../../../Entidades/usuario';

export const MY_DATE_FORMATS = {
    parse: {
        dateInput: 'DD/MM/YYYY'
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMMM YYYY',
        dateA11yLabel: 'DD/MM/YYYY',
        monthYearA11yLabel: 'MMMM YYYY'
    }
};
@Component({
    selector: 'app-fisico-editar',
    imports: [ButtonModule, CardModule, HttpClientModule, InputTextModule, FileUploadModule, InputNumberModule, MatIconModule, FormsModule, ReactiveFormsModule, CommonModule, FloatLabelModule, InputGroupModule, InputGroupAddonModule, TooltipModule],

    providers: [FisicoQuimicoServiceService, { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }, UsuarioServiceService],
    standalone: true,
    templateUrl: './fisico-editar.component.html',
    styleUrl: './fisico-editar.component.scss'
})
export class FisicoEditarComponent implements OnInit {
    constructor(
        private formBuilder: FormBuilder,

        private service: FisicoQuimicoServiceService,
        private usuarioService: UsuarioServiceService
    ) {}
    form: FormGroup;
    @Input() id: number;
    @Input() temperatura: string;
    loading: boolean = false;
    modelo: fisicoQuimicoDTO;
    hoy: string;
    ngOnInit(): void {
        const currentYear = new Date().getFullYear();
        const month = new Date().getMonth();
        const day = new Date().getDate();

        this.hoy = new Date(currentYear, month, day).toISOString().split('T')[0];
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
            humedadAceite: [ '',
                {
                    validators: [Validators.required]
                }
            ],
            aguaCorregida: ['', {}],
            aguaRelativa: ['', {}],

            fechaEnsayo: [
                this.hoy,
                {
                    validators: [Validators.required]
                }
            ],
            linkArchivo: ['', {}],
            observaciones: ['', {}]
        });
        this.service.obtenerTodos(this.id).subscribe((x) => {
            this.modelo = x;

            if (
                x.fechaEnsayo != null &&
                x.contenidoBifenilos != null &&
                x.indiceNeutralizacion != null &&
                x.tensionInterfasial != null &&
                x.rigidezDialectrica != null &&
                x.tangenteDelta != null &&
                x.contenidoInhibador != null &&
                x.aguaCorregida != null &&
                x.aguaRelativa != null
            ) {
                var dia = this.modelo.fechaEnsayo.slice(0, 2);
                var mes = this.modelo.fechaEnsayo.slice(3, 5);
                var anio = this.modelo.fechaEnsayo.slice(6, 10);
                var fecha = anio + '/' + mes + '/' + dia;

                this.form.get('rigidezDialectrica')?.setValue(this.modelo.rigidezDialectrica);
                this.form.get('tangenteDelta')?.setValue(this.modelo.tangenteDelta);
                this.form.get('tensionInterfasial')?.setValue(this.modelo.tensionInterfasial);
                this.form.get('indiceNeutralizacion')?.setValue(this.modelo.indiceNeutralizacion);
                this.form.get('contenidoInhibador')?.setValue(this.modelo.contenidoInhibador);
                this.form.get('contenidoParticulas')?.setValue(this.modelo.contenidoParticulas);
                this.form.get('contenidoBifenilos')?.setValue(this.modelo.contenidoBifenilos);
                this.form.get('aguaCorregida')?.setValue(this.modelo.aguaCorregida);
                this.form.get('aguaRelativa')?.setValue(this.modelo.aguaRelativa);
                this.form.get('humedadAceite')?.setValue(this.modelo.humedadAceite);

                this.form.get('fechaEnsayo')?.setValue(new Date(fecha).toISOString().split('T')[0]);
                this.form.get('linkArchivo')?.setValue(this.modelo.linkArchivo);
                this.form.get('observaciones')?.setValue(this.modelo.observaciones);
            }
        });
        this.form.get('aguaRelativa')?.disable();
        this.form.get('aguaCorregida')?.disable();
    }

    temp: number;
    completarAgua() {
        this.temp = Number.parseInt(this.temperatura) * -0.04;
        var exp = Math.exp(this.temp);
        var agua = Number.parseFloat(this.form.get('humedadAceite').value);
        var aguaCorregida = agua * exp * 2.24;
        this.form.get('aguaCorregida').setValue(aguaCorregida);
        //agua corregida
        var t = Number.parseInt(this.temperatura);
        var agua = Number.parseFloat(this.form.get('humedadAceite').value);
        var NPTA = 100;
        var NACHR = 0;
        var tempK = 273.15 + t;
        var exp = 16.2822 - 3698.27 / tempK + 0.02589 * NPTA + 2.0991 * NACHR;

        var WS = Math.exp(exp);
        var hr = (agua / WS) * 1000;
        this.form.get('aguaRelativa').setValue(hr.toFixed(5));
    }
    usario: usuarioDTO;
    onSubmit(id: number) {
        this.loading = true;
        this.usuarioService.getUsuarioLogeado().subscribe((x) => {
            this.usario = x;
            this.modelo = {
                id_FisicoQuimico: id,

                id_OrdenEnsayo: this.id,
                rigidezDialectrica: this.form.get('rigidezDialectrica').value,
                tangenteDelta: this.form.get('tangenteDelta').value,
                tensionInterfasial: this.form.get('tensionInterfasial').value,
                indiceNeutralizacion: this.form.get('indiceNeutralizacion').value,
                contenidoInhibador: this.form.get('contenidoInhibador').value,
                contenidoParticulas: this.form.get('contenidoParticulas').value,
                contenidoBifenilos: this.form.get('contenidoBifenilos').value,
                humedadAceite: this.form.get('humedadAceite').value,

                aguaCorregida: this.form.get('aguaCorregida').value,

                aguaRelativa: this.form.get('aguaRelativa').value,

                fechaSubida: this.usario.email,

                fechaEnsayo: this.form.get('fechaEnsayo').value,

                linkArchivo: this.archivo,
                observaciones: this.form.get('observaciones').value
            };
            this.service.actualizar(this.modelo).subscribe((res) => {
                window.location.reload();
            });
        });
    }
    public fileTmp: any;

    archivoRaw: string;
    uploadedFiles: any[] = [];
    archivo: string;
    onUpload(event) {
        for (let file of event.files) {
            this.fileTmp = {
                fileRaw: file,
                fileName: file.name
            };

            this.convertFile(file).subscribe((base64) => {
                this.archivo = base64;
            });
            this.uploadedFiles.push(file);
        }
    }

    convertFile(file: File): Observable<string> {
        const result = new ReplaySubject<string>(1);
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (event) => result.next(btoa(event.target.result.toString()));
        return result;
    }
}

import { Component,  LOCALE_ID , Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import {  MAT_DATE_FORMATS } from '@angular/material/core';
import { TooltipModule } from 'primeng/tooltip';
import { fisicoQuimicoDTO, fisicoQuimicoCreacionDTO } from '../../../Entidades/fisicoQuimico';
import { FisicoQuimicoServiceService } from '../../../Servicios/FisicoQuimico-service.service';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { InputNumberModule } from 'primeng/inputnumber';

import { FileUploadModule } from 'primeng/fileupload';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
    selector: 'app-fisico-editar',
    imports: [ButtonModule, CardModule, HttpClientModule, InputTextModule, FileUploadModule, InputNumberModule, MatIconModule, FormsModule, ReactiveFormsModule, CommonModule, FloatLabelModule, InputGroupModule, InputGroupAddonModule, TooltipModule],

    providers: [FisicoQuimicoServiceService  ,   { provide: MAT_DATE_FORMATS, useValue:  MY_DATE_FORMATS}],
    standalone: true,
    templateUrl: './fisico-editar.component.html',
    styleUrl: './fisico-editar.component.scss'
})
export class FisicoEditarComponent implements OnInit {
    constructor(
        private formBuilder: FormBuilder,

        private service: FisicoQuimicoServiceService
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
            contenidoAgua: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            observacionesContenidoAgua: ['', {}],
            indiceAcidez: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            observacionesIndiceAcidez: ['', {}],
            inhibidor: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            observacionesInhibidor: ['', {}],
            tensionInterfasial: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            observacionesTensionInterfasial: ['', {}],
            rigidezDielectrica: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            observacionesRigidezDielectrica: ['', {}],
            tangente: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            observacionesTangente: ['', {}],
            color: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            observacionesColor: ['', {}],
            aguaCorregida: [
                '',
                {
                    
                }
            ],
            aguaRelativa: [
                '',
                {
                   
                }
            ],

            fechaEnsayo: [
                this.hoy,
                {
                    validators: [Validators.required]
                }
            ],
            linkArchivo: [
                '',
                {
                   
                }
            ],
            observaciones: ['', {}]
        });
        this.service.obtenerTodos(this.id).subscribe((x) => {
            this.modelo = x;

            if (x.fechaEnsayo != null && x.indiceAcidez != null && x.inhibidor != null && x.tensionInterfasial != null && x.rigidezDielectrica != null && x.tangente != null && x.color != null && x.aguaCorregida != null && x.aguaRelativa != null) {
               var dia = this.modelo.fechaEnsayo.slice(0,2);
                var mes = this.modelo.fechaEnsayo.slice(3,5);
                var anio = this.modelo.fechaEnsayo.slice(6,10);
                var fecha = anio + '/' + mes + '/' + dia;
         
               
                this.form.get('contenidoAgua')?.setValue(this.modelo.contenidoAgua);
                this.form.get('observacionesContenidoAgua')?.setValue(this.modelo.observacionesContenidoAgua);
                this.form.get('indiceAcidez')?.setValue(this.modelo.indiceAcidez);
                this.form.get('observacionesIndiceAcidez')?.setValue(this.modelo.observacionesIndiceAcidez);
                this.form.get('inhibidor')?.setValue(this.modelo.inhibidor);
                this.form.get('observacionesInhibidor')?.setValue(this.modelo.observacionesInhibidor);
                this.form.get('tensionInterfasial')?.setValue(this.modelo.tensionInterfasial);
                this.form.get('observacionesTensionInterfasial')?.setValue(this.modelo.observacionesTensionInterfasial);
                this.form.get('rigidezDielectrica')?.setValue(this.modelo.rigidezDielectrica);
                this.form.get('observacionesRigidezDielectrica')?.setValue(this.modelo.observacionesRigidezDielectrica);
                this.form.get('tangente')?.setValue(this.modelo.tangente);
                this.form.get('observacionesTangente')?.setValue(this.modelo.observacionesTangente);
                this.form.get('color')?.setValue(this.modelo.color);
                this.form.get('observacionesColor')?.setValue(this.modelo.observacionesColor);
                this.form.get('aguaCorregida')?.setValue(this.modelo.aguaCorregida);

                this.form.get('aguaRelativa')?.setValue(this.modelo.aguaRelativa);

                this.form.get('fechaEnsayo')?.setValue( new Date(fecha).toISOString().split('T')[0]);
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
        var agua = Number.parseFloat(this.form.get('contenidoAgua').value);
        var aguaCorregida = agua * exp * 2.24;
        this.form.get('aguaCorregida').setValue(aguaCorregida);
        //agua corregida
        var t= Number.parseInt(this.temperatura);
        var agua= Number.parseFloat(this.form.get('contenidoAgua').value);
        var NPTA=100;
        var NACHR=0;
        var tempK=273.15+t;
        var exp=16.2822 - (3698.27 / tempK) + 0.02589 * NPTA + 2.0991 * NACHR;
    
        var WS=Math.exp(exp);
        var hr=(agua/WS)*1000;
        this.form.get('aguaRelativa').setValue(hr.toFixed(5));
   
    }
    onSubmit(id: number) {
        this.loading = true;
        this.modelo = {
            id_FisicoQuimico: id,

            id_OrdenEnsayo: this.id,

            contenidoAgua: this.form.get('contenidoAgua').value,

            observacionesContenidoAgua: this.form.get('observacionesContenidoAgua').value,

            indiceAcidez: this.form.get('indiceAcidez').value,

            observacionesIndiceAcidez: this.form.get('observacionesIndiceAcidez').value,

            inhibidor: this.form.get('inhibidor').value,

            observacionesInhibidor: this.form.get('observacionesInhibidor').value,

            tensionInterfasial: this.form.get('tensionInterfasial').value,

            observacionesTensionInterfasial: this.form.get('observacionesTensionInterfasial').value,

            rigidezDielectrica: this.form.get('rigidezDielectrica').value,

            observacionesRigidezDielectrica: this.form.get('observacionesRigidezDielectrica').value,

            tangente: this.form.get('tangente').value,

            observacionesTangente: this.form.get('observacionesTangente').value,

            color: this.form.get('color').value,

            observacionesColor: this.form.get('observacionesColor').value,

            aguaCorregida: this.form.get('aguaCorregida').value,

            aguaRelativa: this.form.get('aguaRelativa').value,

            fechaSubida: '',

            fechaEnsayo: this.form.get('fechaEnsayo').value,

            linkArchivo: this.archivo,
            observaciones: this.form.get('observaciones').value
        };
        this.service.actualizar(this.modelo).subscribe((res) => {
            window.location.reload();
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

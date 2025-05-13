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
import { fisicoQuimicoDTO, } from '../../../Entidades/fisicoQuimico';
import { FisicoQuimicoServiceService } from '../../../Servicios/FisicoQuimico-service.service';

import { MatIconModule } from '@angular/material/icon';
import { InputNumberModule } from 'primeng/inputnumber';

import { DialogModule } from 'primeng/dialog';

@Component({
    selector: 'app-fisico-detalle',
    imports: [ButtonModule, CardModule, HttpClientModule, InputTextModule, DialogModule, InputNumberModule, MatIconModule, FormsModule, ReactiveFormsModule, CommonModule, FloatLabelModule, InputGroupModule, InputGroupAddonModule, TooltipModule],

    providers: [FisicoQuimicoServiceService],
    standalone: true,
    templateUrl: './fisico-detalle.component.html',
    styleUrl: './fisico-detalle.component.scss'
})
export class FisicoDetalleComponent implements OnInit {
    constructor(
        private formBuilder: FormBuilder,

        private service: FisicoQuimicoServiceService
    ) {}
    form: FormGroup;
    @Input() id: number;
    @Input() temperatura: string;
    loading: boolean = false;
    modelo: fisicoQuimicoDTO;
    
    ngOnInit(): void {
       
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
            aguaCorregida: ['', {}],
            aguaRelativa: ['', {}],

            fechaEnsayo: [
                '',
                {
                  
                }
            ],
            linkArchivo: ['', {}],
            observaciones: ['', {}]
        });
        this.service.obtenerTodos(this.id).subscribe((x) => {
            this.modelo = x;

        
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
        this.service.borrar(id).subscribe((data) => {});
        this.ngOnInit();
        this.visibleDelete = false;
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

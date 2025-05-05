import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { TooltipModule } from 'primeng/tooltip';
import { laboratorioDTO, laboratorioCreacionDTO } from '../../../Entidades/laboratorio';
import { LaboratorioServiceService } from '../../../Servicios/Laboratorio-service.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-laboratorio-editar',
    imports: [ButtonModule, CardModule, HttpClientModule,MatIconModule, InputTextModule, FormsModule, ReactiveFormsModule, CommonModule, FloatLabelModule, InputGroupModule, InputGroupAddonModule, TooltipModule],
    templateUrl: './laboratorio-editar.component.html',
    styleUrl: './laboratorio-editar.component.scss',
    providers: [LaboratorioServiceService],
    standalone: true
})
export class LaboratorioEditarComponent implements OnInit {
    constructor(
        private formBuilder: FormBuilder,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private service: LaboratorioServiceService
    ) {}
    form: FormGroup;
    loading: boolean = false;
    modelo: laboratorioDTO;
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            nombreLaboratorio: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            telefono: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            direccion: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            email: [
                '',
                {
                    validators: [Validators.required]
                }
            ]
        });
        this.service.obtenerUno(this.config.data['id']).subscribe((x) => {
            this.modelo = x;

            this.form.get('nombreLaboratorio')?.setValue(this.modelo.nombreLaboratorio);
            this.form.get('telefono')?.setValue(this.modelo.telefono);
            this.form.get('direccion')?.setValue(this.modelo.direccion);
            this.form.get('email')?.setValue(this.modelo.email);
        });
    }
    desactivar: boolean = false;
    onSubmit() {
        this.desactivar = true;
        this.modelo = {
            id_Laboratorio:Number.parseInt( this.config.data['id']),

            nombreLaboratorio: this.form.get('nombreLaboratorio').value,

            telefono: this.form.get('telefono').value,

            direccion: this.form.get('direccion').value,

            email: this.form.get('email').value
        };
        this.service.crear(this.modelo).subscribe((res) => {
            this.ref.close(res);
        });
    }
    onCancel() {
        this.ref.close(null);
    }
}

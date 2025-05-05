import { Component, Input, OnInit } from '@angular/core';
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
import { tipoAnalisisDTO, tipoAnalisisCreacionDTO } from '../../../Entidades/tipoAnalisis';
import { TipoAnalisisServiceService } from '../../../Servicios/TipoAnalisis-service.service';
import { MatIconModule } from '@angular/material/icon';
@Component({
    selector: 'app-tipo-analisis-editar',
    imports: [ButtonModule, CardModule,MatIconModule, HttpClientModule, InputTextModule, FormsModule, ReactiveFormsModule, CommonModule, FloatLabelModule, InputGroupModule, InputGroupAddonModule, TooltipModule],
    providers: [TipoAnalisisServiceService],
    standalone: true,
    templateUrl: './tipo-analisis-editar.component.html',
    styleUrl: './tipo-analisis-editar.component.scss'
})
export class TipoAnalisisEditarComponent implements OnInit {
    constructor(
        private formBuilder: FormBuilder,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private service: TipoAnalisisServiceService
    ) {}
    form: FormGroup;
 
    loading: boolean = false;
    modelo: tipoAnalisisDTO;
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            descripcion: [
                '',
                {
                    validators: [Validators.required]
                }
            ]
        });

        this.service.obtenerUno(this.config.data['id']).subscribe((x) => {
            this.modelo = x;

            this.form.get('descripcion')?.setValue(this.modelo.descripcion);
        });
    }
    desactivar: boolean = false;
    onSubmit() {
        this.desactivar = true;
        this.modelo = {
            id_TipoAnalisis: this.form.get('id_TipoAnalisis').value,

            id_Norma: this.form.get('id_Norma').value,

            nombreTipoAnalisis: this.form.get('nombreTipoAnalisis').value,

            descripcion: this.form.get('descripcion').value
        };
        this.service.crear(this.modelo).subscribe((res) => {
            this.ref.close(res);
        });
    }
    onCancel() {
        this.ref.close(null);
    }
}

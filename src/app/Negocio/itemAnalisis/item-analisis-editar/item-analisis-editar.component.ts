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
import { itemAnalisisDTO, itemAnalisisCreacionDTO } from '../../../Entidades/itemAnalisis';
import { ItemAnalisisServiceService } from '../../../Servicios/ItemAnalisis-service.service';

@Component({
    selector: 'app-item-analisis-editar',
    imports: [ButtonModule, CardModule, HttpClientModule, InputTextModule, FormsModule, ReactiveFormsModule, CommonModule, FloatLabelModule, InputGroupModule, InputGroupAddonModule, TooltipModule],
    providers: [ItemAnalisisServiceService],
    templateUrl: './item-analisis-editar.component.html',
    styleUrl: './item-analisis-editar.component.scss',
    standalone: true
})
export class ItemAnalisisEditarComponent implements OnInit {
    constructor(
        private formBuilder: FormBuilder,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private service: ItemAnalisisServiceService
    ) {}
    form: FormGroup;
    loading: boolean = false;
    modelo: itemAnalisisDTO;
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            nombreItemAnalisis: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            abreviatura: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            valorMaximo: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            valorMinimo: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            medida: [
                '',
                {
                    validators: [Validators.required]
                }
            ]
        });
        this.service.obtenerUno(this.config.data['id']).subscribe((x) => {
            this.modelo = x;
            
            this.form.get('nombreItemAnalisis')?.setValue(this.modelo.nombreItemAnalisis);
            this.form.get('abreviatura')?.setValue(this.modelo.abreviatura);
            this.form.get('valorMaximo')?.setValue(this.modelo.valorMaximo);
            this.form.get('valorMinimo')?.setValue(this.modelo.valorMinimo);
            this.form.get('medida')?.setValue(this.modelo.medida);
        });
    }

    onSubmit() {
        this.loading = true;
        this.modelo = {
            id_ItemAnalisis: Number.parseInt(this.config.data['id']),

            id_TipoAnalisis: 0,

            nombreItemAnalisis: this.form.get('nombreItemAnalisis').value,

            abreviatura: this.form.get('abreviatura').value,

            valorMaximo: this.form.get('valorMaximo').value,

            valorMinimo: this.form.get('valorMinimo').value,

            medida: this.form.get('medida').value
        };
        this.service.crear(this.modelo).subscribe((res) => {
            this.ref.close(res);
        });
    }
    onCancel() {
        this.ref.close(null);
    }
}

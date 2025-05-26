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
import { equipoDTO, equipoCreacionDTO } from '../../../Entidades/equipo';
import { EquipoServiceService } from '../../../Servicios/Equipo-service.service';
import { sectorDTO } from '../../../Entidades/sector';
import { SectorServiceService } from '../../../Servicios/Sector-service.service';
import { SelectModule } from 'primeng/select';
import { MatIconModule } from '@angular/material/icon';
import { DatePickerModule } from 'primeng/datepicker';
export interface lista {
    item: string;
}
@Component({
    selector: 'app-equipo-crear',
    imports: [ButtonModule, CardModule, HttpClientModule, DatePickerModule, InputTextModule, SelectModule, MatIconModule, FormsModule, ReactiveFormsModule, CommonModule, FloatLabelModule, InputGroupModule, InputGroupAddonModule, TooltipModule],

    providers: [EquipoServiceService, SectorServiceService],
    standalone: true,
    templateUrl: './equipo-crear.component.html',
    styleUrl: './equipo-crear.component.scss'
})
export class EquipoCrearComponent implements OnInit {
    constructor(
        private formBuilder: FormBuilder,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private service: EquipoServiceService,
        private sectorService: SectorServiceService
    ) {}
    form: FormGroup;
    loading: boolean = false;
    modelo: equipoDTO;
    inhibido: lista[] = [{ item: 'Si' }, { item: 'No' }];
    tipoEquipo: lista[] = [{ item: 'Transformador' }, { item: 'ransformador Corriente' }, { item: 'Reactores' }, { item: 'Transformador Auxiliar' }];
    estado: lista[] = [{ item: 'Reserva Fria' }, { item: 'Reserva Caliente' }, { item: 'Scrapt' }];
    hoy: string;
    tipoAceite: lista[] = [{ item: 'Mineral' }, { item: 'Siliconado' }, { item: 'Sintetico' }, { item: 'Vegetal' }];
    sectores: sectorDTO[] = [];
    ngOnInit(): void {
        const currentYear = new Date().getFullYear();
        const month = new Date().getMonth();
        const day = new Date().getDate();
    
        this.hoy = new Date(currentYear, month, day).toISOString().split('T')[0];
        this.sectorService.obtenerTodos().subscribe((data) => {
            this.sectores = data;
        });
        this.form = this.formBuilder.group({
            tipoEquipo: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            marca: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            modelo: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            numeroSerie: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            fechaInstalacion: [
                this.hoy,
                {
                    validators: [Validators.required]
                }
            ],
            fechaFabricacion: [
                this.hoy,
                {
                    validators: [Validators.required]
                }
            ],
            ubicacion: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            id_Sector: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            detalle: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            estado: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            fase: ['', {}],
            potenciaPrimario: ['', {}],
            potenciaSecundario: ['', {}],
            potenciaTerciario: ['', {}],
            tensionPrimario: ['', {}],
            tensionSecundario: ['', {}],
            tensionTerciario: ['', {}],
            tipoAceite: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            volumenAceite: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            inhibido: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            fechaVencimiento: ['', {}]
        });
       
    }
    desactivar: boolean = false;
    onSubmit() {
        this.desactivar = true;
        this.modelo = {
            id_Equipo: 0,

            codigo: '',

            tipoEquipo: this.form.get('tipoEquipo').value,

            marca: this.form.get('marca').value,

            modelo: this.form.get('modelo').value,

            numeroSerie: this.form.get('numeroSerie').value,

            fechaInstalacion: this.form.get('fechaInstalacion').value,

            fechaFabricacion: this.form.get('fechaFabricacion').value,

            ubicacion: this.form.get('ubicacion').value,

            id_Sector: this.form.get('id_Sector').value,

            detalle: this.form.get('detalle').value,

            estado: this.form.get('estado').value,

            fase: this.form.get('fase').value,

            potenciaPrimario: this.form.get('potenciaPrimario').value,

            potenciaSecundario: this.form.get('potenciaSecundario').value,

            potenciaTerciario: this.form.get('potenciaTerciario').value,

            tensionPrimario: this.form.get('tensionPrimario').value,

            tensionSecundario: this.form.get('tensionSecundario').value,

            tensionTerciario: this.form.get('tensionTerciario').value,

            tipoAceite: this.form.get('tipoAceite').value,

            volumenAceite: this.form.get('volumenAceite').value,

            inhibido: this.form.get('inhibido').value,

            fechaVencimiento: this.form.get('fechaVencimiento').value
        };
        this.service.crear(this.modelo).subscribe((res) => {
            this.ref.close(res);
        });
    }
    onCancel() {
        this.ref.close(null);
    }
}

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
import { sectorDTO, sectorCreacionDTO } from '../../../Entidades/sector';
import { SectorServiceService } from '../../../Servicios/Sector-service.service';
import { LaboratorioServiceService } from '../../../Servicios/Laboratorio-service.service';
import { SelectModule } from 'primeng/select';
import { laboratorioDTO } from '../../../Entidades/laboratorio';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-sector-editar',
    imports: [ButtonModule, CardModule, HttpClientModule, InputTextModule,MatIconModule, FormsModule, ReactiveFormsModule, CommonModule, SelectModule, FloatLabelModule, InputGroupModule, InputGroupAddonModule, TooltipModule],
    templateUrl: './sector-editar.component.html',
    styleUrl: './sector-editar.component.scss',
    providers: [SectorServiceService, LaboratorioServiceService],
    standalone: true
})
export class SectorEditarComponent implements OnInit {
    constructor(
        private formBuilder: FormBuilder,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private laboratorioService: LaboratorioServiceService,
        private service: SectorServiceService
    ) {}
    form: FormGroup;
    loading: boolean = false;
    laboratorios: laboratorioDTO[] = [];
    modelo: sectorDTO;
    ngOnInit(): void {
        this.laboratorioService.obtenerTodos().subscribe((x) => {
            this.laboratorios = x;
        });
        this.form = this.formBuilder.group({
            
            nombreSector: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            coordenada: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
           
            codigo: [
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
            id_Laboratorio: [
                '',
                {
                    validators: [Validators.required]
                }
            ]
        });
        this.service.obtenerUno(this.config.data['id']).subscribe((x) => {
            this.modelo = x;
            this.form.get('id_Sector')?.setValue(this.modelo.id_Sector);
            this.form.get('nombreSector')?.setValue(this.modelo.nombreSector);
            this.form.get('coordenada')?.setValue(this.modelo.coordenada);
        
            this.form.get('codigo')?.setValue(this.modelo.codigo);
            this.form.get('detalle')?.setValue(this.modelo.detalle);
            this.form.get('id_Laboratorio')?.setValue(this.modelo.id_Laboratorio);
        });
    }
    desactivar: boolean = false;
    onSubmit() {
        this.loading = true;
        this.modelo = {
            id_Sector: this.form.get('id_Sector').value,

            nombreSector: this.form.get('nombreSector').value,

            coordenada: this.form.get('coordenada').value,

            pais: this.form.get('pais').value,

            provincia: this.form.get('provincia').value,

            codigo: this.form.get('codigo').value,

            detalle: this.form.get('detalle').value,

            id_Laboratorio: this.form.get('id_Laboratorio').value
        };
        this.service.crear(this.modelo).subscribe((res) => {
            this.ref.close(res);
        });
    }
    onCancel() {
        this.ref.close(null);
    }
}

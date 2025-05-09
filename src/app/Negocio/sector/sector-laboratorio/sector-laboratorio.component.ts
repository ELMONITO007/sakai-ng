import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SelectModule } from 'primeng/select';
import { TooltipModule } from 'primeng/tooltip';
import { SectorServiceService } from '../../../Servicios/Sector-service.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { sectorDTO } from '../../../Entidades/sector';
import { LaboratorioServiceService } from '../../../Servicios/Laboratorio-service.service';
import { laboratorioDTO } from '../../../Entidades/laboratorio';
import { MatIconModule } from '@angular/material/icon';
import { laboratistaDTO } from '../../../Entidades/laboratista';

@Component({
    selector: 'app-sector-laboratorio',
    imports: [ButtonModule, CardModule,MatIconModule, HttpClientModule, SelectModule, CommonModule, FloatLabelModule, InputGroupModule, InputGroupAddonModule, TooltipModule, FormsModule, ReactiveFormsModule],
    standalone: true,
    providers: [SectorServiceService,LaboratorioServiceService],
    templateUrl: './sector-laboratorio.component.html',
    styleUrl: './sector-laboratorio.component.scss'
})
export class SectorLaboratorioComponent implements OnInit {
    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private service: SectorServiceService,
        private formBuilder: FormBuilder,
        private laboratorioService: LaboratorioServiceService
    ) {}
    form: FormGroup;
    loading: boolean = false;
    modelo: sectorDTO;
    laboratorios: laboratorioDTO[] = [];
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            id_Laboratorio: [
                '',
                {
                    validators: [Validators.required]
                }
            ]
        });

        var id = this.config.data['id_Laboratorio'];
        this.laboratorioService.obtenerTodos().subscribe((data:laboratorioDTO[]) => {
            this.laboratorios = data;
            this.laboratorios = this.laboratorios.filter((laboratorio) => laboratorio.id_Laboratorio != id);

            this.loading = false;
        });
    }
    onCancel() {
        this.ref.close(null);
      }
    onSubmit() {
        this.loading = true;
    this.modelo={
      id_Laboratorio:Number.parseInt(this.form.get('id_Laboratorio')?.value),
      id_Sector:this.config.data['id_Sector'],
      nombreSector:'',
      coordenada:'',
      pais:'',
      provincia:'',
      codigo:'',
      detalle:'',
     }
      this.service.actualizarLaboratorio(this.modelo).subscribe((data) => {
        this.ref.close(data);
      });
    }
}

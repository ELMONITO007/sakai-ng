import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import { laboratorioDTO } from '../../../Entidades/laboratorio';
import { SelectModule } from 'primeng/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sector-crear',
  imports: [ButtonModule,
    CardModule,
    HttpClientModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FloatLabelModule,
    InputGroupModule,
    InputGroupAddonModule, TooltipModule,SelectModule,MatIconModule],
  templateUrl: './sector-crear.component.html',
  styleUrl: './sector-crear.component.scss',
  providers: [SectorServiceService],
  standalone: true,
})
export class SectorCrearComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,private laboratorioService:LaboratorioServiceService, private service: SectorServiceService) { }
  form: FormGroup;
  loading: boolean = false;
  laboratorios: laboratorioDTO[] = [];
  modelo: sectorDTO;
  ngOnInit(): void {
    this.form = this.formBuilder.group({


      nombreSector: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      coordenada: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      
      codigo: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      detalle: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      id_Laboratorio: [
        '',
        {
          validators: [Validators.required],
        },
      ],
    }
    )
  }
  desactivar: boolean = false;
  onSubmit() {
    this.desactivar = true;
    this.modelo = {
      id_Sector: 0,

      nombreSector: this.form.get('nombreSector').value,

      coordenada: this.form.get('coordenada').value,

      pais: '',

      provincia:'',

      codigo: this.form.get('codigo').value,

      detalle: this.form.get('detalle').value,

      id_Laboratorio: this.form.get('id_Laboratorio').value,


    }
    this.service.crear(this.modelo).subscribe((res) => {

      this.ref.close(res);
    });
  }
  onCancel() {
    this.ref.close(null);
  }

}

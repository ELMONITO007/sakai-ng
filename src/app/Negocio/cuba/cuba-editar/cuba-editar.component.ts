import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';

import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { TooltipModule } from 'primeng/tooltip';
import { cubaDTO, cubaCreacionDTO } from '../../../Entidades/cuba';
import { CubaServiceService } from '../../../Servicios/Cuba-service.service';
import { LaboratorioServiceService } from '../../../Servicios/Laboratorio-service.service';
import { laboratorioDTO } from '../../../Entidades/laboratorio';
import { MatIconModule } from '@angular/material/icon';
import { SelectModule } from 'primeng/select';
export interface SINO {value: boolean; label: string; }
@Component({
  selector: 'app-cuba-editar',
  imports: [ButtonModule, CardModule, HttpClientModule,MatIconModule,SelectModule, FormsModule, ReactiveFormsModule, CommonModule, FloatLabelModule, InputGroupModule, InputGroupAddonModule, TooltipModule],
  providers: [CubaServiceService, LaboratorioServiceService],
  standalone: true,
  templateUrl: './cuba-editar.component.html',
  styleUrl: './cuba-editar.component.scss'
})
export class CubaEditarComponent implements OnInit {
  constructor(
      private fb: FormBuilder,
      public ref: DynamicDialogRef,
      public config: DynamicDialogConfig,
      private laboraotrioService: LaboratorioServiceService,
      private service: CubaServiceService
  ) {}
  form: FormGroup;
  SINO: SINO[] = [
      { value: true, label: 'Si' },
      { value: false, label: 'No' }
  ];
  loading: boolean = false;
  modelo: cubaDTO;
  laboratorios: laboratorioDTO[] = [];
  ngOnInit(): void {
      this.form = this.fb.group({
          id_Laboratorio: ['', [Validators.required]],
          enUso:  ['', [Validators.required]],
      });
      this.laboraotrioService.obtenerTodos().subscribe((data) => {
          this.laboratorios = data;
      });
      this.service.obtenerUno(this.config.data['id']).subscribe((data) => {
          this.modelo = data;
          this.form.get('id_Laboratorio').setValue(this.modelo.id_Laboratorio);
          this.form.get('enUso').setValue(this.modelo.enUso);
        
         
       
      });
  }
  desactivar: boolean = false;
  onSubmit() {
      this.desactivar = true;
      this.modelo = {
          id_Cuba: Number(this.config.data['id']),

          id_Laboratorio: this.form.get('id_Laboratorio').value,

          codigoCuba: '',

          enUso: this.form.get('enUso').value,
      };
      this.service.actualizar(this.modelo).subscribe((res) => {
          this.ref.close(res);
      });
  }
  onCancel() {
      this.ref.close(null);
  }

}

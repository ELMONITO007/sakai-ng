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

import { UsuarioServiceService } from '../../../Servicios/Usuario-service.service';
import { usuarioDTO } from '../../../Entidades/usuario';

@Component({
  selector: 'app-usuario-crear',
  imports: [ ButtonModule,
    CardModule,
    HttpClientModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FloatLabelModule,
    InputGroupModule,
    InputGroupAddonModule,TooltipModule],
  templateUrl: './usuario-crear.component.html',
  styleUrl: './usuario-crear.component.scss',
  providers: [UsuarioServiceService],
  standalone: true,
})
export class UsuarioCrearComponent implements OnInit {
  form: FormGroup;
  modelo: usuarioDTO;
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private service: UsuarioServiceService
  ) {
    
    
  }
  ngOnInit(): void {

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      contraseña: ['', Validators.required],
      puesto: ['', Validators.required],
    });

  }
  onSubmit() {  
this.loading = true;
    this.modelo = {
      id_Usuario:0, 
       
      nombre:this.form.get('nombre')?.value, 
       
      apellido:this.form.get('apellido')?.value, 
       
      email:this.form.get('email')?.value, 
       
      userName:this.form.get('userName')?.value, 
       
      contraseña:'', 
       
      puesto:this.form.get('puesto')?.value, 
       
      bloqueado:false, 
       
      cantidadIntentos:0, 
       
        }
        this.service.actualizar(this.modelo).subscribe((res) => {
        
          this.ref.close(res);
        });
      }
  
      onCancel() {
        this.ref.close(null);
      }

}

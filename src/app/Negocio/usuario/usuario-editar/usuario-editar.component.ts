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
import { UsuarioServiceService } from '../../../Servicios/Usuario-service.service';
import { usuarioDTO } from '../../../Entidades/usuario';

@Component({
  selector: 'app-usuario-editar',
  imports: [ ButtonModule,
    CardModule,
    HttpClientModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FloatLabelModule,
    InputGroupModule,
    InputGroupAddonModule,],
  templateUrl: './usuario-editar.component.html',
  styleUrl: './usuario-editar.component.scss',
  providers: [UsuarioServiceService],
  standalone: true,
})
export class UsuarioEditarComponent implements OnInit {
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
    this.service.obtenerUno(this.config.data['id']).subscribe((x) => {
      this.modelo = x;
      console.log(this.modelo);
     this.form.get('nombre')?.setValue(this.modelo.nombre);
      this.form.get('apellido')?.setValue(this.modelo.apellido);
      this.form.get('email')?.setValue(this.modelo.email);
      this.form.get('userName')?.setValue(this.modelo.userName);

      this.form.get('puesto')?.setValue(this.modelo.puesto);
    });
  }

  onSubmit() {  
    this.loading = true;

    this.modelo = {
      id_Usuario:Number.parseInt(this.config.data['id']), 
       
      nombre:this.form.get('nombre')?.value, 
       
      apellido:this.form.get('apellido')?.value, 
       
      email:this.form.get('email')?.value, 
       
      userName:this.form.get('userName')?.value, 
       
      contraseña:'', 
       
      puesto:this.form.get('puesto')?.value, 
       
      bloqueado:this.form.get('bloqueado')?.value, 
       
      cantidadIntentos:this.form.get('cantidadIntentos')?.value, 
       
        }
        this.service.actualizar(this.modelo).subscribe((res) => {
        
          this.ref.close(res);
        });
      }
  
      onCancel() {
        this.ref.close(null);
      }

}

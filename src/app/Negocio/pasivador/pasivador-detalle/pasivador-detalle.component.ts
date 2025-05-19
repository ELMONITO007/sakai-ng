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

import { TooltipModule } from 'primeng/tooltip';
import { pasivadorDTO, pasivadorCreacionDTO } from '../../../Entidades/pasivador';
import { PasivadorServiceService } from '../../../Servicios/Pasivador-service.service';
import { MatIconModule } from '@angular/material/icon';
import { Observable, ReplaySubject } from 'rxjs';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { UsuarioServiceService } from '../../../Servicios/Usuario-service.service';
import { usuarioDTO } from '../../../Entidades/usuario';

@Component({
    selector: 'app-pasivador-detalle',
    imports: [
        ButtonModule,
        CardModule,
        HttpClientModule,
        DialogModule,
        FileUploadModule,
        InputNumberModule,
        InputTextModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        FloatLabelModule,
        InputGroupModule,
        MatIconModule,
        InputGroupAddonModule,
        TooltipModule
    ],

    providers: [PasivadorServiceService,UsuarioServiceService],
    standalone: true,
    templateUrl: './pasivador-detalle.component.html',
    styleUrl: './pasivador-detalle.component.scss'
})
export class PasivadorDetalleComponent implements OnInit {
    constructor(
        private formBuilder: FormBuilder,

        private service: PasivadorServiceService,
        private usuarioService: UsuarioServiceService
    ) {}
    form: FormGroup;
    loading: boolean = false;
    modelo: pasivadorDTO;
    usuario:usuarioDTO
      @Input() estado: string;
    @Input() id: number;
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            contenidodePasivador: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            observaciones: ['', {}],

            fechaEnsayo: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            linkArchivo: ['', {}]
        });
        this.service.obtenerTodos(this.id).subscribe((x) => {
            this.modelo = x;
            if (this.modelo.contenidodePasivador != null) {
                this.form.get('contenidodePasivador')?.setValue(this.modelo.contenidodePasivador);
                this.form.get('observaciones')?.setValue(this.modelo.observaciones);
                this.form.get('fechaSubida')?.setValue(this.modelo.fechaSubida);

                this.form.get('linkArchivo')?.setValue(this.modelo.linkArchivo);
            }
        });
    }

    link(link: string) {
        window.open('https://drive.google.com/file/d/' + link, '_blank');
    }
    visibleDelete: boolean = false;
    eliminar(id: number) {
        
      this.usuarioService.getUsuarioLogeado().subscribe((x) => {
            this.usuario = x;
        this.service.borrar(id,this.usuario.email).subscribe((data) => {});
        this.ngOnInit();
        this.visibleDelete = false;
        });
    }
    closeDelete() {
        this.visibleDelete = false;
    }
    idDelete: number = 0;
    openDelete(id: number) {
        this.idDelete = id;
        this.visibleDelete = true;
    }
}

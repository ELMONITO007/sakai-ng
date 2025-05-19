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
import { pcbDTO } from '../../../Entidades/pcb';

import { PCBServiceService } from '../../../Servicios/PCB-service.service';
import { Observable, ReplaySubject } from 'rxjs';
import { FileUploadModule } from 'primeng/fileupload';
import { MatIconModule } from '@angular/material/icon';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { UsuarioServiceService } from '../../../Servicios/Usuario-service.service';
import { usuarioDTO } from '../../../Entidades/usuario';

@Component({
    selector: 'app-pcb-detalle',
    imports: [ButtonModule, CardModule, HttpClientModule,DialogModule,MatIconModule, InputNumberModule, InputTextModule, FileUploadModule, FormsModule, ReactiveFormsModule, CommonModule, FloatLabelModule, InputGroupModule, InputGroupAddonModule, TooltipModule],

    providers: [PCBServiceService,UsuarioServiceService],
    standalone: true,
    templateUrl: './pcb-detalle.component.html',
    styleUrl: './pcb-detalle.component.scss'
})
export class PcbDetalleComponent implements OnInit {
    constructor(
        private formBuilder: FormBuilder,

        private service: PCBServiceService,
        private usuarioService: UsuarioServiceService
    ) {}
    form: FormGroup;
    usuario: usuarioDTO;
    loading: boolean = false;
    @Input() id: number;
    modelo: pcbDTO;
  @Input() estado: string;
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            contenidodePCB: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            observaciones: ['', {}],

            fechaEnsayo: ['', {}],
            linkArchivo: ['', {}]
        });
        this.service.obtenerTodos(this.id).subscribe((x) => {
            this.modelo = x;
            if (x.contenidodePCB != null && x.fechaEnsayo != null) {
                var dia = this.modelo.fechaEnsayo.slice(0, 2);
                var mes = this.modelo.fechaEnsayo.slice(3, 5);
                var anio = this.modelo.fechaEnsayo.slice(6, 10);
                var fecha = anio + '/' + mes + '/' + dia;

                this.form.get('contenidodePCB')?.setValue(this.modelo.contenidodePCB);
                this.form.get('observaciones')?.setValue(this.modelo.observaciones);

                this.form.get('fechaEnsayo')?.setValue(new Date(fecha).toISOString().split('T')[0]);
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

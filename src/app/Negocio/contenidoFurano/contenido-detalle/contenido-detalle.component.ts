import { Component, Input, input, OnInit } from '@angular/core';


import {  MessageService } from 'primeng/api';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { HttpClientModule } from '@angular/common/http';

import { DialogService } from 'primeng/dynamicdialog';

import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { contenidoFuranoDTO } from '../../../Entidades/contenidoFurano';
import { ContenidoFuranoServiceService } from '../../../Servicios/ContenidoFurano-service.service';

import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TooltipModule } from 'primeng/tooltip';
import { UsuarioServiceService } from '../../../Servicios/Usuario-service.service';
import { usuarioDTO } from '../../../Entidades/usuario';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
    selector: 'app-contenido-detalle',
       imports: [ButtonModule, CardModule, HttpClientModule, InputTextModule,DialogModule,ToastModule, MatIconModule,DialogModule,SkeletonModule, 
        FormsModule, ReactiveFormsModule,MatIconModule, CommonModule, FloatLabelModule, InputGroupModule, InputGroupAddonModule, TooltipModule],

    providers: [MessageService, ContenidoFuranoServiceService,UsuarioServiceService],
    templateUrl: './contenido-detalle.component.html',
    styleUrl: './contenido-detalle.component.scss',standalone: true
})
export class ContenidoDetalleComponent implements OnInit {
    constructor(
        private messageService: MessageService,
  
        private service: ContenidoFuranoServiceService,
        public dialogService: DialogService,  private formBuilder: FormBuilder,
        private usuarioService: UsuarioServiceService
    ) {}
    modelo: contenidoFuranoDTO;

    visibleDelete: boolean = false;
 form: FormGroup;
    loading: boolean = false;
    @Input() id: number;
      @Input() puedeEditar: boolean = false;
    usuario: usuarioDTO;
    ngOnInit(): void {
         this.form = this.formBuilder.group({
                    hMF: [
                        '',
                        {}
                          
                    ],
                    aCF: [
                        '',
                        {
                           
                        }
                    ],
                    fOL: [
                        '',
                        {
                           
                        }
                    ],
                    mEF: [
                        '',
                        {
                          
                        }
                    ],
                    fAL: [
                        '',
                        {
                            
                        }
                    ],
        
                    fechaEnsayo: [
                      '',
                        {
                           
                        }
                    ],
                    linkArchivo: ['', {}],
                    observaciones: ['', {}],
                });
        this.service.obtenerTodos(this.id).subscribe((data) => {
            this.modelo = data;
                  console.log(this.modelo);
            if (data.acf != null && data.fol != null && data.mef != null && data.fal != null && data.hmf != null) {
            this.form.patchValue({
                hMF: data?.hmf,
                aCF: data?.acf,
                fOL: data?.fol,
                mEF: data?.mef,
                fAL: data?.fal,
                fechaEnsayo: data?.fechaEnsayo,
                linkArchivo: data?.linkArchivo,
                observaciones: data?.observaciones,
            });
      
              this.form.get('fechaEnsayo')?.setValue(new Date(this.modelo.fechaEnsayo).toISOString().split('T')[0]);
        }
            });
          
       
    }

    eliminar(id: number) {
      this.usuarioService.getUsuarioLogeado().subscribe((x) => {
            this.usuario = x;
        this.service.borrar(id,this.usuario.email).subscribe((data) => {
            this.messageService.add({ severity: 'success', summary: 'ContenidoFurano Eliminado', detail: 'El Analísis de Contenido Furano se ha eliminado correctamente', life: 3000 });
        });
        this.ngOnInit();
        this.visibleDelete = false;
      });
    }
    link(link: string) {
        window.open("https://drive.google.com/file/d/"+link, '_blank');
    }
    closeDelete() {
        this.visibleDelete = false;
    }
    idDelete: number;
    openDelete(id: number) {
        this.idDelete = id;
        this.visibleDelete = true;
    }


     diag: any;
    visible3: boolean = false;
    diagnostico(id: number) {
      this.visible3 = true;
        this.loading = true;
  
      this.service.ObtenerDiagnostico(id).subscribe((x:any) => {
        if (x != null) {
          this.loading = false;
          this.diag = x.candidates[0].content.parts[0].text;
      
        }
      });
    }
}

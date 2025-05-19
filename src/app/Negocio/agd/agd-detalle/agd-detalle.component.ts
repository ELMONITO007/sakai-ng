import { Component, Input, input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MenuItem, MessageService } from 'primeng/api';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TabsModule } from 'primeng/tabs';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { HttpClientModule } from '@angular/common/http';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { agdDTO } from '../../../Entidades/agd';


import { AgdServiceService } from '../../../Servicios/Agd-service.service';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { MatIconModule } from '@angular/material/icon';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioServiceService } from '../../../Servicios/Usuario-service.service';
import { usuarioDTO } from '../../../Entidades/usuario';


@Component({
    selector: 'app-agd-detalle',
    imports: [ FormsModule, ReactiveFormsModule,ButtonModule, InputTextModule, ToastModule, MessageModule, CommonModule, TabsModule, CardModule, HttpClientModule, DialogModule,FloatLabelModule,InputGroupModule,MatIconModule,InputGroupAddonModule,InputNumberModule],
    providers: [MessageService, DialogService, AgdServiceService,UsuarioServiceService],
    standalone: true,
    templateUrl: './agd-detalle.component.html',
    styleUrl: './agd-detalle.component.scss'
})
export class AgdDetalleComponent implements OnInit {
    constructor(
        private messageService: MessageService,

     
        private service: AgdServiceService,
        public dialogService: DialogService,
        private formBuilder: FormBuilder,
        private usuarioService: UsuarioServiceService,
    ) {}
    modelo: agdDTO;
    form: FormGroup;
    ref: DynamicDialogRef | undefined;
    usuario:usuarioDTO;
    visibleDelete: boolean = false;
  @Input() estado: string;
    @Input() id: number ;
    ngOnInit(): void {
         this.form = this.formBuilder.group({
                    hidrogeno: [
                        '',
                        {
                            
                        }
                    ],
                    metano: [
                        '',
                        {
                            
                        }
                    ],
                    etano: [
                        '',
                        {
                           
                        }
                    ],
                    etileno: [
                        '',
                        {
                           
                        }
                    ],
                    acetileno: [
                        '',
                        {
                           
                        }
                    ],
                    monoxidodeCarbono: [
                        '',
                        {
                           
                        }
                    ],
                    dioxidodeCarbono: [
                        '',
                        {
                           
                        }
                    ],
                    nitrogeno: [
                        '',
                        {
                            
                        }
                    ],
                    oxigeno: [
                        '',
                        {
                           
                        }
                    ],
                    gasesTotales: [
                        '',
                        {
                            
                        }
                    ],
                    totaldeGasesCombustibles: [
                        '',
                        {
                           
                        }
                    ],
                    observaciones: [
                        '',
                        {
                           
                        }
                    ],
        
                    fechaEnsayo: [
                    '',
                        {
                          
                        }
                    ],
                    linkArchivo: [
                        '',
                        {
                            
                        }
                    ]
                });
   
            this.service.obtenerTodos(this.id).subscribe((data) => {
                this.modelo = data;
                this.form.patchValue({
                    hidrogeno: this.modelo.hidrogeno,
                    metano: this.modelo.metano,
                    etano: this.modelo.etano,
                    etileno: this.modelo.etileno,
                    acetileno: this.modelo.acetileno,
                    monoxidodeCarbono: this.modelo.monoxidodeCarbono,
                    dioxidodeCarbono: this.modelo.dioxidodeCarbono,
                    nitrogeno: this.modelo.nitrogeno,
                    oxigeno: this.modelo.oxigeno,
                    gasesTotales: this.modelo.gasesTotales,
                    totaldeGasesCombustibles: this.modelo.totaldeGasesCombustibles,
                    observaciones: this.modelo.observaciones,
                    fechaEnsayo: this.modelo.fechaEnsayo,
                    linkArchivo: this.modelo.linkArchivo
                });
                this.form.get('fechaEnsayo')?.setValue(new Date(this.modelo.fechaEnsayo).toISOString().split('T')[0]);
             
            });
        
    }

   
  
link(link: string) {
        window.open("https://drive.google.com/file/d/"+link, '_blank');
    }

    eliminar(id: number) {
    this.usuarioService.getUsuarioLogeado().subscribe((x) => {
            this.usuario = x;
        this.service.borrar(id, this.usuario.email).subscribe((data) => {
            this.messageService.add({ severity: 'success', summary: 'Agd Eliminado', detail: 'El agd se ha eliminado correctamente', life: 3000 });
        });
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

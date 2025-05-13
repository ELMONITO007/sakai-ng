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
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { PCBServiceService } from '../../../Servicios/PCB-service.service';
import { Observable, ReplaySubject } from 'rxjs';
import { FileUploadModule } from 'primeng/fileupload';
import { MatIconModule } from '@angular/material/icon';
import { InputNumberModule } from 'primeng/inputnumber';

export const MY_DATE_FORMATS = {
    parse: {
        dateInput: 'DD/MM/YYYY'
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMMM YYYY',
        dateA11yLabel: 'DD/MM/YYYY',
        monthYearA11yLabel: 'MMMM YYYY'
    }
};

@Component({
    selector: 'app-pcb-editar',
    imports: [ButtonModule, CardModule, HttpClientModule,MatIconModule,InputNumberModule, InputTextModule,FileUploadModule, FormsModule, ReactiveFormsModule, CommonModule, FloatLabelModule, InputGroupModule, InputGroupAddonModule, TooltipModule],

    providers: [PCBServiceService,   { provide: MAT_DATE_FORMATS, useValue:  MY_DATE_FORMATS}],
    standalone: true,
    templateUrl: './pcb-editar.component.html',
    styleUrl: './pcb-editar.component.scss'
})
export class PcbEditarComponent implements OnInit {
    constructor(
        private formBuilder: FormBuilder,
    
        private service: PCBServiceService
    ) {}
    form: FormGroup;
    loading: boolean = false;
    @Input() id: number;
    modelo: pcbDTO;
    hoy:string;
    ngOnInit(): void {
         const currentYear = new Date().getFullYear();
        const month = new Date().getMonth();
        const day = new Date().getDate();

        this.hoy = new Date(currentYear, month, day).toISOString().split('T')[0];
        this.form = this.formBuilder.group({
            contenidodePCB: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            observaciones: ['', {}],

            fechaEnsayo: [ this.hoy , {}],
            linkArchivo: ['', {}]
        });
        this.service.obtenerTodos(this.id).subscribe((x) => {
            this.modelo = x;
            if (x.contenidodePCB!=null && x.fechaEnsayo!=null) {
             
               var dia = this.modelo.fechaEnsayo.slice(0,2);
                var mes = this.modelo.fechaEnsayo.slice(3,5);
                var anio = this.modelo.fechaEnsayo.slice(6,10);
                var fecha = anio + '/' + mes + '/' + dia;
       
           
            this.form.get('contenidodePCB')?.setValue(this.modelo.contenidodePCB);
            this.form.get('observaciones')?.setValue(this.modelo.observaciones);
           
         
           this.form.get('fechaEnsayo')?.setValue( new Date(fecha).toISOString().split('T')[0]);
            this.form.get('linkArchivo')?.setValue(this.modelo.linkArchivo);
                 }
        });
    }

    onSubmit(id: number) {
        this.loading = true;
        this.modelo = {
            id_Pcb: id,

            contenidodePCB: this.form.get('contenidodePCB').value,

            observaciones: this.form.get('observaciones').value,

            id_OrdenEnsayo: this.id,

            fechaSubida: '',

            fechaEnsayo: this.form.get('fechaEnsayo').value,

            linkArchivo: this.archivo,
        };
        this.service.actualizar(this.modelo).subscribe((res) => {
          
          window.location.reload();
        });
    }

    public fileTmp: any;
    
        archivoRaw: string;
        uploadedFiles: any[] = [];
        archivo: string;
        onUpload(event) {
            for (let file of event.files) {
                this.fileTmp = {
                    fileRaw: file,
                    fileName: file.name
                };
    
                this.convertFile(file).subscribe((base64) => {
                    this.archivo = base64;
                });
                this.uploadedFiles.push(file);
            }
        }
    
        convertFile(file: File): Observable<string> {
            const result = new ReplaySubject<string>(1);
            const reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onload = (event) => result.next(btoa(event.target.result.toString()));
            return result;
        }
}

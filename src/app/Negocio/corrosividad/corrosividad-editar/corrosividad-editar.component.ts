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
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { TooltipModule } from 'primeng/tooltip';
import { corrosividadDTO } from '../../../Entidades/corrosividad';
import { CorrosividadServiceService } from '../../../Servicios/Corrosividad-service.service';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs';
import { CheckboxModule } from 'primeng/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { FileUploadModule } from 'primeng/fileupload';

import { DatePickerModule } from 'primeng/datepicker';
import { UsuarioServiceService } from '../../../Servicios/Usuario-service.service';
import { usuarioDTO } from '../../../Entidades/usuario';
import { InputNumber, InputNumberModule } from 'primeng/inputnumber';
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
    selector: 'app-corrosividad-editar',
    imports: [
        ButtonModule,
        CardModule,
        HttpClientModule,
        DatePickerModule,
        InputTextModule,
        CheckboxModule,InputNumberModule,
        FileUploadModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        FloatLabelModule,
        InputGroupModule,
        InputGroupAddonModule,
        TooltipModule
    ],

    providers: [CorrosividadServiceService, { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }, UsuarioServiceService],
    standalone: true,
    templateUrl: './corrosividad-editar.component.html',
    styleUrl: './corrosividad-editar.component.scss'
})
export class CorrosividadEditarComponent implements OnInit {
    constructor(
        private formBuilder: FormBuilder,

        private service: CorrosividadServiceService,
        private usuarioService: UsuarioServiceService
    ) {}
    form: FormGroup;
    loading: boolean = false;
    usuario: usuarioDTO;
    @Input() id: number;
    modelo: corrosividadDTO;
    ngOnInit(): void {
        const currentYear = new Date().getFullYear();
        const month = new Date().getMonth();
        const day = new Date().getDate();

        this.hoy = new Date(currentYear, month, day).toISOString().split('T')[0];
        this.form = this.formBuilder.group({
           determinacionCorrosivoCobre: ['', {}],
            determinacionCorrosivoPlata: ['', {}],
            potencialmenteCorrosivoCobre: ['', {}],
            potencialmenteCorrosivoPapel: ['', {}],
            contendioDBDS: ['', {}],
            contenidoPasivador: ['', {}],
            observaciones: ['', {}],

            fechaEnsayo: [
                this.hoy,
                {
                    validators: [Validators.required]
                }
            ],
            linkArchivo: ['', {}]
        });
        this.service.obtenerTodos(this.id).subscribe((x) => {
            this.modelo = x;
            if (this.modelo.fechaEnsayo != null) {
                var dia = this.modelo.fechaEnsayo.slice(0, 2);
                var mes = this.modelo.fechaEnsayo.slice(3, 5);
                var anio = this.modelo.fechaEnsayo.slice(6, 10);
                var fecha = anio + '/' + mes + '/' + dia;

                this.form.get('fechaEnsayo')?.setValue(new Date(fecha).toISOString().split('T')[0]);
                this.form.get('determinacionCorrosivoCobre')?.setValue(this.modelo.determinacionCorrosivoCobre);
                this.form.get('determinacionCorrosivoPlata')?.setValue(this.modelo.determinacionCorrosivoPlata);
                this.form.get('potencialmenteCorrosivoCobre')?.setValue(this.modelo.potencialmenteCorrosivoCobre);
                this.form.get('potencialmenteCorrosivoPapel')?.setValue(this.modelo.potencialmenteCorrosivoPapel);
                this.form.get('contendioDBDS')?.setValue(this.modelo.contendioDBDS);
                this.form.get('contenidoPasivador')?.setValue(this.modelo.contenidoPasivador);
                this.form.get('linkArchivo')?.setValue(this.modelo.linkArchivo);
                this.form.get('observaciones')?.setValue(this.modelo.observaciones);
               
                this.form.get('fechaEnsayo')?.setValue(new Date(fecha).toISOString().split('T')[0]);

                this.form.get('linkArchivo')?.setValue(this.modelo.linkArchivo);
            }
        });
    }

    onSubmit(id: number) {
        this.loading = true;
        this.usuarioService.getUsuarioLogeado().subscribe((x) => {
            this.usuario = x;

            var astm = this.form.get('determinacionCorrosivoCobre').value;
            var din = this.form.get('determinacionCorrosivoPlata').value;
            var cobre= this.form.get('potencialmenteCorrosivoCobre').value;
            var papel = this.form.get('potencialmenteCorrosivoPapel').value;
            if (astm == '') {
                astm = false;
            }

            if (din == '') {
                din = false;
            }
            if (cobre == '') {
                cobre = false;
            }
            if (papel == '') {
                papel = false;
            }
            this.modelo = {
                id_Corrosividad: id,
                determinacionCorrosivoCobre: astm,
                determinacionCorrosivoPlata:din ,
                potencialmenteCorrosivoCobre: cobre,
                potencialmenteCorrosivoPapel:papel,
                contendioDBDS: Number.parseFloat( this.form.get('contendioDBDS').value),
                contenidoPasivador: Number.parseFloat(this.form.get('contenidoPasivador').value),
                observaciones: this.form.get('observaciones').value,


               

                id_OrdenEnsayo: this.id,

                fechaSubida: this.usuario.email,

                fechaEnsayo: this.form.get('fechaEnsayo').value,

                linkArchivo: this.archivo
            };
            console.log(this.modelo);
            this.service.actualizar(this.modelo).subscribe((res) => {
                window.location.reload();
            });
        });
    }
    hoy: string;
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

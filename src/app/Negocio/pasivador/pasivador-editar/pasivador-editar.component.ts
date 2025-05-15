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
import { pasivadorDTO, pasivadorCreacionDTO } from '../../../Entidades/pasivador';
import { PasivadorServiceService } from '../../../Servicios/Pasivador-service.service';
import { MatIconModule } from '@angular/material/icon';
import { Observable, ReplaySubject } from 'rxjs';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { UsuarioServiceService } from '../../../Servicios/Usuario-service.service';
import { usuarioDTO } from '../../../Entidades/usuario';
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
    selector: 'app-pasivador-editar',
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

    providers: [PasivadorServiceService, { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },UsuarioServiceService],
    standalone: true,
    templateUrl: './pasivador-editar.component.html',
    styleUrl: './pasivador-editar.component.scss'
})
export class PasivadorEditarComponent implements OnInit {
    constructor(
        private formBuilder: FormBuilder,

        private service: PasivadorServiceService,
        private usuarioService: UsuarioServiceService
    ) {}
    form: FormGroup;
    loading: boolean = false;
    modelo: pasivadorDTO;
    @Input() id: number;
    hoy: string;
    ngOnInit(): void {
        const currentYear = new Date().getFullYear();
        const month = new Date().getMonth();
        const day = new Date().getDate();

        this.hoy = new Date(currentYear, month, day).toISOString().split('T')[0];
        this.form = this.formBuilder.group({
            contenidodePasivador: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
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
            if (this.modelo.contenidodePasivador != null) {
                var dia = this.modelo.fechaEnsayo.slice(0, 2);
                var mes = this.modelo.fechaEnsayo.slice(3, 5);
                var anio = this.modelo.fechaEnsayo.slice(6, 10);
                var fecha = anio + '/' + mes + '/' + dia;

                this.form.get('fechaEnsayo')?.setValue(new Date(fecha).toISOString().split('T')[0]);
                this.form.get('contenidodePasivador')?.setValue(this.modelo.contenidodePasivador);
                this.form.get('observaciones')?.setValue(this.modelo.observaciones);
                this.form.get('fechaSubida')?.setValue(this.modelo.fechaSubida);
                this.form.get('fechaEnsayo')?.setValue(new Date(fecha).toISOString().split('T')[0]);
                this.form.get('linkArchivo')?.setValue(this.modelo.linkArchivo);
            }
        });
    }
usuario:usuarioDTO
    onSubmit(id: number) {
        this.usuario= this.usuarioService.getUsuarioLogeado();
        this.loading = true;
        this.modelo = {
            id_Pasivador: id,

            id_OrdenEnsayo: this.id,

            contenidodePasivador: this.form.get('contenidodePasivador').value,

            observaciones: this.form.get('observaciones').value,

            fechaSubida: this.usuario.email,

            fechaEnsayo: this.form.get('fechaEnsayo').value,

            linkArchivo: this.archivo
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

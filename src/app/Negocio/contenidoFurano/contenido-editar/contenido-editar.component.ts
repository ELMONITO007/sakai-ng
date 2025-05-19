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
import { ContenidoFuranoServiceService } from '../../../Servicios/ContenidoFurano-service.service';
import { contenidoFuranoDTO } from '../../../Entidades/contenidoFurano';
import { MatIconModule } from '@angular/material/icon';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Observable, ReplaySubject } from 'rxjs';
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
    selector: 'app-contenido-editar',
    imports: [
        ButtonModule,
        CardModule,
        HttpClientModule,
        InputTextModule,
        FileUploadModule,
        ToastModule,
        FormsModule,
        InputNumberModule,
        ReactiveFormsModule,
        MatIconModule,
        CommonModule,
        FloatLabelModule,
        InputGroupModule,
        InputGroupAddonModule,
        TooltipModule
    ],

    providers: [ContenidoFuranoServiceService, MessageService, { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }, UsuarioServiceService],
    standalone: true,
    templateUrl: './contenido-editar.component.html',
    styleUrl: './contenido-editar.component.scss'
})
export class ContenidoEditarComponent implements OnInit {
    constructor(
        private formBuilder: FormBuilder,

        private service: ContenidoFuranoServiceService,
        private messageService: MessageService,
        private usuarioService: UsuarioServiceService
    ) {}
    form: FormGroup;
    hoy: string;
    loading: boolean = false;
    modelo: contenidoFuranoDTO;
    usuario: usuarioDTO;
    @Input() id: number;
    ngOnInit(): void {
        const currentYear = new Date().getFullYear();
        const month = new Date().getMonth();
        const day = new Date().getDate();

        this.hoy = new Date(currentYear, month, day).toISOString().split('T')[0];
        this.form = this.formBuilder.group({
            hMF: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            aCF: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            fOL: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            mEF: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            fAL: [
                '',
                {
                    validators: [Validators.required]
                }
            ],

            fechaEnsayo: [
                this.hoy,
                {
                    validators: [Validators.required]
                }
            ],
            linkArchivo: ['', {}],
            observaciones: ['', {}]
        });
        this.service.obtenerTodos(this.id).subscribe((x) => {
            this.modelo = x;
            if (this.modelo.acf != null && this.modelo.hmf != null && this.modelo.fol != null && this.modelo.mef != null && this.modelo.fal != null) {
                var dia = this.modelo.fechaEnsayo.slice(0, 2);
                var mes = this.modelo.fechaEnsayo.slice(3, 5);
                var anio = this.modelo.fechaEnsayo.slice(6, 10);
                var fecha = anio + '/' + mes + '/' + dia;

                this.form.get('fechaEnsayo')?.setValue(new Date(fecha).toISOString().split('T')[0]);
                this.form.get('hMF')?.setValue(this.modelo.hmf);
                this.form.get('aCF')?.setValue(this.modelo.acf);
                this.form.get('fOL')?.setValue(this.modelo.fol);
                this.form.get('mEF')?.setValue(this.modelo.mef);
                this.form.get('fAL')?.setValue(this.modelo.fal);

                this.form.get('fechaSubida')?.setValue(this.modelo.fechaSubida);
                this.form.get('fechaEnsayo')?.setValue(new Date(fecha).toISOString().split('T')[0]);
                this.form.get('linkArchivo')?.setValue(this.modelo.linkArchivo);
                this.form.get('observaciones')?.setValue(this.modelo.observaciones);
            }
        });
    }

    onSubmit(id: number) {
        this.loading = true;
        this.usuarioService.getUsuarioLogeado().subscribe((x) => {
            this.usuario = x;
            this.modelo = {
                id_ContenidoFurano: id,

                hmf: this.form.get('hMF').value,

                acf: this.form.get('aCF').value,

                fol: this.form.get('fOL').value,

                mef: this.form.get('mEF').value,

                fal: this.form.get('fAL').value,

                id_OrdenEnsayo: this.id,

                fechaSubida: this.usuario.email,

                fechaEnsayo: this.form.get('fechaEnsayo').value,

                linkArchivo: this.archivo,
                observaciones: this.form.get('observaciones').value
            };
            this.service.actualizar(this.modelo).subscribe((res) => {
                window.location.reload();
            });
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

        this.messageService.add({ severity: 'info', summary: 'Archivo Subido', detail: '', life: 3000 });
    }

    convertFile(file: File): Observable<string> {
        const result = new ReplaySubject<string>(1);
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (event) => result.next(btoa(event.target.result.toString()));
        return result;
    }
}

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
import { agdDTO, agdCreacionDTO } from '../../../Entidades/agd';
import { AgdServiceService } from '../../../Servicios/Agd-service.service';
import { MessageService } from 'primeng/api';
import { RefreshIcon } from 'primeng/icons';
import { MatIconModule } from '@angular/material/icon';
import { Observable, ReplaySubject } from 'rxjs';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumber } from 'primeng/inputnumber';
import { usuarioDTO } from '../../../Entidades/usuario';
import { UsuarioServiceService } from '../../../Servicios/Usuario-service.service';
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
    selector: 'app-agd-editar',
    imports: [ButtonModule, CardModule, HttpClientModule, InputTextModule, InputNumber, FileUploadModule, MatIconModule, FormsModule, ReactiveFormsModule, CommonModule, FloatLabelModule, InputGroupModule, InputGroupAddonModule, TooltipModule],
    templateUrl: './agd-editar.component.html',
    styleUrl: './agd-editar.component.scss',
    providers: [AgdServiceService, MessageService, { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }, UsuarioServiceService],
    standalone: true
})
export class AgdEditarComponent implements OnInit {
    constructor(
        private formBuilder: FormBuilder,

        private service: AgdServiceService,
        private messageService: MessageService,
        private usuarioService: UsuarioServiceService
    ) {}
    form: FormGroup;
    @Input() id: number;
    loading: boolean = false;
    modelo: agdDTO;
    ngOnInit(): void {
        const currentYear = new Date().getFullYear();
        const month = new Date().getMonth();
        const day = new Date().getDate();

        this.hoy = new Date(currentYear, month, day).toISOString().split('T')[0];
        this.form = this.formBuilder.group({
            hidrogeno: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            metano: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            etano: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            etileno: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            acetileno: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            monoxidodeCarbono: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            dioxidodeCarbono: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            nitrogeno: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            oxigeno: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            gasesTotales: [
                '0',
                {
                    validators: [Validators.required]
                }
            ],
            totaldeGasesCombustibles: [
                '0',
                {
                    validators: [Validators.required]
                }
            ],
            observaciones: [
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
            linkArchivo: ['', {}]
        });
        this.form.get('gasesTotales')?.disable();
        this.form.get('totaldeGasesCombustibles')?.disable();
        this.service.obtenerTodos(this.id).subscribe((x) => {
            this.modelo = x;

            if (this.modelo.hidrogeno == null && this.modelo.oxigeno == null && this.modelo.nitrogeno == null && this.modelo.dioxidodeCarbono == null) {
                this.editar = false;
            } else {
                var dia = this.modelo.fechaEnsayo.slice(0, 2);
                var mes = this.modelo.fechaEnsayo.slice(3, 5);
                var anio = this.modelo.fechaEnsayo.slice(6, 10);
                var fecha = anio + '/' + mes + '/' + dia;

                this.form.get('fechaEnsayo')?.setValue(new Date(fecha).toISOString().split('T')[0]);
                this.form.get('hidrogeno')?.setValue(this.modelo?.hidrogeno);
                this.form.get('metano')?.setValue(this.modelo?.metano);
                this.form.get('etano')?.setValue(this.modelo?.etano);
                this.form.get('etileno')?.setValue(this.modelo?.etileno);
                this.form.get('acetileno')?.setValue(this.modelo?.acetileno);
                this.form.get('monoxidodeCarbono')?.setValue(this.modelo?.monoxidodeCarbono);
                this.form.get('dioxidodeCarbono')?.setValue(this.modelo?.dioxidodeCarbono);
                this.form.get('nitrogeno')?.setValue(this.modelo?.nitrogeno);
                this.form.get('oxigeno')?.setValue(this.modelo?.oxigeno);
                this.form.get('gasesTotales')?.setValue(this.modelo?.gasesTotales);
                this.form.get('totaldeGasesCombustibles')?.setValue(this.modelo?.totaldeGasesCombustibles);
                this.form.get('observaciones')?.setValue(this.modelo?.observaciones);
                this.form.get('fechaSubida')?.setValue(this.modelo?.fechaSubida);
                this.form.get('fechaEnsayo')?.setValue(new Date(fecha).toISOString().split('T')[0]);
                this.form.get('linkArchivo')?.setValue(this.modelo?.linkArchivo);
            }
        });
    }
    usuario: usuarioDTO;
    onSubmit(id: number) {
        this.loading = true;
        this.usuarioService.getUsuarioLogeado().subscribe((x) => {
            this.usuario = x;
            this.modelo = {
                id_Agd: id,

                id_OrdenEnsayo: this.id,

                hidrogeno: this.form.get('hidrogeno').value,

                metano: this.form.get('metano').value,

                etano: this.form.get('etano').value,

                etileno: this.form.get('etileno').value,

                acetileno: this.form.get('acetileno').value,

                monoxidodeCarbono: this.form.get('monoxidodeCarbono').value,

                dioxidodeCarbono: this.form.get('dioxidodeCarbono').value,

                nitrogeno: this.form.get('nitrogeno').value,

                oxigeno: this.form.get('oxigeno').value,

                gasesTotales: this.form.get('gasesTotales').value,

                totaldeGasesCombustibles: this.form.get('totaldeGasesCombustibles').value,

                observaciones: this.form.get('observaciones').value,

                fechaSubida: this.usuario.email,

                fechaEnsayo: this.form.get('fechaEnsayo').value,

                linkArchivo: this.archivo
            };
            this.service.actualizar(this.modelo).subscribe((res) => {
                this.messageService.add({ severity: 'success', summary: 'Agd Creada', detail: 'La agd se ha actualizado correctamente' });
                window.location.reload();
            });
        });
    }
    editar: boolean = true;
    onCancel() {
        this.editar = false;
    }

    CalcularGasesTotales() {
        let hidrogeno = this.form.get('hidrogeno').value;
        let oxigeno = this.form.get('oxigeno').value;
        let nitrogeno = this.form.get('nitrogeno').value;
        let metano = this.form.get('metano').value;
        let etileno = this.form.get('etileno').value;
        let etano = this.form.get('etano').value;

        let acetileno = this.form.get('acetileno').value;
        let monoxidodeCarbono = this.form.get('monoxidodeCarbono').value;
        let dioxidodeCarbono = this.form.get('dioxidodeCarbono').value;

        let gasesTotales = Number(hidrogeno) + Number(metano) + Number(etano) + Number(etileno) + Number(acetileno) + Number(monoxidodeCarbono);
        this.form.get('gasesTotales')?.setValue(gasesTotales);

        let totaldeGasesCombustibles = (Number(hidrogeno) + Number(metano) + Number(etano) + Number(etileno) + Number(acetileno) + Number(monoxidodeCarbono) + Number(dioxidodeCarbono) + Number(oxigeno) + Number(nitrogeno)) / 10000;
        totaldeGasesCombustibles = Math.round(totaldeGasesCombustibles * 1000) / 1000;
        this.form.get('totaldeGasesCombustibles')?.setValue(totaldeGasesCombustibles);
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

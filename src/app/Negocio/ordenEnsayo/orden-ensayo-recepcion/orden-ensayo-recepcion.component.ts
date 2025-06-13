import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { TooltipModule } from 'primeng/tooltip';
import { ordenEnsayoDTO, ordenEnsayoCreacionDTO } from '../../../Entidades/ordenEnsayo';
import { OrdenEnsayoServiceService } from '../../../Servicios/OrdenEnsayo-service.service';
import { CubaServiceService } from '../../../Servicios/Cuba-service.service';
import { cubaDTO } from '../../../Entidades/cuba';
import { UsuarioServiceService } from '../../../Servicios/Usuario-service.service';
import { usuarioDTO } from '../../../Entidades/usuario';
import { InputNumber } from 'primeng/inputnumber';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { SelectModule } from 'primeng/select';
interface ubicacion {
    tipo: string;
}
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
    selector: 'app-orden-ensayo-recepcion',
    imports: [ButtonModule, CardModule, SelectModule, HttpClientModule, InputNumber, MatIconModule, InputTextModule, FormsModule, ReactiveFormsModule, CommonModule, FloatLabelModule, InputGroupModule, InputGroupAddonModule, TooltipModule],
    templateUrl: './orden-ensayo-recepcion.component.html',
    styleUrl: './orden-ensayo-recepcion.component.scss',
    providers: [OrdenEnsayoServiceService, CubaServiceService, UsuarioServiceService, { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
    standalone: true
})
export class OrdenEnsayoRecepcionComponent implements OnInit {
    constructor(
        private formBuilder: FormBuilder,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private service: OrdenEnsayoServiceService,
        private cubaService: CubaServiceService,
        private usuarioService: UsuarioServiceService
    ) {}
    form: FormGroup;
    loading: boolean = false;
    modelo: ordenEnsayoDTO;
    cuba: cubaDTO[] = [];
    ubicacion: ubicacion[] = [{ tipo: 'Superior' }, { tipo: 'Inferior' }];

    hoy: string;

    ngOnInit(): void {
        const currentYear = new Date().getFullYear();
        const month = new Date().getMonth();
        const day = new Date().getDate();

        this.hoy = new Date(currentYear, month, day).toISOString().split('T')[0];
   
        this.form = this.formBuilder.group({
            temperatura: ['', Validators.required],
            observaciones: [''],
            fechaExtraccion: [new Date(currentYear, month, day).toISOString().split('T')[0], Validators.required],
            tomaEnsayo: ['', Validators.required]
        });

        this.service.obtenerUno(this.config.data['id']).subscribe((orden: ordenEnsayoDTO) => {
            this.modelo = orden;
            this.cubaService.obtenerPorPadre(orden.id_Laboratorio).subscribe((cuba: cubaDTO[]) => {
                this.cuba = cuba;
            });

            this.form.get('observaciones').setValue(orden.observaciones);
            this.form.get('temperatura').setValue(orden.temperatura);
            if (orden.fechaExtraccion != null) {
                var dia = orden.fechaExtraccion.slice(0, 2);
                var mes = orden.fechaExtraccion.slice(3, 5);
                var anio = orden.fechaExtraccion.slice(6, 10);
                var fecha = anio + '/' + mes + '/' + dia;
                this.form.get('fechaExtraccion')?.setValue(new Date(fecha).toISOString().split('T')[0]);
            }
            this.form.get('tomaEnsayo').setValue(orden.tomaEnsayo);
        });
    }

    // Additional methods and properties can be added here
    usuario: usuarioDTO;

    t: string;
    cancel(){
        this.ref.close(null);
    }
    onSubmit() {
        this.loading = true;
        this.usuarioService.getUsuarioLogeado().subscribe((usuario: usuarioDTO) => {
            this.service.obtenerUno(this.config.data['id']).subscribe((orden: ordenEnsayoDTO) => {
                this.t = this.form.get('temperatura').value;
                this.modelo = orden;
                this.usuario = usuario;
                this.modelo.observaciones = this.form.get('observaciones').value;

                this.modelo.temperatura = this.t.toString();
                this.modelo.nombreUsuario = this.usuario.userName;
                this.modelo.emailLaboratista = this.usuario.email;
                this.modelo.fechaExtraccion = this.form.get('fechaExtraccion').value;
                this.modelo.tomaEnsayo = this.form.get('tomaEnsayo').value;
                console.log(this.modelo);
                this.service.RecibirCuba(this.modelo).subscribe((orden: ordenEnsayoDTO) => {
                    this.ref.close(orden);
                });
            });
        });
    }
}

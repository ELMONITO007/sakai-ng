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
import { ordenEnsayoDTO, ordenEnsayoCreacionDTO, ensayosRealizarDTO } from '../../../Entidades/ordenEnsayo';
import { OrdenEnsayoServiceService } from '../../../Servicios/OrdenEnsayo-service.service';
import { SectorServiceService } from '../../../Servicios/Sector-service.service';
import { EquipoServiceService } from '../../../Servicios/Equipo-service.service';
import { sectorDTO } from '../../../Entidades/sector';
import { equipoDTO } from '../../../Entidades/equipo';
import { UsuarioServiceService } from '../../../Servicios/Usuario-service.service';
import { usuarioDTO } from '../../../Entidades/usuario';
import { CubaServiceService } from '../../../Servicios/Cuba-service.service';
import { cubaDTO } from '../../../Entidades/cuba';
import { MatIconModule } from '@angular/material/icon';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
interface tipoAceite {
    tipo: string;
}
@Component({
    selector: 'app-orden-ensayo-editar',
    imports: [ButtonModule, CardModule, HttpClientModule, InputTextModule, FormsModule, SelectModule, ReactiveFormsModule, CheckboxModule, CommonModule, MatIconModule, FloatLabelModule, InputGroupModule, InputGroupAddonModule, TooltipModule],
    providers: [OrdenEnsayoServiceService, SectorServiceService, EquipoServiceService, UsuarioServiceService, CubaServiceService],
    standalone: true,
    templateUrl: './orden-ensayo-editar.component.html',
    styleUrl: './orden-ensayo-editar.component.scss'
})
export class OrdenEnsayoEditarComponent implements OnInit {
    constructor(
        private formBuilder: FormBuilder,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private service: OrdenEnsayoServiceService,
        private sectorService: SectorServiceService,
        private equipoService: EquipoServiceService,
        private usuarioService: UsuarioServiceService,
        private cubaService: CubaServiceService
    ) {}
    form: FormGroup;
    loading: boolean = false;
    cuba: cubaDTO[] = [];
    ensayosRealizar: ensayosRealizarDTO;
    modelo: ordenEnsayoDTO;
    sectores: sectorDTO[] = [];
    equipos: equipoDTO[] = [];
    tipo: tipoAceite[] = [{ tipo: 'Mineral' }, { tipo: 'Vegetal' }, { tipo: 'Sintetico' }];
    inhibido: tipoAceite[] = [{ tipo: 'Si' }, { tipo: 'No' }];
    usuario: usuarioDTO;
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            sector: [
                '',
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
            tipoAceite: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            inhibido: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            id_Equipo: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            cuba: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            emailLaboratista:'',
            id_Laboratorio:'',
        });
        this.form.get('id_Equipo').disable();
        this.form.get('cuba').disable();

        this.service.obtenerUno(this.config.data['id']).subscribe((x) => {
            this.modelo = x;
                   console.log(this.modelo.nombreSector);
            
            this.form.get('id_Equipo')?.setValue(this.modelo.id_Equipo);
            this.form.get('id_Laboratorio')?.setValue(this.modelo.id_Laboratorio);
                     
            this.form.get('cuba')?.setValue(this.modelo.cuba);
           
            this.form.get('observaciones')?.setValue(this.modelo.observaciones);
            this.form.get('tipoAceite')?.setValue(this.modelo.tipoAceite);
            this.form.get('inhibido')?.setValue(this.modelo.inhibido);
          

               
            this.form.get('emailLaboratista')?.setValue(this.modelo.emailLaboratista);
              this.sectorService.obtenerTodos().subscribe((y) => {
            this.sectores = y.filter((x) => x.detalle == this.modelo.nombreSector);
            this.sector=this.sectores[0];
            this.form.get('sector')?.setValue(this.sector.id_Sector);
          
            this.sectores = y;
          
        });
        });

      
    }
    sector: sectorDTO;

    todosAnalisis: boolean = true;
    cambiarTodosAnalisis() {
        var todos = this.form.get('todos').value;
        if (todos == 'Si') {
            this.todosAnalisis = true;
        } else {
            this.todosAnalisis = false;
        }
        console.log(this.todosAnalisis);
    }

    obtenerEquipos() {
        this.form.get('id_Equipo').enable();
        this.form.get('cuba').enable();
        var id = this.form.get('sector').value;
        this.equipoService.obtenerPorPadre(id).subscribe((x) => {
            this.equipos = x;
        });
        this.sectorService.obtenerUno(id).subscribe((x) => {
            this.cubaService.ReadLaboratorio(x.id_Laboratorio).subscribe((y) => {
                this.cuba = y.filter((x) => x.enUso == false);
            });
        });
    }
    onCancel() {
        this.ref.close(null);
    }

    onSubmit() {
        this.loading = true;
        this.usuarioService.getUsuarioLogeado().subscribe((x) => {
            this.usuario = x;
            var id = this.form.get('sector').value;
            this.sectorService.obtenerUno(id).subscribe((x) => {
                this.sector = x;
                this.modelo = {
                    id_OrdenEnsayo: 0,

                    numeroOrden: 0,

                    id_Equipo: Number.parseInt(this.form.get('id_Equipo').value),

                    id_Laboratorio: this.sector.id_Laboratorio,

                    nombreUsuario: this.usuario.userName,

                    emailUsuario: this.usuario.email,

                    fechaCreacion: '',

                    fechaExtraccion: '',

                    fechaFinalizacion: '',

                    fechaPedidoExtraccion: '',

                    cuba: this.form.get('cuba').value,

                    temperatura: '0',

                    observaciones: this.form.get('observaciones').value,

                    tipoAceite: this.form.get('tipoAceite').value,

                    inhibido: this.form.get('inhibido').value,

                    motivo: '',

                    tipoSolicitud: '',

                    urgencia: '',

                    nombreSector: this.sector.detalle,

                    pais: this.sector.pais,

                    provincia: this.sector.provincia,

                    estado: 'En Proceso',

                    nombreLaboratista: '',

                    usuarioLaboratista: '',

                    emailLaboratista: '',
                    tomaEnsayo: ''
                };

                this.service.actualizar(this.modelo).subscribe((res) => {
                    this.ref.close(this.modelo);
                });
            });
        });
    }
}

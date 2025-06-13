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
import { EquipoOEComponent } from '../../equipo/equipo-oe/equipo-oe.component';
import { Router } from '@angular/router';

interface tipoAceite {
    tipo: string;
}

@Component({
    selector: 'app-orden-ensayo-crear',
    imports: [
        ButtonModule,
    
        CardModule,
        HttpClientModule,
        InputTextModule,
        FormsModule,
        SelectModule,
        ReactiveFormsModule,
        CheckboxModule,
        CommonModule,
        MatIconModule,
        FloatLabelModule,
        InputGroupModule,
        InputGroupAddonModule,
        TooltipModule
    ],
    templateUrl: './orden-ensayo-crear.component.html',
    styleUrl: './orden-ensayo-crear.component.scss',
    providers: [OrdenEnsayoServiceService, SectorServiceService, EquipoServiceService, UsuarioServiceService, CubaServiceService],
    standalone: true
})
export class OrdenEnsayoCrearComponent implements OnInit {
    constructor(
        private formBuilder: FormBuilder,
        private route: Router,
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
    ensayos: tipoAceite[] = [{ tipo: 'Si' }, { tipo: 'FS-AGD-Corrosividad' }, { tipo: 'No' }];
    usuario: usuarioDTO;
    ngOnInit(): void {
          this.verIr = false;
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
            todos: [
                '',
                {
                    validators: [Validators.required]
                }
            ],
            fisico: ['', {}],
            corrosividad: ['', {}],
            agd: ['', {}],
            pasivador: ['', {}],
            contenidoFurano: ['', {}],
            pcb: ['', {}],
            tipoEquipo: '',
            marca: '',
            modelo: '',
            serie: ''
        });
        this.form.get('id_Equipo').disable();
        this.form.get('cuba').disable();
        this.form.get('tipoEquipo').disable();
        this.form.get('marca').disable();
        this.form.get('modelo').disable();
        this.form.get('serie').disable();

        this.sectorService.obtenerTodos().subscribe((y) => {
            this.sectores = y;
        });
    }
    sector: sectorDTO;
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

                this.service.crear(this.modelo).subscribe((res) => {
                    var todos = this.form.get('todos').value;
                    if (todos == 'Si') {
                        this.ensayosRealizar = {
                            id_Ensayo: res.id_OrdenEnsayo,
                            lista: ['agd', 'fisicoquimico', 'corrosividad', 'contenidoFurano']
                        };
                    }
                    if (todos == 'FS-AGD-Corrosividad') {
                        this.ensayosRealizar = {
                            id_Ensayo: res.id_OrdenEnsayo,
                            lista: ['agd', 'fisicoquimico', 'corrosividad']
                        };
                    }
                    if (todos == 'No') {
                        this.ensayosRealizar = {
                            id_Ensayo: res.id_OrdenEnsayo,
                            lista: []
                        };
                        if (this.form.get('fisico').value == true) {
                            this.ensayosRealizar.lista.push('fisicoquimico');
                        }
                        if (this.form.get('corrosividad').value == true) {
                            this.ensayosRealizar.lista.push('corrosividad');
                        }
                        if (this.form.get('agd').value == true) {
                            this.ensayosRealizar.lista.push('agd');
                        }
                        if (this.form.get('pasivador').value == true) {
                            this.ensayosRealizar.lista.push('pasivador');
                        }
                        if (this.form.get('contenidoFurano').value == true) {
                            this.ensayosRealizar.lista.push('contenidoFurano');
                        }
                        if (this.form.get('pcb').value == true) {
                            this.ensayosRealizar.lista.push('pcb');
                        }
                    }
                    console.log(this.ensayosRealizar);
                    this.service.crearEnsayos(this.ensayosRealizar).subscribe((x) => {
                        this.ref.close(res);
                    });
                });
            });
        });
    }
    todosAnalisis: boolean = true;
    id_Equipo: number;  
    cambiarTodosAnalisis() {
        var todos = this.form.get('todos').value;
        if (todos == 'Si') {
            this.todosAnalisis = true;
        } if (todos == 'No') {
            this.todosAnalisis = false;
        }
         if (todos == 'FS-AGD-Corrosividad') {
            this.todosAnalisis = true;
         }
        
     
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
    equipo: equipoDTO;
    verIr: boolean = false;
    completarEquipo() {
        this.verIr = true;
        var id = this.form.get('id_Equipo').value;
        this.id_Equipo = id;
        console.log(id);
        this.equipoService.obtenerUno(id).subscribe((x) => {
            this.equipo = x;
            this.form.get('tipoEquipo').setValue(this.equipo.tipoEquipo);
            this.form.get('marca').setValue(this.equipo.marca);
            this.form.get('modelo').setValue(this.equipo.modelo);
            this.form.get('serie').setValue(this.equipo.numeroSerie);
        });
    }
    ir(id: number) {
        this.route.navigate(['equipo/', id]);
        this.ref.close(null);
    }
    onCancel() {
        this.ref.close(null);
    }
}

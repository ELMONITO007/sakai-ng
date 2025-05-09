import { Component, OnInit, ViewChild } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { Table, TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UsuarioServiceService } from '../../../Servicios/Usuario-service.service';
import { usuarioDTO } from '../../../Entidades/usuario';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { LaboratistaServiceService } from '../../../Servicios/Laboratista-service.service';
import { laboratistaDTO } from '../../../Entidades/laboratista';

@Component({
    selector: 'app-laboratista-crear',
    standalone: true,
    imports: [
        ButtonModule,
        CardModule,
        TableModule,
        CommonModule,
        HttpClientModule,
        ToolbarModule,
        InputGroupModule,
        DialogModule,
        InputGroupAddonModule,
        TooltipModule,
        IconFieldModule,
        FormsModule,
        ReactiveFormsModule,
        InputIconModule,
        InputTextModule
    ],
    providers: [UsuarioServiceService, DialogService, LaboratistaServiceService],
    templateUrl: './laboratista-crear.component.html',
    styleUrl: './laboratista-crear.component.scss'
})
export class LaboratistaCrearComponent implements OnInit {
    constructor(
        private usuarioService: UsuarioServiceService,
        private service: LaboratistaServiceService,
        public config: DynamicDialogConfig,
        private formBuilder: FormBuilder,
        public ref: DynamicDialogRef
    ) {}
    modelo: laboratistaDTO;
    usuarios: usuarioDTO[] = [];

    selectedProduct: usuarioDTO;
    visible: boolean = false;
    loading: boolean = false;
    @ViewChild('dt1') dt1!: Table;

    ngOnInit(): void {
        this.usuarioService.ReadLaboratistaFaltante(this.config.data['id']).subscribe((data) => {
            this.usuarios = data;
        });
    }

    usuarioSeleccionado: usuarioDTO;
    onSelect(usuario: usuarioDTO) {
        this.usuarioSeleccionado = usuario;

        this.visible = true;
    }
    closeDialog() {
        this.visible = false;
    }
    exportCSV() {
        this.dt1.exportCSV();
    }
    applyGlobalFilterToDataTable(event: Event, table: Table) {
        const filterValue = (event.target as HTMLInputElement).value;
        table.filterGlobal(filterValue, 'contains');
    }
    clear(table: Table) {
        table.clear();
    }
cerrar() {
    this.ref.close(null);
}
    onSubmit(id: number) {
        this.loading = true;

        this.modelo = {
            id_Laboratorio: Number(this.config.data['id']),
            id_Usuario: id,
            id_Laboratista: 0
        };
        this.service.crear(this.modelo).subscribe((data) => {
            this.loading = false;
            this.ref.close(1);
        });
    }
}

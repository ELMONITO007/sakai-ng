import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';

import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { CalendarModule } from 'primeng/calendar';
import { RippleModule } from 'primeng/ripple';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SkeletonModule } from 'primeng/skeleton';
import { DropdownModule } from 'primeng/dropdown';
import { SplitterModule } from 'primeng/splitter';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SplitButtonModule } from 'primeng/splitbutton';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MenuItem } from 'primeng/api';
import { TableModule } from 'primeng/table';
interface tipo {
    tipo: string;
    key: string;
}
interface cociente {
    fecha: string;
    equipo: string;
    laboratorio: string;
    cociente: string;
}
@Component({
    selector: 'app-agd-cocientes',
    imports: [
        ChartModule,
        InputTextModule,
        DividerModule,
        ButtonModule,
        CardModule,
        CommonModule,
        CheckboxModule,

        AccordionModule,
        TabViewModule,
        CalendarModule,
        RippleModule,
        RadioButtonModule,
        InputSwitchModule,
        SkeletonModule,
        DropdownModule,
        SplitterModule,
        ReactiveFormsModule,
        ToolbarModule,
        SplitterModule,
        IconFieldModule,
        InputIconModule,
        SplitButtonModule,
        FloatLabelModule,TableModule
    ],
    templateUrl: './agd-cocientes.component.html',
    styleUrl: './agd-cocientes.component.scss'
})
export class AgdCocientesComponent implements OnInit {
    constructor(private formBuilder: FormBuilder) {}
    formGroup: FormGroup;
    modelo: cociente[] = [];
    cambio: boolean = false;

    relaciones: any[] = [
        { name: 'CO2/CO', key: 'A' },
        { name: 'CH4/H2', key: 'R' },
        { name: 'C2H4/C2H6', key: 'X' }
    ];
    categories: any[] = [
        { name: 'CO2', key: 'A' },
        { name: 'CO', key: 'M' },
        { name: 'H2', key: 'P' },
        { name: 'CH4', key: 'R' },

        { name: 'C2H6', key: 'X' },
        { name: 'C2H4', key: 'Y' },
        { name: 'C2H2', key: 'Z' },
        { name: 'TGC', key: 'm' }
    ];

    tipoEquipo: tipo[] = [
        { tipo: 'Transformadores', key: 'A' },
        { tipo: 'Transformador Corriente', key: 'M' },
        { tipo: 'Reactores', key: 'P' }
    ];
    cociente1: cociente[] = [
        {
            fecha: '12/10/2023',
            equipo: 'Transformadores',
            laboratorio: 'Laboratorio 1',
            cociente: '1.5'
        },
        {
            fecha: '15/10/2023',
            equipo: 'Transformador Corriente',
            laboratorio: 'Laboratorio 2',
            cociente: '1.8'
        },
        {
            fecha: '20/10/2023',
            equipo: 'Reactores',
            laboratorio: 'Laboratorio 3',
            cociente: '1.2'
        },
        {
            fecha: '29/10/2023',
            equipo: 'Transformadores',
            laboratorio: 'Laboratorio 1',
            cociente: '3.6'
        },
        {
            fecha: '13/11/2024',
            equipo: 'Transformador Corriente',
            laboratorio: 'Laboratorio 2',
            cociente: '1.9'
        },
        {
            fecha: '24/11/2024',
            equipo: 'Reactores',
            laboratorio: 'Laboratorio 3',
            cociente: '1.5'
        }
    ];
    cociente2: cociente[] = [
        {
            fecha: '12/10/2024',
            equipo: 'Transformadores',
            laboratorio: 'Laboratorio 1',
            cociente: '2.5'
        },
        {
            fecha: '15/10/2024',
            equipo: 'Transformador Corriente',
            laboratorio: 'Laboratorio 2',
            cociente: '2.8'
        },
        {
            fecha: '20/10/2024',
            equipo: 'Reactores',
            laboratorio: 'Laboratorio 3',
            cociente: '2.2'
        },
        {
            fecha: '29/10/2024',
            equipo: 'Transformadores',
            laboratorio: 'Laboratorio 1',
            cociente: '1.6'
        }
    ];
    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            verTodo: '',
            agregar: ''
        });
        this.modelo = this.cociente1;
    }
    onChange() {
        if (this.cambio) {
            this.modelo = this.cociente2;
            this.cambio = false;
        } else {
            this.modelo = this.cociente1;
            this.cambio = true;
        }
    }
    print() {window.print();}  
}

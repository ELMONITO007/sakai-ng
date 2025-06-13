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
interface tabla {
    fecha: string;
    equipo: string;
    volumen: number;
    valor: number;
}
@Component({
    selector: 'app-agd-elevado',
    imports: [
        ChartModule,
        InputTextModule,
        DividerModule,
        ButtonModule,
        CardModule,
        CommonModule,
        CheckboxModule,
        TableModule,

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
        IconFieldModule,
        InputIconModule,
        SplitButtonModule,
        FloatLabelModule
    ],
    templateUrl: './agd-elevado.component.html',
    styleUrl: './agd-elevado.component.scss'
})
export class AgdElevadoComponent implements OnInit {
    constructor(private formBuilder: FormBuilder) {}
    formGroup: FormGroup;

    tabla: tabla[] = [
        {
            fecha: '08/02/2024',
            equipo: 'T2MA',
            volumen: 11800,
            valor: 9000
        },
        {
            fecha: '25/07/2023',
            equipo: 'T6EZ',
            volumen: 56405,
            valor: 8500
        },
        {
            fecha: '18/08/2011',
            equipo: 'TR43937',
            volumen: 62785,
            valor: 8000
        },
        {
            fecha: '12/01/2023',
            equipo: 'T2RO',
            volumen: 55000,
            valor: 7500
        },
        {
            fecha: '12/02/2023',
            equipo: 'T4EZ',
            volumen: 56405,
            valor: 7000
        },
        {
            fecha: '12/03/2023',
            equipo: 'T1RS',
            volumen: 78000,
            valor: 6500
        },
        {
            fecha: '12/04/2023',
            equipo: 'T1RM',

            volumen: 50000,
            valor: 6000
        },
        {
            fecha: '12/05/2023',
            equipo: 'T1PT',
            volumen: 123700,
            valor: 5500
        },
        {
            fecha: '12/06/2023',
            equipo: 'TR43938',
            volumen: 62800,
            valor: 5000
        },
        {
            fecha: '12/07/2023',
            equipo: 'T1AT',
            volumen: 59000,

            valor: 4500
        }
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
        { tipo: 'Reactores', key: 'P' },
        { tipo: 'Transformador Auxiliar', key: 'R' }
    ];
    Fabricante: tipo[] = [
        { tipo: 'Todos', key: 'A' },
        { tipo: 'Fabricante A', key: 'M' },
        { tipo: 'Fabricante B', key: 'P' },
        { tipo: 'Fabricante C', key: 'R' }
    ];
    Sector: tipo[] = [
        { tipo: 'Todos', key: 'A' },
        { tipo: 'Sector A', key: 'M' },
        { tipo: 'Sector B', key: 'P' },
        { tipo: 'Sector C', key: 'R' }
    ];

    ngOnInit(): void {
        this.CO2Seleccionado = false;

        this.COSeleccionado = false;
        this.H2Seleccionado = false;
        this.CH4Seleccionado = false;
        this.C2H6Seleccionado = false;
        this.C2H4Seleccionado = false;
        this.C2H2Seleccionado = false;
        this.TGCSeleccionado = false;
        this.formGroup = this.formBuilder.group({
            verTodo: '',
            agregar: ''
        });
    }
    ir(tipo: string) {
        console.log(tipo);
    }

    tipoTransacciones: tipo[] = [];

    CO2Seleccionado: boolean = false;
    COSeleccionado: boolean = false;
    H2Seleccionado: boolean = false;
    CH4Seleccionado: boolean = false;
    C2H6Seleccionado: boolean = false;
    C2H4Seleccionado: boolean = false;
    C2H2Seleccionado: boolean = false;
    TGCSeleccionado: boolean = false;

    onChange() {
    var seleccionado = this.formGroup.get('verTodo')?.value;
    console.log(seleccionado);
    if (seleccionado == 'CO2') {
      this.CO2Seleccionado = true;
      this.COSeleccionado = false;
      this.H2Seleccionado = false;
      this.CH4Seleccionado = false;
      this.C2H6Seleccionado = false;
      this.C2H4Seleccionado = false;
      this.C2H2Seleccionado = false;
      this.TGCSeleccionado = false;
      this.GraficoCO2();
    }
    if (seleccionado == 'CO') {
      this.CO2Seleccionado = false;
      this.COSeleccionado = true;
      this.H2Seleccionado = false;
      this.CH4Seleccionado = false;
      this.C2H6Seleccionado = false;
      this.C2H4Seleccionado = false;
      this.C2H2Seleccionado = false;
      this.TGCSeleccionado = false;
      this.GraficoCO();
    }
    if (seleccionado == 'H2') {
      this.CO2Seleccionado = false;
      this.COSeleccionado = false;
      this.H2Seleccionado = true;
      this.CH4Seleccionado = false;
      this.C2H6Seleccionado = false;
      this.C2H4Seleccionado = false;
      this.C2H2Seleccionado = false;
      this.TGCSeleccionado = false;
      this.GraficoH2();
    }
    if (seleccionado == 'CH4') {
      this.CO2Seleccionado = false;
      this.COSeleccionado = false;
      this.H2Seleccionado = false;
      this.CH4Seleccionado = true;
      this.C2H6Seleccionado = false;
      this.C2H4Seleccionado = false;
      this.C2H2Seleccionado = false;
      this.TGCSeleccionado = false;
      this.GraficoCH4();
    }
    if (seleccionado == 'C2H6') {
      this.CO2Seleccionado = false;
      this.COSeleccionado = false;
      this.H2Seleccionado = false;
      this.CH4Seleccionado = false;
      this.C2H6Seleccionado = true;
      this.C2H4Seleccionado = false;
      this.C2H2Seleccionado = false;
      this.TGCSeleccionado = false;
      this.GraficoC2H6();
    }
    if (seleccionado == 'C2H4') {
      this.CO2Seleccionado = false;
      this.COSeleccionado = false;
      this.H2Seleccionado = false;
      this.CH4Seleccionado = false;
      this.C2H6Seleccionado = false;
      this.C2H4Seleccionado = true;
      this.C2H2Seleccionado = false;
      this.TGCSeleccionado = false;
      this.GraficoC2H4();
    }
    if (seleccionado == 'C2H2') {
      this.CO2Seleccionado = false;
      this.COSeleccionado = false;
      this.H2Seleccionado = false;
      this.CH4Seleccionado = false;
      this.C2H6Seleccionado = false;
      this.C2H4Seleccionado = false;
      this.C2H2Seleccionado = true;
      this.TGCSeleccionado = false;
      this.GraficoC2H2();
    }
    if (seleccionado == 'TGC') {
      this.CO2Seleccionado = false;
      this.COSeleccionado = false;
      this.H2Seleccionado = false;
      this.CH4Seleccionado = false;
      this.C2H6Seleccionado = false;
      this.C2H4Seleccionado = false;
      this.C2H2Seleccionado = false;
      this.TGCSeleccionado = true;
      this.GraficoTGC();
    }
  }
  print() {window.print();}
  AgregarGrafico() {
 const element = this.formGroup.get('agregar')?.value;

    if (element == 'CO') {
      this.CO2Seleccionado = true;
      this.COSeleccionado = true;
      this.H2Seleccionado = false;
      this.CH4Seleccionado = false;
      this.C2H6Seleccionado = false;
      this.C2H4Seleccionado = false;
      this.C2H2Seleccionado = false;
      this.TGCSeleccionado = false;
      this.GraficoCO();
    }
    if (element == 'H2') {
      this.CO2Seleccionado = true;
      this.COSeleccionado = false;
      this.H2Seleccionado = true;
      this.CH4Seleccionado = false;
      this.C2H6Seleccionado = false;
      this.C2H4Seleccionado = false;
      this.C2H2Seleccionado = false;
      this.TGCSeleccionado = false;
      this.GraficoH2();
    }
    if (element == 'CH4') {
      this.CO2Seleccionado = true;
      this.COSeleccionado = false;
      this.H2Seleccionado = false;
      this.CH4Seleccionado = true;
      this.C2H6Seleccionado = false;
      this.C2H4Seleccionado = false;
      this.C2H2Seleccionado = false;
      this.TGCSeleccionado = false;
      this.GraficoCH4();
    }
    if (element == 'C2H6') {
      this.CO2Seleccionado = true;
      this.COSeleccionado = false;
      this.H2Seleccionado = false;
      this.CH4Seleccionado = false;
      this.C2H6Seleccionado = true;
      this.C2H4Seleccionado = false;
      this.C2H2Seleccionado = false;
      this.TGCSeleccionado = false;
      this.GraficoC2H6();
    }
    if (element == 'C2H4') {
      this.CO2Seleccionado = true;
      this.COSeleccionado = false;
      this.H2Seleccionado = false;
      this.CH4Seleccionado = false;
      this.C2H6Seleccionado = false;
      this.C2H4Seleccionado = true;
      this.C2H2Seleccionado = false;
      this.TGCSeleccionado = false;
      this.GraficoC2H4();
    }
    if (element == 'C2H2') {
      this.CO2Seleccionado = true;
      this.COSeleccionado = false;
      this.H2Seleccionado = false;
      this.CH4Seleccionado = false;
      this.C2H6Seleccionado = false;
      this.C2H4Seleccionado = false;
      this.C2H2Seleccionado = true;
      this.TGCSeleccionado = false;
      this.GraficoC2H2();
    }
    if (element == 'TGC') {
      this.CO2Seleccionado = true;
      this.COSeleccionado = false;
      this.H2Seleccionado = false;
      this.CH4Seleccionado = false;
      this.C2H6Seleccionado = false;
      this.C2H4Seleccionado = false;
      this.C2H2Seleccionado = false;
      this.TGCSeleccionado = true;
      this.GraficoTGC();
    }
  }
  basicDataCO2: any;
  basicDataCO: any;
  basicDataH2: any;
  basicDataCH4: any;
  basicDataC2H6: any;
  basicDataC2H4: any;
  basicDataC2H2: any;
  basicDataTGC: any;

  basicOptionsCO2: any;
  basicOptionsCO: any;
  basicOptionsH2: any;
  basicOptionsCH4: any;
  basicOptionsC2H6: any;
  basicOptionsC2H4: any;
  basicOptionsC2H2: any;
  basicOptionsTGC: any;
  GraficoCO2() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.basicDataCO2 = {
      labels: [
        'T2MA',
        'T6EZ',
        'TR43937',
        'T2RO',
        'T4EZ',
        'T1RS',
        'T1RM',
        'T1PT',
        'TR43938',
        'T1AT',
      ],
      datasets: [
        {
          type: 'bar',
          label: 'Valor CO2',
          backgroundColor: documentStyle.getPropertyValue('--red-500'),
          borderColor: documentStyle.getPropertyValue('--red-500'),
          data: [9000, 8500, 8000, 7500, 7000, 6500, 6000, 5500, 5000, 4500],
        },
      ],
    };

    this.basicOptionsCO2 = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false,
        },
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          stacked: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }

  GraficoCO() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.basicDataCO = {
      labels: [
        '33,96',
        '67,92',
        '101,88',
        '135,84',
        '169,8',
        '203,76',
        '237,72',
        '271,68',
        '305,64',
        '339,6',
      ],
      datasets: [
        {
          label: 'CO',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: [14, 16, 20, 18, 25, 17, 3, 9, 9, 6],
        },
      ],
    };

    this.basicOptionsCO = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }

  GraficoH2() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.basicDataH2 = {
      labels: [
        '4.44',
        '8.88',
        '13.32',
        '17.76',

        '22.2',
        '26.64',
        '31.08',
        '35.52',
        '39.96',
        '44.4',
      ],
      datasets: [
        {
          label: 'H2',
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
          borderColor: documentStyle.getPropertyValue('--green-500'),
          data: [170, 180, 50, 25, 25, 20, 15, 10, 5, 2],
        },
      ],
    };

    this.basicOptionsH2 = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }
  GraficoCH4() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.basicDataCH4 = {
      labels: [
        '17.64',
        '35.28',
        '52.92',
        '70.56',
        '88.2',
        '105.84',
        '123.48',
        '141.12',
        '158.76',
        '176.4',
      ],
      datasets: [
        {
          label: 'CH4',
          backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
          borderColor: documentStyle.getPropertyValue('--yellow-500'),
          data: [380, 50, 25, 20, 15, 10, 9, 5, 4, 1],
        },
      ],
    };

    this.basicOptionsCH4 = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }
  GraficoC2H6() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.basicDataC2H6 = {
      labels: [
        '12.96',
        '25.92',
        '38.88',
        '51.84',
        '64.8',

        '77.76',
        '90.72',
        '103.68',
        '116.64',

        '129.6',
      ],
      datasets: [
        {
          label: 'C2H6',
          backgroundColor: documentStyle.getPropertyValue('--orange-500'),
          borderColor: documentStyle.getPropertyValue('--orange-500'),
          data: [390, 50, 25, 20, 15, 10, 9, 5, 4, 1],
        },
      ],
    };

    this.basicOptionsC2H6 = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }

  GraficoC2H4() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.basicDataC2H4 = {
      labels: [
        '3.48',
        '6.96',
        '10.44',
        '13.92',
        '17.4',
        '20.88',
        '24.36',
        '27.84',
        '31.32',
        '34.8',
      ],
      datasets: [
        {
          label: 'C2H4',
          backgroundColor: documentStyle.getPropertyValue('--purple-500'),
          borderColor: documentStyle.getPropertyValue('--purple-500'),
          data: [350, 45, 30, 25, 18, 12, 10, 6, 3, 1],
        },
      ],
    };

    this.basicOptionsC2H4 = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }
  GraficoC2H2() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.basicDataC2H2 = {
      labels: [
        '0.01',
        '0.02',

        '0.04',
        '0.05',
        '0.06',
        '0.07',
        '0.08',

        '0.1',
        '0.11',
        '0.12',
      ],
      datasets: [
        {
          label: 'C2H2',
          backgroundColor: documentStyle.getPropertyValue('--pink-500'),
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          data: [1, 0, 0, 0, 0, 0, 0, 0, 420, 0],
        },
      ],
    };

    this.basicOptionsC2H2 = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }
  GraficoTGC() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.basicDataTGC = {
      labels: [
        '157.33',
        '314.16',
        '471.0',
        '627.83',
        '784.66',
        '941.5',
        '1098.33',
        '1255.16',
        '1412.0',
        '1568.83',
      ],
      datasets: [
        {
          label: 'TGC',
          backgroundColor: documentStyle.getPropertyValue('--teal-500'),
          borderColor: documentStyle.getPropertyValue('--teal-500'),
          data: [125, 60, 50, 48, 50, 35, 30, 25, 15, 10],
        },
      ],
    };

    this.basicOptionsTGC = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }
}

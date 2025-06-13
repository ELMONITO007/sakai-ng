import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { SkeletonModule } from 'primeng/skeleton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SplitterModule } from 'primeng/splitter';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';


interface tipo {
  tipo: string;
  key: string;
}
interface fisicoquimico {
  fecha: string;
  equipo: string;
  volumen: string;
  valor: string;
}
@Component({
  selector: 'app-fisico-quimico',
  imports: [ ChartModule,TableModule,
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
          FloatLabelModule],
  templateUrl: './fisico-quimico.component.html',
  styleUrl: './fisico-quimico.component.scss'
})
export class FisicoQuimicoComponent  implements OnInit {
  form: FormGroup;
  modelo: fisicoquimico[] = [];
  basicDataAcidez: any;
  basicOptionsAcidez: any;
  basicDataInhibidor: any;
  basicOptionsInhibidor: any;
  basicDataTension: any;
  basicData: any;
  basicOptions: any;
  basicData2: any;
  basicOptions2: any;
  basicOptionsTension: any;
  basicDataAgua: any;
  basicOptionsAgua: any;
  basicDataTangenta: any;
  basicOptionsTangenta: any;
  basicDataRigidez: any;
  basicOptionsRigidez: any;

  acidezSeleccionado: boolean = false;
  inhibidorSeleccionado: boolean = false;
  tensionSeleccionado: boolean = false;
  aguaSeleccionado: boolean = false;
  tangentaSeleccionado: boolean = false;
  rigidezSeleccionado: boolean = false;

  categories: tipo[] = [
    { tipo: 'Acidez', key: 'A' },
    { tipo: 'Inhibidor', key: 'M' },
    { tipo: 'Tensión Interfacial', key: 'P' },
    { tipo: 'Agua', key: 'R' },

    { tipo: 'Tangenta Delta', key: 'X' },
    { tipo: 'Rigidez Dialectrica', key: 'Y' },
  ];
  tipoEquipo: tipo[] = [
    { tipo: 'Transformadores', key: 'A' },
    { tipo: 'Transformador Corriente', key: 'M' },
    { tipo: 'Reactores', key: 'P' },
    { tipo: 'Transformador Auxiliar', key: 'R' },
  ];
  Sector: tipo[] = [
    { tipo: 'Sector A', key: 'M' },
    { tipo: 'Sector B', key: 'P' },
    { tipo: 'Sector C', key: 'R' },
    { tipo: 'Todos', key: 'A' },
  ];
  fisicoquimico1: fisicoquimico[] = [
    { fecha: '05/01/2024', equipo: 'AGTRA', volumen: '11600', valor: '0.08' },
    { fecha: '25/07/2023', equipo: 'T4EZ', volumen: '56405', valor: '0.05' },
    {
      fecha: '01/06/2015',
      equipo: 'TR7008522',
      volumen: '88764',
      valor: '0.08',
    },
    { fecha: '19/05/2014', equipo: 'TR44230', volumen: '93500', valor: '0.05' },
  ];
  fisicoquimico2: fisicoquimico[] = [
    { fecha: '15/12/2014', equipo: 'TRRO', volumen: '56000', valor: '0.2' },
  ];
  fisicoquimico3: fisicoquimico[] = [
    { fecha: '05/01/2024', equipo: 'AGTRA', volumen: '11600', valor: '22' },
    { fecha: '05/09/2023', equipo: 'T1RM', volumen: '50000', valor: '29.9' },
    { fecha: '19/05/2014', equipo: 'TR44230', volumen: '93500', valor: '25.5' },
    { fecha: '01/08/2011', equipo: 'TR43937', volumen: '62785', valor: '26.5' },
  ];
  fisicoquimico4: fisicoquimico[] = [
    {
      fecha: '18/09/2008',
      equipo: 'TR14053',
      volumen: '61000',
      valor: '50.27',
    },
    { fecha: '17/02/2003', equipo: 'T3XRE T', volumen: '0', valor: '36.26' },
    { fecha: '17/02/2003', equipo: 'T3XRE S', volumen: '0', valor: '33.79' },
    { fecha: '18/07/2000', equipo: 'T3XRE R', volumen: '0', valor: '20.6' },
  ];
  fisicoquimico5: fisicoquimico[] = [
    { fecha: '14/02/2003', equipo: 'T3XRE T', volumen: '0', valor: '0.2791' },
    { fecha: '05/01/2024', equipo: 'AGTRA', volumen: '11600', valor: '0.1207' },
    { fecha: '09/07/1997', equipo: 'T3XRE R', volumen: '0', valor: '0.0967' },
    {
      fecha: '17/02/2003',
      equipo: 'T3XRE S',
      volumen: '120300',
      valor: '0.0816',
    },
  ];
  fisicoquimico6: fisicoquimico[] = [
    { fecha: '15/12/2014', equipo: 'TRRO', volumen: '56000', valor: '67' },
    { fecha: '01/06/2015', equipo: 'TR7008522', volumen: '88764', valor: '64' },
    { fecha: '08/01/2024', equipo: 'T1RO', volumen: '63000', valor: '63' },
    { fecha: '13/05/2013', equipo: 'TR44230', volumen: '93500', valor: '62' },
  ];
    constructor(private formBuilder: FormBuilder) {}
   formGroup: FormGroup;
   
  

  ngOnInit(): void {
    this.modelo = this.fisicoquimico1;
    this.form = this.formBuilder.group({
   categories:'',
    });
    this.modelo=[];
  }

  onChange() {
    var selectedCategory =this.form.get('categories')?.value;
    console.log(selectedCategory);

    if (selectedCategory == 'A') {
      this.modelo = this.fisicoquimico1;
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue(
        '--text-color-secondary'
      );
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      this.basicData = {
        labels: [
          'T3XRE R',
          'T3XRE T',
          'T3XRE S',
          'TR43937',
          'TR43938',
          'TR43939',
          'TR7008522',
          'AGTRA',
          'TR44230',
          'T4EZ',
        ],
        datasets: [
          {
            label: 'Acidez',
            backgroundColor: documentStyle.getPropertyValue('--blue-500'),
            borderColor: documentStyle.getPropertyValue('--blue-500'),
            data: [0.3, 0.22, 0.21, 0.1, 0.1, 0.1, 0.08, 0.08, 0.05, 0.05],
          },
        ],
      };

      this.basicOptions = {
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
    if (selectedCategory == 'M') {
      this.modelo = this.fisicoquimico2;
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue(
        '--text-color-secondary'
      );
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      this.basicData = {
        labels: [
          'T1ESPS',
          'T1ESPT',
          'T2ESP',
          'T9EZS',
          'T9EZR',
          'T1RO',
          'T3RA',
          'T2LA',
          'TRZB0001',
          'TRRO',
        ],
        datasets: [
          {
            label: 'Inhibidor',
            backgroundColor: documentStyle.getPropertyValue('--red-500'),
            borderColor: documentStyle.getPropertyValue('--red-500'),
            data: [0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.2],
          },
        ],
      };

      this.basicOptions = {
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
    if (selectedCategory == 'P') {
      this.modelo = this.fisicoquimico3;
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue(
        '--text-color-secondary'
      );
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      this.basicData = {
        labels: [
          'T1RS',
          'T1RM',
          'TR44230',
          'TR43939',
          'TR43938',
          'TR13937',
          'AGTRA',
          'T3XRE S',
          'T3XRE T',
          'T3XRE R',
        ],
        datasets: [
          {
            label: 'Tensión Interfacial',
            backgroundColor: documentStyle.getPropertyValue('--green-500'),
            borderColor: documentStyle.getPropertyValue('--green-500'),
            data: [29.9, 29.8, 27.7, 26.5, 25.5, 22, 18.1, 17.8, 16, 15],
          },
        ],
      };

      this.basicOptions = {
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
    if (selectedCategory == 'R') {
      this.modelo = this.fisicoquimico4;
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue(
        '--text-color-secondary'
      );
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      this.basicData = {
        labels: [
          'TR4053',
          'TRXRE T',
          'TRXRE S',
          'TRXRE R',
          'TR43084',
          'T1AT',
          'T9EZS',
          'T1RO',
          'T1RM',
          'T1RS',
         
        ],

        datasets: [
          {
            label: 'Agua Corregida',
            backgroundColor: documentStyle.getPropertyValue('--pink-500'),
            borderColor: documentStyle.getPropertyValue('--pink-500'),
            data: [50.27, 36.26, 33.79,20.6, 12.36, 9, 8.77, 8.67, 8.58, 8.43],
          },
          {
            label: 'Agua Relativa',
            backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
            borderColor: documentStyle.getPropertyValue('--pink-500'),
            data: [1, 1, 2, 3, 3, 3, 3, 4, 4, 6],
          },
        ],
      };

      this.basicOptions = {
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
    if (selectedCategory == 'X') {
      this.modelo = this.fisicoquimico5;
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue(
        '--text-color-secondary'
      );
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      this.basicData = {
        labels: [
          'T3XRE T',
          'AGTRA',
          'T3XRE R',
          'T3XRE S',
         
          'TR14121',
          'TRRO',
          'T1PYR',
          'T1PYS',
          'T1PYT',
          'TR5491',
        ],
        datasets: [
          {
            label: 'Tangente Delta',
            backgroundColor: documentStyle.getPropertyValue('--blue-800'),
            borderColor: documentStyle.getPropertyValue('--blue-800'),
            data: [0.27, 0.12, 0.09, 0.08, 0.03, 0.0266, 0.0254, 0.0253, 0.239, 0.0196],
          },
        ],
      };

      this.basicOptions = {
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
    if (selectedCategory == 'Y') {
      this.modelo = this.fisicoquimico6;
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue(
        '--text-color-secondary'
      );
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      this.basicData = {
        labels: [
          'T2RO',
          'TRRO',
          'TR7008522',
          'T1RO',
         
          'TR44230',
          'T6EZ',
          'TR43084',
          'T3XRE S',
          'T3XRE R',
          'T3XRE T',

          
        ],
        datasets: [
          {
            label: 'CO',
            backgroundColor: documentStyle.getPropertyValue('--red-800'),
            borderColor: documentStyle.getPropertyValue('--red-800'),
            data: [73, 67, 64, 63, 62, 61, 60, 58, 57, 57],
          },
        ],
      };

      this.basicOptions = {
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
  onChange2() {
    var selectedCategory = this.form.get('categories')?.value.key;
    if (selectedCategory == 'A') {
      this.modelo = this.fisicoquimico1;
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue(
        '--text-color-secondary'
      );
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      this.basicData2 = {
        labels: [
          'T3XRE R',
          'T3XRE T',
          'T3XRE S',
          'TR43937',
          'TR43938',
          'TR43939',
          'TR7008522',
          'AGTRA',
          'TR44230',
          'T4EZ',
        ],
        datasets: [
          {
            label: 'Acidez',
            backgroundColor: documentStyle.getPropertyValue('--blue-500'),
            borderColor: documentStyle.getPropertyValue('--blue-500'),
            data: [0.3, 0.22, 0.21, 0.1, 0.1, 0.1, 0.08, 0.08, 0.05, 0.05],
          },
        ],
      };

      this.basicOptions2 = {
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
    if (selectedCategory == 'M') {
      this.modelo = this.fisicoquimico2;
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue(
        '--text-color-secondary'
      );
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      this.basicData2 = {
        labels: [
          'T1ESPS',
          'T1ESPT',
          'T2ESP',
          'T9EZS',
          'T9EZR',
          'T1RO',
          'T3RA',
          'T2LA',
          'TRZB0001',
          'TRRO',
        ],
        datasets: [
          {
            label: 'Inhibidor',
            backgroundColor: documentStyle.getPropertyValue('--red-500'),
            borderColor: documentStyle.getPropertyValue('--red-500'),
            data: [0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.2],
          },
        ],
      };

      this.basicOptions2 = {
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
    if (selectedCategory == 'P') {
      this.modelo = this.fisicoquimico3;
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue(
        '--text-color-secondary'
      );
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      this.basicData2 = {
        labels: [
          'T1RS',
          'T1RM',
          'TR44230',
          'TR43939',
          'TR43938',
          'TR13937',
          'AGTRA',
          'T3XRE S',
          'T3XRE T',
          'T3XRE R',
        ],
        datasets: [
          {
            label: 'Tensión Interfacial',
            backgroundColor: documentStyle.getPropertyValue('--green-500'),
            borderColor: documentStyle.getPropertyValue('--green-500'),
            data: [29.9, 29.8, 27.7, 26.5, 25.5, 22, 18.1, 17.8, 16, 15],
          },
        ],
      };

      this.basicOptions = {
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
    if (selectedCategory == 'R') {
      this.modelo = this.fisicoquimico4;
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue(
        '--text-color-secondary'
      );
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      this.basicData2 = {
        labels: [
          'TR4053',
          'TRXRE T',
          'TRXRE S',
          'TRXRE R',
          'TR43084',
          'T1AT',
          'T9EZS',
          'T1RO',
          'T1RM',
          'T1RS',
         
        ],

        datasets: [
          {
            label: 'Agua Corregida',
            backgroundColor: documentStyle.getPropertyValue('--pink-500'),
            borderColor: documentStyle.getPropertyValue('--pink-500'),
            data: [50.27, 36.26, 33.79,20.6, 12.36, 9, 8.77, 8.67, 8.58, 8.43],
          },
          {
            label: 'Agua Relativa',
            backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
            borderColor: documentStyle.getPropertyValue('--pink-500'),
            data: [1, 1, 2, 3, 3, 3, 3, 4, 4, 6],
          },
        ],
      };


      this.basicOptions2 = {
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
    if (selectedCategory == 'X') {
      this.modelo = this.fisicoquimico5;
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue(
        '--text-color-secondary'
      );
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      this.basicData2 = {
        labels: [
          'T3XRE T',
          'AGTRA',
          'T3XRE R',
          'T3XRE S',
         
          'TR14121',
          'TRRO',
          'T1PYR',
          'T1PYS',
          'T1PYT',
          'TR5491',
        ],
        datasets: [
          {
            label: 'Tangente Delta',
            backgroundColor: documentStyle.getPropertyValue('--blue-800'),
            borderColor: documentStyle.getPropertyValue('--blue-800'),
            data: [0.27, 0.12, 0.09, 0.08, 0.03, 0.0266, 0.0254, 0.0253, 0.239, 0.0196],
          },
        ],
      };

      this.basicOptions2 = {
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
    if (selectedCategory == 'Y') {
      this.modelo = this.fisicoquimico6;
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue(
        '--text-color-secondary'
      );
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      this.basicData2 = {
        labels: [
          'T2RO',
          'TRRO',
          'TR7008522',
          'T1RO',
         
          'TR44230',
          'T6EZ',
          'TR43084',
          'T3XRE S',
          'T3XRE R',
          'T3XRE T',

          
        ],
        datasets: [
          {
            label: 'Rigidez Dialectrica',
            backgroundColor: documentStyle.getPropertyValue('--red-800'),
            borderColor: documentStyle.getPropertyValue('--red-800'),
            data: [73, 67, 64, 63, 62, 61, 60, 58, 57, 57],
          },
        ],
      };

      this.basicOptions2 = {
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

  ir() {}
  print() {
    window.print();
  }

}

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
interface sintesis {
  
  equipo: string;
  Region: string;
  tangente: string;
  tension: string;
  acidez: string;
  volumen: string;
}
@Component({
  selector: 'app-sistesis',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccordionModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    ChartModule,
    CheckboxModule,
    DividerModule,
    DropdownModule,
    FloatLabelModule,
    IconFieldModule,
    InputIconModule,
    InputSwitchModule,
    InputTextModule,
    RadioButtonModule,
    RippleModule,
    SkeletonModule,
    SplitButtonModule,
    SplitterModule,
    TableModule,
    TabViewModule,
    ToolbarModule
  ],
  templateUrl: './sistesis.component.html',
  styleUrl: './sistesis.component.scss'
})
export class SistesisComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}
  modelo: sintesis[] = [
  
  ];
  tipoEquipo: tipo[] = [
    { tipo: 'Transformadores', key: 'A' },
    { tipo: 'Transformador Corriente', key: 'B' },
    { tipo: 'Reactores', key: 'C' },
    { tipo: 'Transformador Auxiliar', key: 'D' },
  ];
  form: FormGroup;
  Sector: tipo[] = [
    { tipo: 'Sector A', key: 'A' },
    { tipo: 'Sector B', key: 'B' },
    { tipo: 'Sector C', key: 'C' },
    { tipo: 'Todos', key: 'D' },
  ];

  tratar: any;
  tratarOptions: any;
  regenerar: any;
  regenerarOptions: any;
  bar: any;
  barOptions: any;
  

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      sector:'A',

    });
    this.onChange();
  }
  onChange() {
this.modelo = [  {equipo: 'T1RM', Region: 'A', tangente: '0.0126', tension: '29.9', acidez: '0.04', volumen: '50000'},
  {equipo: 'AGTRA', Region: 'A', tangente: '0.1207', tension: '2', acidez: '0.08', volumen: '11600'},]
    var seleccionado = this.form.get('sector')?.value;
    console.log(seleccionado);
    if (seleccionado == 'A') {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const documentStylebar = getComputedStyle(document.documentElement);
      const textColorbar = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      this.regenerar = {
        labels: ['En Condiciones', 'Aceite a Regenerar'],
        datasets: [
          {
            data: [99, 1],
            backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500')],
            hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400')]
          }
        ]
      };
      this.regenerarOptions = {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor
            }
          }
        }
      };
      this.tratar = {
        labels: ['En Condiciones', 'Aceite a Tratar'],
        datasets: [
          {
            data: [98, 2],
            backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500')],
            hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400')]
          }
        ]
      };
      this.tratarOptions = {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor
            }
          }
        }
      };
      this.bar = {
        labels: ['En Condiciones', 'Aceite a Tratar'],
        datasets: [
          {
            data: [98, 2],
            backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500')],
            hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400')]
          }
        ]
      };
      this.barOptions = {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor
            }
          }
        }
      };
  
   
  
  

    }
  }
  
print() {
  window.print();
}
}

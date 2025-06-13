import { Component, Input, OnInit } from '@angular/core';
import { percentilDTO } from './percentil';
import { PercentilServiceService } from './percentil-service.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
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
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-percentil',
  imports: [ChartModule,
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
          SplitButtonModule,DialogModule,
          FloatLabelModule],
  templateUrl: './percentil.component.html',
  styleUrl: './percentil.component.scss'
})
export class PercentilComponent implements OnInit {
  constructor(private service: PercentilServiceService) {}
  percentil: percentilDTO[];
  rigidez: any;
  @Input() id: number = 0;
  ngOnInit(): void {
    this.service.getPercentil(this.id).subscribe((y) => {
      this.percentil = y;

      
    });
  }

  visible3:boolean = false;
  visible4:boolean = false;
  loading:boolean = true;
  diagnostico(tipo: string) {
    this.visible3 = true;


      this.service.getRigidez(this.id).subscribe((x:any) => {
        this.loading = false;
        this.rigidez = x.candidates[0].content.parts[0].text;
      });
   
  }

  basicData: any;
  basicOptions: any;
  print(){
    window.print();
  }
  graficar(tipo:string)
  {


    this.visible4 = true;
    if ((tipo = 'rigidez')) {
    
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue(
          '--text-color-secondary'
        );
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        this.basicData = {
          labels: [
            '12/01/2023',
            '12/02/2023',
            '12/03/2023',
            '12/04/2023',
            '12/05/2023',
            '12/06/2024',
            '12/07/2024',
            '12/08/2024',
            '12/09/2024',
            '12/10/2024',

          ],
          datasets: [
            {
              label: 'Rigidez dialectica',
              backgroundColor: documentStyle.getPropertyValue('--blue-500'),
              borderColor: documentStyle.getPropertyValue('--blue-500'),
              data: [85,87,88,89,90,91,92,93,95,97],
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

}

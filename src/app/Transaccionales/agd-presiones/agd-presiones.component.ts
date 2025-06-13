import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { RippleModule } from 'primeng/ripple';
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
import { FooterWidget } from "../../pages/landing/components/footerwidget";
import { InputNumberModule } from 'primeng/inputnumber';
interface tipo {
    tipo: string;
    key: string;
}
interface presion {
  
  equipo: string;
  presion: string;
  volumen: string;
}
@Component({
  selector: 'app-agd-presiones',
  imports: [
    ChartModule,
    InputTextModule,
    DividerModule,
    ButtonModule,
    CardModule,
    CommonModule,
    CalendarModule,
    RippleModule,
    DropdownModule,
    SplitterModule,
    ReactiveFormsModule,
    ToolbarModule,
    IconFieldModule,
    InputIconModule,
    SplitButtonModule,
    FloatLabelModule, TableModule,InputNumberModule
    
],
  templateUrl: './agd-presiones.component.html',
  styleUrl: './agd-presiones.component.scss'
})
export class AgdPresionesComponent implements OnInit{
  constructor(private formBuilder: FormBuilder) {}
  formGroup: FormGroup;
  modelo:presion[]=[];
  cambio: boolean = false;


  tipoEquipo: tipo[] = [
    { tipo: 'Transformadores', key: 'A' },
    { tipo: 'Transformador Corriente', key: 'M' },
    { tipo: 'Reactores', key: 'P' },
    
  ];
  presion1: presion[] = [
    {
      equipo: 'T1RDPR',
      presion: '1',
      volumen:'68300'
    },
    {
      equipo: 'TR43084',
      presion: '1.12',
      volumen:'62800'
    },
    {
      equipo: 'TR43938',
      presion: '1.01',
      volumen:'62800'
    },
    {
      equipo: 'TR44033',
      presion: '1.02',
      volumen:'12300'
    },
    
    
  ];
  presion2: presion[] = [
    {
      equipo: 'R1L5NT',
      presion: '1.07',
      volumen:'13100'
    },
    {
      equipo: 'R2B5HES',
      presion: '0.98',
      volumen:'15600'
    },
    {
      equipo: 'R2L5RSCN',
      presion: '0.98',
      volumen:'4598'
    },
    {
      equipo: 'R2N5ZNN',
      presion: '1.01',
      volumen:'13100'
    },
    {
      equipo: 'R4L50LN',
      presion: '1.02',
      volumen:'7340'
    },
    
  ]
  presion3: presion[] = [
    {
      equipo: 'T1XAT',
      presion: '1.04',
      volumen:'580'
    },
    {
      equipo: 'T1XCH',
      presion: '1.02',
      volumen:'1800'
    },
    {
      equipo: 'T1XESP',
      presion: '1.05',
      volumen:'1150'
    },
    {
      equipo: 'T1XGBR',
      presion: '1.03',
      volumen:'530'
    },
    {
      equipo: 'T1XPY',
      presion: '0.98',
      volumen:'840'
    },
  ]

  ngOnInit(): void {
    this.modelo=[];
    this.formGroup = this.formBuilder.group({
      equipo: new FormControl(''),
      numero: new FormControl(0),

    
    });
   
  }
ir(){

  
}
print(){
  window.print();
}
  onChange() {
    var seleccionado=this.formGroup.get('equipo')?.value;
 
    if (seleccionado=='A')
    {
      this.modelo = this.presion1;
      this.cambio = false;
    }
    else if (seleccionado=='M')
    {
      this.modelo = this.presion2;
      this.cambio = false;
         console.log(seleccionado);
    }
    else if (seleccionado=='P')
    {
      this.modelo = this.presion3;
      this.cambio = false;
    }
    
  }
    

}

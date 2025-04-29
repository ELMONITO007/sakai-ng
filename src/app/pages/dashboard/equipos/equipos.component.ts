import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-equipos',
  imports: [TableModule,ButtonModule,TableModule,CardModule,CommonModule],
  templateUrl: './equipos.component.html',
  styleUrl: './equipos.component.scss',
  providers: [],
})
export class EquiposComponent implements OnInit {
  equipos: any[] = [];
  botonVencer= false;
ngOnInit(): void {
  this.cambiarAVencer();
 
}

cambiarVencidos() {
this.botonVencer = true;
  this.equipos = [
    { id: 1, nombre: 'Equipo E', estado: 'Activo',sector: 'Sector 1' },
    { id: 2, nombre: 'Equipo B', estado: 'Activo',sector: 'Sector 2' },
    { id: 2, nombre: 'Equipo B', estado: 'Activo',sector: 'Sector 2' },
    { id: 3, nombre: 'Equipo F', estado: 'Activo',sector: 'Sector 3' },
    { id: 4, nombre: 'Equipo D', estado: 'Activo',sector: 'Sector 4' },
  
  ];
}
cambiarAVencer() {
  this.botonVencer = false;
  this.equipos = [
    { id: 1, nombre: 'Equipo A', estado: 'Activo',sector: 'Sector 1' },
    { id: 2, nombre: 'Equipo B', estado: 'Inactivo',sector: 'Sector 2' },
    { id: 2, nombre: 'Equipo B', estado: 'Inactivo',sector: 'Sector 2' },
    { id: 3, nombre: 'Equipo C', estado: 'Activo',sector: 'Sector 3' },
    { id: 4, nombre: 'Equipo D', estado: 'Inactivo',sector: 'Sector 4' },
    { id: 5, nombre: 'Equipo E', estado: 'Activo',  sector: 'Sector 5' },
  ];
}

}

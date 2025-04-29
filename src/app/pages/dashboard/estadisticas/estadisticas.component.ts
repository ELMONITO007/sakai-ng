import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
@Component({
  selector: 'app-estadisticas',
  imports: [CarouselModule],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.scss'
})
export class EstadisticasComponent implements OnInit{
  items: any[] = [];
  responsiveOptions: any;
  constructor() {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit() {
    this.items = [
      {
        titulo: 'Orden ensayo Pendiente',
        cantidad: 25,
        icono: 'pi pi-fw pi-check-circle',
        color: 'blue',
      },
      {
        title: 'Item 2',
        content: 'Content for item 2'
      },
      {
        title: 'Item 3',
        content: 'Content for item 3'
      }
    ];
  }

}

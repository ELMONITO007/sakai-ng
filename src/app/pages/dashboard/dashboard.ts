import { Component, OnInit } from '@angular/core';
import { NotificationsWidget } from './components/notificationswidget';

import { RecentSalesWidget } from './components/recentsaleswidget';
import { BestSellingWidget } from './components/bestsellingwidget';
import { RevenueStreamWidget } from './components/revenuestreamwidget';
import { EstadisticasComponent } from "./estadisticas/estadisticas.component";
import { EquiposComponent } from "./equipos/equipos.component";
import { AuthGoogleService } from '../../Servicios/auth-google.service';
import { UsuarioServiceService } from '../../Servicios/Usuario-service.service';
import { usuarioDTO } from '../../Entidades/usuario';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    standalone: true,
        imports: [ BestSellingWidget, RevenueStreamWidget, NotificationsWidget, EstadisticasComponent, EquiposComponent],
    templateUrl: './dashboard.component.html',
    providers:[AuthGoogleService]

    


})
export class Dashboard  {
Usuario:usuarioDTO;
constructor( 
    private authGoogleService: AuthGoogleService,

   ) {
   
console.log(this.authGoogleService.getPRofile())


  
}
   

}

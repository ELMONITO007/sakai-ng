import { Component } from '@angular/core';

import { AuthGoogleService } from '../../Servicios/auth-google.service';
import { UsuarioServiceService } from '../../Servicios/Usuario-service.service';
import { usuarioDTO } from '../../Entidades/usuario';
import { CommonModule } from '@angular/common';
import { BestSellingWidget } from './components/bestsellingwidget';
import { NotificationsWidget } from './components/notificationswidget';
import { RecentSalesWidget } from './components/recentsaleswidget';
import { RevenueStreamWidget } from './components/revenuestreamwidget';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [ RecentSalesWidget, BestSellingWidget, RevenueStreamWidget, NotificationsWidget,CommonModule,EstadisticasComponent],
    templateUrl: './dashboard.component.html',
    providers: [UsuarioServiceService,
       AuthGoogleService
    ]
})
export class Dashboard {
    Usuario: usuarioDTO;
    constructor(private usuarioService: UsuarioServiceService,
      
    ) {
        console.log('Dashboard component initialized');
        var result;

        this.usuarioService.getUsuarioLogeado().subscribe((data: any) => {
            this.Usuario = data;
        });
    }
}

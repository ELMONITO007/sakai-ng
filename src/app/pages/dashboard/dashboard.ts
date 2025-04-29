import { Component } from '@angular/core';
import { NotificationsWidget } from './components/notificationswidget';

import { RecentSalesWidget } from './components/recentsaleswidget';
import { BestSellingWidget } from './components/bestsellingwidget';
import { RevenueStreamWidget } from './components/revenuestreamwidget';
import { EstadisticasComponent } from "./estadisticas/estadisticas.component";
import { EquiposComponent } from "./equipos/equipos.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
        imports: [ BestSellingWidget, RevenueStreamWidget, NotificationsWidget, EstadisticasComponent, EquiposComponent],
    templateUrl: './dashboard.component.html',

    


})
export class Dashboard {}

import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { UsuarioDetalleComponent } from './app/Negocio/usuario/usuario-detalle/usuario-detalle.component';
import { UsuarioListarComponent } from './app/Negocio/usuario/usuario-listar/usuario-listar.component';
import { ItemAnalisisListarComponent } from './app/Negocio/itemAnalisis/item-analisis-listar/item-analisis-listar.component';
import { TipoAnalisisListarComponent } from './app/Negocio/tipoAnalisis/tipo-analisis-listar/tipo-analisis-listar.component';
import { TipoAnalisisDetallesComponent } from './app/Negocio/tipoAnalisis/tipo-analisis-detalles/tipo-analisis-detalles.component';
import { CubaListarComponent } from './app/Negocio/cuba/cuba-listar/cuba-listar.component';
import { SectorListarComponent } from './app/Negocio/sector/sector-listar/sector-listar.component';
import { UsuarioColaborarFijoComponent } from './app/Negocio/usuario/usuario-colaborar-fijo/usuario-colaborar-fijo.component';
import { LaboratorioListarComponent } from './app/Negocio/laboratorio/laboratorio-listar/laboratorio-listar.component';
import { LaboratorioDetalleComponent } from './app/Negocio/laboratorio/laboratorio-detalle/laboratorio-detalle.component';
import { EquipoListarComponent } from './app/Negocio/equipo/equipo-listar/equipo-listar.component';
import { EquipoDetalleComponent } from './app/Negocio/equipo/equipo-detalle/equipo-detalle.component';
import { OrdenEnsayoListarComponent } from './app/Negocio/ordenEnsayo/orden-ensayo-listar/orden-ensayo-listar.component';
import { OrdenEnsayoDetalleComponent } from './app/Negocio/ordenEnsayo/orden-ensayo-detalle/orden-ensayo-detalle.component';
import { GoogleLoginComponent } from './app/Negocio/login/google-login/google-login.component';
import { WaitingLoginComponent } from './app/Negocio/login/waiting-login/waiting-login.component';
import { LandingPageComponent } from './app/pages/landing/landing-page/landing-page.component';

export const appRoutes: Routes = [
    {path:'login',component:GoogleLoginComponent},
    { path: 'waiting', component:WaitingLoginComponent },
    {path:'' ,component:LandingPageComponent},
    {
        path: 'index',
        component: AppLayout,
        children: [
            { path: 'index', component: Dashboard },
         
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') },
            { path: 'usuario', component: UsuarioListarComponent },
            { path: 'usuario/:id', component: UsuarioDetalleComponent },
            {path: 'tipo', component:TipoAnalisisListarComponent },
            {path: 'tipo/:id', component:TipoAnalisisDetallesComponent },
            {path:'cuba',component:CubaListarComponent},
            {path:'sector',component:SectorListarComponent},
           
            {path: 'colaborador/:id', component:UsuarioColaborarFijoComponent },
            {path:'laboratorio',component:LaboratorioListarComponent},
            {path:'laboratorio/:id',component:LaboratorioDetalleComponent},
            {path:'equipo',component:EquipoListarComponent},
            {path:'equipo/:id',component:EquipoDetalleComponent},
            {path:'ordenEnsayo',component:OrdenEnsayoListarComponent},
            {path:'ordenEnsayo/:id',component:OrdenEnsayoDetalleComponent},

            
        ]
    },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];

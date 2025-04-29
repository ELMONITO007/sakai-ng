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

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: 'index', component: Dashboard },
            { path: '', component: Dashboard },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') },
            { path: 'usuario', component: UsuarioListarComponent },
            { path: 'usuario/:id', component: UsuarioDetalleComponent },
            {path: 'tipo', component:TipoAnalisisListarComponent },
        ]
    },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];

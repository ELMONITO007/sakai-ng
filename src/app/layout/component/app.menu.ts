import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { UsuarioServiceService } from '../../Servicios/Usuario-service.service';
import { usuarioDTO } from '../../Entidades/usuario';

@Component({
    selector: 'app-menu',
    standalone: true,
    providers: [UsuarioServiceService],
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];
    usuario: usuarioDTO;
    constructor(private usuarioService: UsuarioServiceService) {}

    ngOnInit() {
       this.usuarioService.getUsuarioLogeado().subscribe((data) => {
        console.log(data);
        if (data.puesto == 'Laboratista' || data.puesto == 'Administrador') {
            this.model = [
                {
                    label: 'Home',
                    items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/index'] }]
                },
                {
                    label: 'Mi trabajo',
                    icon: 'pi pi-fw pi-briefcase',
                    routerLink: ['/ordenEnsayo'],
                    items: [
                        {
                            label: 'Ordenes de Ensayo',
                            icon: 'pi pi-fw pi-briefcase',
                            routerLink: ['/ordenEnsayo']
                        },
                        {
                            label: 'Login',
                            icon: 'pi pi-fw pi-user',
                            items: [
                                {
                                    label: 'Login',
                                    icon: 'pi pi-fw pi-sign-in',
                                    routerLink: ['/login']
                                },
                                {
                                    label: 'Logout',
                                    icon: 'pi pi-fw pi-sign-out',
                                    routerLink: ['/logout']
                                },
                                {
                                    label: 'Mi Cuenta',
                                    icon: 'pi pi-fw pi-user',
                                    routerLink: ['/miUsuario']
                                }
                            ]
                        },
                        {
                            label: 'Estadisticas',
                            icon: 'pi pi-fw pi-chart-line',
                            items: [
                                {
                                    label: 'AGD',
                                    icon: 'pi pi-fw pi-caret-down',
                                    items: [
                                        {
                                            label: 'General',
                                            icon: 'pi pi-fw pi-sign-in',
                                            routerLink: ['/login']
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    label: 'Configuración',
                    items: [
                        { label: 'Usuario', icon: 'pi pi-fw pi-user', routerLink: ['/usuario'] },
                        { label: 'Equipo', icon: 'pi pi-fw pi-briefcase', routerLink: ['/equipo'] },
                        { label: 'Tipo Analisis', icon: 'pi pi-fw pi-filter', class: 'rotated-icon', routerLink: ['/tipo'] },
                        { label: 'Sector', icon: 'pi pi-fw pi-map', routerLink: ['/sector'] },
                        { label: 'Laboratorio', icon: 'pi pi-fw pi-building', routerLink: ['/laboratorio'] }
                    ]
                }
            ];
        }
        if (data.puesto == 'Operador' ) {
            this.model = [
                {
                    label: 'Home',
                    items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/index'] }]
                },
                {
                    label: 'Mi trabajo',
                    icon: 'pi pi-fw pi-briefcase',
                    routerLink: ['/ordenEnsayo'],
                    items: [
                        {
                            label: 'Ordenes de Ensayo',
                            icon: 'pi pi-fw pi-briefcase',
                            routerLink: ['/ordenEnsayo']
                        },
                        {
                            label: 'Login',
                            icon: 'pi pi-fw pi-user',
                            items: [
                                {
                                    label: 'Login',
                                    icon: 'pi pi-fw pi-sign-in',
                                    routerLink: ['/login']
                                },
                                {
                                    label: 'Logout',
                                    icon: 'pi pi-fw pi-sign-out',
                                    routerLink: ['/logout']
                                },
                                {
                                    label: 'Mi Cuenta',
                                    icon: 'pi pi-fw pi-user',
                                    routerLink: ['/miUsuario']
                                }
                            ]
                        },
                        {
                            label: 'Estadisticas',
                            icon: 'pi pi-fw pi-chart-line',
                            items: [
                                {
                                    label: 'AGD',
                                    icon: 'pi pi-fw pi-caret-down',
                                    items: [
                                        {
                                            label: 'General',
                                            icon: 'pi pi-fw pi-sign-in',
                                            routerLink: ['/login']
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
            ]
        }
         })
    }
   
}

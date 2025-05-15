import { Component, OnInit } from '@angular/core';
import { AuthGoogleService } from '../../../Servicios/auth-google.service';
import { Router } from '@angular/router';
import { UsuarioServiceService } from '../../../Servicios/Usuario-service.service';

import { SkeletonModule } from 'primeng/skeleton';

@Component({
    selector: 'app-waiting-login',
    imports: [SkeletonModule],
    templateUrl: './waiting-login.component.html',
    styleUrl: './waiting-login.component.scss',
    providers: [AuthGoogleService]
})
export class WaitingLoginComponent implements OnInit {
    constructor(
        private service: AuthGoogleService,
        private router: Router
    ) {
    
        const plainUser = this.service.getPRofile();
        if (plainUser != null) {
            this.router.navigate(['/index']);
        } else {
            this.router.navigate(['/login']);
        }
    }
    ngOnInit() {
       
    }
}

import { Component, OnInit } from '@angular/core';
import { AuthGoogleService } from '../../../Servicios/auth-google.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioServiceService } from '../../../Servicios/Usuario-service.service';

import { SkeletonModule } from 'primeng/skeleton';
import { usuarioDTO } from '../../../Entidades/usuario';
import { AuthBKService } from '../../../Servicios/auth-bk.service';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
    selector: 'app-waiting-login',
    imports: [SkeletonModule],
    templateUrl: './waiting-login.component.html',
    styleUrl: './waiting-login.component.scss',
    providers: [AuthGoogleService, UsuarioServiceService, AuthBKService]
})
export class WaitingLoginComponent implements OnInit {
    constructor(
        private service: AuthGoogleService,
        private router: Router,
        private usuarioService: UsuarioServiceService,
        private authBKService: AuthBKService,
        private activatedRoute: ActivatedRoute,
        private oAuthService: OAuthService
    ) {
        var usuario;

     
       

        /*
        else {
            var email = plainUser['email'];
            this.usuarioService.obtenerUnoemail(email).subscribe((data: any) => {
                if (data == null) {
                    this.router.navigate(['/noAuth']);
                } else {
                    usuario = data;
                    usuario['token'] = this.service.getTOken();
                    this.authBKService.login(usuario).subscribe((data: usuarioDTO) => {
                        console.log(data);
                    });
                }
            });
        }*/
    }
    async ngOnInit() {
await this.delay(1000);
           var plainUser = this.oAuthService.getIdentityClaims();
        console.log(plainUser);
        if (plainUser == null) {
            this.router.navigate(['/login']);
        } 
        else {
            var email = plainUser['email'];
            this.usuarioService.obtenerUnoemail(email).subscribe((data: any) => {
                if (data == null) {
                    this.router.navigate(['/noAuth']);
                } else {
                    var usuario: usuarioDTO = data;
                    usuario['token'] = this.service.getTOken();
                    this.authBKService.login(usuario).subscribe((data: usuarioDTO) => {
                        console.log('respuesta',data);
                     this.authBKService.loginSuccess(usuario);
                    this.router.navigate(['/index']);
                    });
                   
                }
            });
        }
    }
     delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
}

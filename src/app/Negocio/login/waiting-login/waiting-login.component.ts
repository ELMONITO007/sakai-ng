import { Component, OnInit } from '@angular/core';
import { AuthGoogleService } from '../../../Servicios/auth-google.service';
import { Router } from '@angular/router';
import { UsuarioServiceService } from '../../../Servicios/Usuario-service.service';

import { SkeletonModule } from 'primeng/skeleton';
import { usuarioDTO } from '../../../Entidades/usuario';

@Component({
    selector: 'app-waiting-login',
    imports: [SkeletonModule],
    templateUrl: './waiting-login.component.html',
    styleUrl: './waiting-login.component.scss',
    providers: [AuthGoogleService, UsuarioServiceService]
})
export class WaitingLoginComponent implements OnInit {
    constructor(
        private service: AuthGoogleService,
        private router: Router,
        private usuarioService: UsuarioServiceService
    ) {
var usuario;
        const plainUser = this.service.getPRofile();
        if (plainUser == null) {
            window.location.reload();
        } else {
            var email = plainUser['email'];
            this.usuarioService.obtenerUnoemail(email).subscribe((data: any) => {
                if (data == null) {
                 
                    this.router.navigate(['/noAuth']);
                } else {

                    usuario = data;
                    usuario['token'] = this.service.getTOken();
                    this.usuarioService.login(usuario).subscribe((data: usuarioDTO) => {

                  if (data.contraseña == "200") {
                    localStorage.setItem('user', JSON.stringify(data));
                    
                        this.router.navigate(['/index']);
                  }
                    });

                    
                }

            
            });
           

           
        }
        
    }
    ngOnInit() {}
}

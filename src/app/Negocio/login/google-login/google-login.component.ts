import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../../layout/component/app.floatingconfigurator';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { MatIconModule } from '@angular/material/icon';
import { AuthGoogleService } from '../../../Servicios/auth-google.service';
import { usuarioDTO } from '../../../Entidades/usuario';
import { UsuarioServiceService } from '../../../Servicios/Usuario-service.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-google-login',
    imports: [OAuthModule, HttpClientModule, DividerModule, ToastModule, ButtonModule, MatIconModule, CommonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule],
    templateUrl: './google-login.component.html',
    styleUrl: './google-login.component.scss',
    providers: [AuthGoogleService, UsuarioServiceService, MessageService]
})
export class GoogleLoginComponent implements OnInit {
    constructor(
        private authGoogleService: AuthGoogleService,
        private messageService: MessageService,
        private usuarioService: UsuarioServiceService
    ) {}
    email: string = '';

    password: string = '';

    checked: boolean = false;
    usuario: usuarioDTO;
    existe: string = '';
    ngOnInit() {
      
        const plainUser = this.authGoogleService.getPRofile();
        console.log('Existe', plainUser);

        if (plainUser == null) {
            this.existe = 'no login';
        } else {
            var email = plainUser['email'];
            this.usuarioService.obtenerUnoemail(email).subscribe((data: usuarioDTO) => {
              
                if (data == null) {
                  console.log('no existe');
                 this.messageService.add({ severity: 'error', summary: 'Error Login', detail: 'El usuario no esta registrado',life: 3000 });
                } else {
                    this.existe = 'si';
                }
            });
        }


      
    }

    login() {

        this.authGoogleService.login();

    }
}

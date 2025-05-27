import { Injectable, OnInit } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

@Injectable({
    providedIn: 'root'
})
export class AuthGoogleService {
    constructor(private oAuthService: OAuthService) {
        this.Init();
    }
    async Init() {
        const authConfig: AuthConfig = {
            issuer: 'https://accounts.google.com',
            redirectUri: window.location.origin + '/waiting',
            clientId: '65998274549-ugfh2a24msas4l1mva0sb6fq16qlvslp.apps.googleusercontent.com',
            strictDiscoveryDocumentValidation: false,
            scope: 'openid profile email',
            responseType: 'token id_token'
        };
        this.oAuthService.configure(authConfig);
        this.oAuthService.setupAutomaticSilentRefresh();
        try {
            const loggedIn = await this.oAuthService.loadDiscoveryDocumentAndTryLogin();
            // isLoggedIn será true si el redirect contenía tokens válidos y fueron procesados.
            if (loggedIn) {
                console.log('Login exitoso después del redirect o carga inicial.');
                const claims = this.oAuthService.getIdentityClaims();
                console.log('Claims después de tryLogin:', claims);

                // Aquí es un buen lugar para obtener los claims o notificar a otras partes de tu app.
                // Por ejemplo, podrías navegar a una página específica o cargar datos del usuario.
                // Ejemplo: this.router.navigate(['/perfil']);

                // También puedes emitir un evento o actualizar un BehaviorSubject
                // si tienes un servicio de autenticación centralizado.
            } else {
                console.log('No se realizó un login automático (puede ser la primera carga sin redirect).');
               
            }
        } catch (error) {
            console.error('Error durante la configuración de OAuth o el intento de login:', error);
            // Manejar el error, quizás redirigir a una página de error o reintentar.
        }
    }

    login() {
        this.oAuthService.initLoginFlow();
    }
    logout() {
        this.oAuthService.logOut();
    }

    getPRofile() {
        return this.oAuthService.getIdentityClaims();
    }

    getTOken() {
        return this.oAuthService.getIdToken();
    }
}

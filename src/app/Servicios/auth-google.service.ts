import { Injectable, OnInit } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

@Injectable({
    providedIn: 'root',
})
export class AuthGoogleService  {
    constructor(private oAuthService: OAuthService) {this.Init();}
    Init(){
        const authConfig: AuthConfig = {
            issuer: 'https://accounts.google.com',
            redirectUri: window.location.origin + '/index',
            clientId: '65998274549-ugfh2a24msas4l1mva0sb6fq16qlvslp.apps.googleusercontent.com',
            strictDiscoveryDocumentValidation: false,
            scope: 'openid profile email',
           responseType: 'token id_token',
           
           
        };
        this.oAuthService.configure(authConfig);
        this.oAuthService.setupAutomaticSilentRefresh();
        this.oAuthService.loadDiscoveryDocumentAndTryLogin();
      

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
      return   this.oAuthService.getIdToken();
    }
}

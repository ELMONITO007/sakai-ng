import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthGoogleService } from './auth-google.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { usuarioDTO } from '../Entidades/usuario';

@Injectable({
    providedIn: 'root'
})
export class AuthBKService {
    private apiURL = environment.apiURL + '/Authorize';
    constructor(
        private http: HttpClient,
        private auth: AuthGoogleService,
        private router: Router
    ) {}
    private currentUserSubject = new BehaviorSubject<usuarioDTO | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();
    public isAuthenticated$ = new BehaviorSubject<boolean>(false); // Un flag simple

    public login(codigo: usuarioDTO): Observable<any> {
        // Especifica el tipo de retorno si lo conoces
        return this.http.post<any>(`${this.apiURL}/login`, codigo, { withCredentials: true });
    }

    public logout() {
        return this.http.post<any>(`${this.apiURL}/logout`, {});
    }

    public loginSuccess(usuario: usuarioDTO) {
        this.currentUserSubject.next(usuario);
        this.isAuthenticated$.next(true); // Actualiza el flag de autenticación
    }
    public logoutSucess() {
        this.currentUserSubject.next(null);
        this.isAuthenticated$.next(false);
        this.auth.logout();
        this.router.navigate(['/login']);
    }
}

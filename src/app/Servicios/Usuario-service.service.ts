import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { usuarioDTO, usuarioCreacionDTO } from '../Entidades/usuario';
import { environment } from '../environments/environment';
import { AuthGoogleService } from './auth-google.service';
import { Router } from '@angular/router';
export interface tokenDTO {
    token: string;
}

@Injectable({ providedIn: 'root' })
export class UsuarioServiceService {
    constructor(
        private http: HttpClient,
        private auth: AuthGoogleService,
        private router: Router
    ) {}
    private apiURL = environment.apiURL + '/usuario';

    public obtenerTodos() {
        return this.http.get<usuarioDTO[]>(`${this.apiURL}/index`);
    }

    public ReadColaborador(id: number) {
        return this.http.get<usuarioDTO[]>(`${this.apiURL}/ReadColaborador?id=${id}`);
    }
    public ReadColaboradorFaltante(id: number) {
        return this.http.get<usuarioDTO[]>(`${this.apiURL}/ReadColaboradorFaltante?id=${id}`);
    }
    public ReadLaboratistaFaltante(id: number) {
        return this.http.get<usuarioDTO[]>(`${this.apiURL}/ReadLaboratistaFaltante?id=${id}`);
    }
    public readLaboratorio(id: number) {
        return this.http.get<usuarioDTO[]>(`${this.apiURL}/readLaboratorio?id=${id}`);
    }
    public obtenerUno(id: number) {
        return this.http.get<usuarioDTO>(`${this.apiURL}/readBy?id=${id}`);
    }
    public obtenerUnoemail(id: string) {
        return this.http.get<usuarioDTO>(`${this.apiURL}/readByEmail?id=${id}`);
    }
    public crear(codigo: usuarioCreacionDTO) {
        return this.http.post(this.apiURL, codigo);
    }

    public actualizar(codigo: usuarioCreacionDTO) {
        return this.http.put(this.apiURL, codigo);
    }

    public borrar(id: number) {
        return this.http.delete(`${this.apiURL}?id=${id}`);
    }
    DeslogearUser() {
        this.auth.logout();
        localStorage.removeItem('user');
    }

    usuarioLogueado: usuarioDTO;

    existe: string;

    getUsuarioLogeado(): Observable<usuarioDTO> {
        const plainUser = this.auth.getPRofile();
        var email = plainUser['email'];
        var user;
        return this.obtenerUnoemail(email);
    }

    public login(codigo: usuarioDTO) {
        return this.http.post<usuarioDTO>(`${this.apiURL}/login`, codigo);
    }

    token: usuarioDTO;
    public VerificarToken() {
        var t = { token: this.auth.getTOken() };
        this.token = {
            id_Usuario: 0,
            nombre: '',
            apellido: '',
            email: '',
            userName: '',
            contraseña: '',
            puesto: '',
            bloqueado: false,
            cantidadIntentos: 0,
            token: t.token
        };
        return this.http.put<tokenDTO>(`${this.apiURL}/VerificarToken`, this.token);
    }

    public isLogin(): any {
        const token = this.auth.getTOken();
        if (token != null || token != undefined || token != '') {
            this.VerificarToken().subscribe((y) => {
                if (y) {
                    return true;
                } else {
                    this.DeslogearUser();
                    this.router.navigate(['/login']);
                    return false;
                }
            });
        } else {
            this.DeslogearUser();
            this.router.navigate(['/login']);
            return false;
        }
    }


}

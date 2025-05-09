import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { usuarioDTO, usuarioCreacionDTO } from '../Entidades/usuario';
import { environment } from '../environments/environment';


@Injectable({ providedIn: 'root' })
export class UsuarioServiceService {
  constructor(private http: HttpClient) { }
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
    localStorage.removeItem("user")
  }

  getUsuarioLogeado(): usuarioDTO {
    const plainUser = localStorage.getItem('user');

    if (!plainUser)
      throw new Error('No user logged in');

    return JSON.parse(plainUser) as usuarioDTO;
  }
  public login(codigo: usuarioDTO) {


    return this.http.post<usuarioDTO>(`${this.apiURL}/login`, codigo);


  }
}

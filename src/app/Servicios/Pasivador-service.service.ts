import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pasivadorDTO, pasivadorCreacionDTO } from '../Entidades/pasivador';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root'})
export class PasivadorServiceService {
  constructor( private http: HttpClient) { }
  private apiURL = environment.apiURL + '/pasivador';

  public obtenerTodos(id: number){
    return this.http.get<pasivadorDTO>(`${this.apiURL}/index?id=${id}`);
  }

  public obtenerPorPadre(id: number){
    return this.http.get<pasivadorDTO[]>(`${this.apiURL}/ReadByXXX?id=${id}`);
  }

  public obtenerUno(id: number){
    return this.http.get<pasivadorDTO>(`${this.apiURL}/readBy?id=${id}`);
  }

   public crear(codigo: pasivadorCreacionDTO) {
       return this.http.post(this.apiURL, codigo);
   }

   public actualizar(codigo: pasivadorCreacionDTO) {
       return this.http.put(this.apiURL, codigo);
   }

   public borrar(id: number) {
        return this.http.delete(`${this.apiURL}?id=${id}`);
   }

}

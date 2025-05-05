import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { normaDTO, normaCreacionDTO } from '../Entidades/norma';
import { environment } from '../environments/environment';


@Injectable({ providedIn: 'root'})
export class NormaServiceService {
  constructor( private http: HttpClient) { }
  private apiURL = environment.apiURL + '/norma';

  public obtenerTodos(){
    return this.http.get<normaDTO[]>(`${this.apiURL}/index`);
  }

  public obtenerPorPadre(id: number){
    return this.http.get<normaDTO[]>(`${this.apiURL}/ReadByXXX?id=${id}`);
  }

  public obtenerUno(id: number){
    return this.http.get<normaDTO>(`${this.apiURL}/readBy?id=${id}`);
  }

   public crear(codigo: normaCreacionDTO) {
       return this.http.post(this.apiURL, codigo);
   }

   public actualizar(codigo: normaCreacionDTO) {
       return this.http.put(this.apiURL, codigo);
   }

   public borrar(id: number) {
        return this.http.delete(`${this.apiURL}?id=${id}`);
   }

}

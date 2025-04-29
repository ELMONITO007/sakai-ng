import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { itemAnalisisDTO, itemAnalisisCreacionDTO } from '../Entidades/itemAnalisis';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root'})
export class ItemAnalisisServiceService {
  constructor( private http: HttpClient) { }
  private apiURL = environment.apiURL + '/itemAnalisis';

  public obtenerTodos(){
    return this.http.get<itemAnalisisDTO[]>(`${this.apiURL}/index`);
  }

  public obtenerPorPadre(id: number){
    return this.http.get<itemAnalisisDTO[]>(`${this.apiURL}/index?id=${id}`);
  }


  public obtenerUno(id: number){
    return this.http.get<itemAnalisisDTO>(`${this.apiURL}/readBy?id=${id}`);
  }

   public crear(codigo: itemAnalisisCreacionDTO) {
       return this.http.post(this.apiURL, codigo);
   }

   public actualizar(codigo: itemAnalisisCreacionDTO) {
       return this.http.put(this.apiURL, codigo);
   }

   public borrar(id: number) {
        return this.http.delete(`${this.apiURL}?id=${id}`);
   }

}

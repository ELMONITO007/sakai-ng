import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { corrosividadDTO, corrosividadCreacionDTO } from '../Entidades/corrosividad';
import { environment } from '../environments/environment';



@Injectable({ providedIn: 'root'})
export class CorrosividadServiceService {
  constructor( private http: HttpClient) { }
  private apiURL = environment.apiURL + '/corrosividad';

  public obtenerTodos(id: number){
    return this.http.get<corrosividadDTO>(`${this.apiURL}/index?id=${id}`);
  }

  public obtenerPorPadre(id: number){
    return this.http.get<corrosividadDTO[]>(`${this.apiURL}/ReadByXXX?id=${id}`);
  }

  public obtenerUno(id: number){
    return this.http.get<corrosividadDTO>(`${this.apiURL}/readBy?id=${id}`);
  }

   public crear(codigo: corrosividadCreacionDTO) {
       return this.http.post(this.apiURL, codigo);
   }

   public actualizar(codigo: corrosividadCreacionDTO) {
       return this.http.put(this.apiURL, codigo);
   }

   public borrar(id: number) {
        return this.http.delete(`${this.apiURL}?id=${id}`);
   }

}

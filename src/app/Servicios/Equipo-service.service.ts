import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { equipoDTO, equipoCreacionDTO } from '../Entidades/equipo';

@Injectable({ providedIn: 'root'})
export class EquipoServiceService {
  constructor( private http: HttpClient) { }
  private apiURL = environment.apiURL + '/equipo';

  public obtenerTodos(){
    return this.http.get<equipoDTO[]>(`${this.apiURL}/index`);
  }

  public obtenerPorPadre(id: number){
    return this.http.get<equipoDTO[]>(`${this.apiURL}/ReadBySector?id=${id}`);
  }

  public obtenerUno(id: number){
    return this.http.get<equipoDTO>(`${this.apiURL}/readBy?id=${id}`);
  }

   public crear(codigo: equipoCreacionDTO) {
       return this.http.post(this.apiURL, codigo);
   }

   public actualizar(codigo: equipoCreacionDTO) {
       return this.http.put(this.apiURL, codigo);
   }

   public borrar(id: number) {
        return this.http.delete(`${this.apiURL}?id=${id}`);
   }

}

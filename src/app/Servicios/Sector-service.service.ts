import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { sectorDTO, sectorCreacionDTO } from '../Entidades/sector';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root'})
export class SectorServiceService {
  constructor( private http: HttpClient) { }
  private apiURL = environment.apiURL + '/sector';

  public obtenerTodos(){
    return this.http.get<sectorDTO[]>(`${this.apiURL}/index`);
  }

  public obtenerPorPadre(id: number){
    return this.http.get<sectorDTO[]>(`${this.apiURL}/ReadByXXX?id=${id}`);
  }

  public obtenerUno(id: number){
    return this.http.get<sectorDTO>(`${this.apiURL}/readBy?id=${id}`);
  }

   public crear(codigo: sectorCreacionDTO) {
       return this.http.post(this.apiURL, codigo);
   }

   public actualizar(codigo: sectorCreacionDTO) {
       return this.http.put(this.apiURL, codigo);
   }

   public borrar(id: number) {
        return this.http.delete(`${this.apiURL}?id=${id}`);
   }

}

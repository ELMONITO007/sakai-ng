import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pcbDTO, pcbCreacionDTO } from '../Entidades/pcb';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root'})
export class PCBServiceService {
  constructor( private http: HttpClient) { }
  private apiURL = environment.apiURL + '/Pcb';

  public obtenerTodos(id: number){
    return this.http.get<pcbDTO>(`${this.apiURL}/index?id=${id}`);
  }

  public obtenerPorPadre(id: number){
    return this.http.get<pcbDTO[]>(`${this.apiURL}/ReadByXXX?id=${id}`);
  }

  public obtenerUno(id: number){
    return this.http.get<pcbDTO>(`${this.apiURL}/readBy?id=${id}`);
  }

   public crear(codigo: pcbCreacionDTO) {
       return this.http.post(this.apiURL, codigo);
   }

   public actualizar(codigo: pcbCreacionDTO) {
       return this.http.put(this.apiURL, codigo);
   }

   public borrar(id: number) {
        return this.http.delete(`${this.apiURL}?id=${id}`);
   }

}

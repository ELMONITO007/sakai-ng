import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { cubaCreacionDTO, cubaDTO } from '../Entidades/cuba';

@Injectable({ providedIn: 'root'})
export class CubaServiceService {
  constructor( private http: HttpClient) { }
  private apiURL = environment.apiURL + '/cuba';

  public obtenerTodos(){
    return this.http.get<cubaDTO[]>(`${this.apiURL}/index`);
  }

  public obtenerPorPadre(id: number){
    return this.http.get<cubaDTO[]>(`${this.apiURL}/ReadLibreLaboratorio?id=${id}`);
  }

  public ReadLaboratorio(id: number){
    return this.http.get<cubaDTO[]>(`${this.apiURL}/ReadLaboratorio?id=${id}`);
  }

  public obtenerUno(id: number){
    return this.http.get<cubaDTO>(`${this.apiURL}/readBy?id=${id}`);
  }

   public crear(codigo: cubaCreacionDTO) {
       return this.http.post(this.apiURL, codigo);
   }

   public actualizar(codigo: cubaCreacionDTO) {
       return this.http.put(this.apiURL, codigo);
   }

   public borrar(id: number) {
        return this.http.delete(`${this.apiURL}?id=${id}`);
   }

}

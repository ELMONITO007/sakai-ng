import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tipoAnalisisDTO, tipoAnalisisCreacionDTO } from '../Entidades/tipoAnalisis';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root'})
export class TipoAnalisisServiceService {
  constructor( private http: HttpClient) { }
  private apiURL = environment.apiURL + '/tipoAnalisis';

  public obtenerTodos(){
    return this.http.get<tipoAnalisisDTO[]>(`${this.apiURL}/index`);
  }

  public obtenerPorPadre(id: number){
    return this.http.get<tipoAnalisisDTO[]>(`${this.apiURL}/ReadByXXX?id=${id}`);
  }

  public obtenerUno(id: number){
    return this.http.get<tipoAnalisisDTO>(`${this.apiURL}/readBy?id=${id}`);
  }

   public crear(codigo: tipoAnalisisCreacionDTO) {
       return this.http.post(this.apiURL, codigo);
   }

   public actualizar(codigo: tipoAnalisisCreacionDTO) {
       return this.http.put(this.apiURL, codigo);
   }

   public borrar(id: number) {
        return this.http.delete(`${this.apiURL}?id=${id}`);
   }

}

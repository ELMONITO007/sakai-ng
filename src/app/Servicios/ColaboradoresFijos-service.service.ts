import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { colaboradoresFijosDTO, colaboradoresFijosCreacionDTO } from '../Entidades/colaboradoresFijos';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root'})
export class ColaboradoresFijosServiceService {
  constructor( private http: HttpClient) { }
  private apiURL = environment.apiURL + '/colaboradoresFijos';

  public obtenerTodos(){
    return this.http.get<colaboradoresFijosDTO[]>(`${this.apiURL}/index`);
  }

  public obtenerPorPadre(id: number){
    return this.http.get<colaboradoresFijosDTO[]>(`${this.apiURL}/ReadByXXX?id=${id}`);
  }

  public obtenerUno(id: number){
    return this.http.get<colaboradoresFijosDTO>(`${this.apiURL}/readBy?id=${id}`);
  }

   public crear(codigo: colaboradoresFijosCreacionDTO) {
       return this.http.post(this.apiURL, codigo);
   }

   public actualizar(codigo: colaboradoresFijosCreacionDTO) {
       return this.http.put(this.apiURL, codigo);
   }

   public borrar(id: number,id_SectorDetalle: number) {
       return this.http.delete(`${this.apiURL}?id=${id}&id_SectorDetalle=${id_SectorDetalle}`);
      
   }

}

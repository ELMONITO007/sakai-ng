import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { laboratorioDTO, laboratorioCreacionDTO } from '../Entidades/laboratorio';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root'})
export class LaboratorioServiceService {
  constructor( private http: HttpClient) { }
  private apiURL = environment.apiURL + '/laboratorio';

  public obtenerTodos(){
    return this.http.get<laboratorioDTO[]>(`${this.apiURL}/index`);
  }

  public obtenerPorPadre(id: number){
    return this.http.get<laboratorioDTO[]>(`${this.apiURL}/ReadByXXX?id=${id}`);
  }

  public obtenerUno(id: number){
    return this.http.get<laboratorioDTO>(`${this.apiURL}/readBy?id=${id}`);
  }

   public crear(codigo: laboratorioCreacionDTO) {
       return this.http.post(this.apiURL, codigo);
   }

   public actualizar(codigo: laboratorioCreacionDTO) {
       return this.http.put(this.apiURL, codigo);
   }

   public borrar(id: number) {
        return this.http.delete(`${this.apiURL}?id=${id}`);
   }

}

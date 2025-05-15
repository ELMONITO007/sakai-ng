import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { contenidoFuranoDTO, contenidoFuranoCreacionDTO } from '../Entidades/contenidoFurano';
import { environment } from '../environments/environment';


@Injectable({ providedIn: 'root'})
export class ContenidoFuranoServiceService {
  constructor( private http: HttpClient) { }
  private apiURL = environment.apiURL + '/contenidoFurano';

  public obtenerTodos(id: number){
    return this.http.get<contenidoFuranoDTO>(`${this.apiURL}/index?id=${id}`);
  }

  public obtenerPorPadre(id: number){
    return this.http.get<contenidoFuranoDTO[]>(`${this.apiURL}/ReadByXXX?id=${id}`);
  }

  public obtenerUno(id: number){
    return this.http.get<contenidoFuranoDTO>(`${this.apiURL}/readBy?id=${id}`);
  }
  public ObtenerDiagnostico(id: number) {
    return this.http.get<string>(`${this.apiURL}/ObtenerDiagnostico?id=${id}`);
  }
   public crear(codigo: contenidoFuranoCreacionDTO) {
       return this.http.post(this.apiURL, codigo);
   }

   public actualizar(codigo: contenidoFuranoCreacionDTO) {
       return this.http.put(this.apiURL, codigo);
   }

   public borrar(id: number,email: string) {
        return this.http.delete(`${this.apiURL}?id=${id}&email=${email}`);
  
   }

}

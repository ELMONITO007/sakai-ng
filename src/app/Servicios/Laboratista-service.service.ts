import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { laboratistaDTO, laboratistaCreacionDTO } from '../Entidades/laboratista';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root'})
export class LaboratistaServiceService {
  constructor( private http: HttpClient) { }
  private apiURL = environment.apiURL + '/laboratista';

  

   public crear(codigo: laboratistaCreacionDTO) {
       return this.http.post(this.apiURL, codigo);
   }



   public borrar(id: number,id_laboratorio: number) {
       return this.http.delete(`${this.apiURL}?id=${id}&id_laboratorio=${id_laboratorio}`);
   
   }

}

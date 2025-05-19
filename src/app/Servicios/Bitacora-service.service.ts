import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { bitacoraDTO } from '../Entidades/bitacora';

@Injectable({ providedIn: 'root'})
export class BitacoraServiceService {
  constructor( private http: HttpClient) { }
  private apiURL = environment.apiURL + '/bitacora';



  public obtenerPorPadre(id: number){
    return this.http.get<bitacoraDTO[]>(`${this.apiURL}/index?id=${id}`);
  }

  

}

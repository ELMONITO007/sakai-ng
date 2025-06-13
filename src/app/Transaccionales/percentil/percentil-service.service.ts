import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { percentilDTO } from './percentil';

@Injectable({
  providedIn: 'root'
})
export class PercentilServiceService {

constructor( private http: HttpClient) { }
  private apiURL = environment.apiURL + '/ParametroAceite';
  getPercentil(id: number) {
   return this.http.get<percentilDTO[]>(`${this.apiURL}/index?id=${id}`);
  }

  getRigidez(id: number) {
    return this.http.get<string>(`${this.apiURL}/ObtenerDiagnosticoRigidez?id=${id}`);
   }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { fisicoQuimicoDTO, fisicoQuimicoCreacionDTO } from '../Entidades/fisicoQuimico';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class FisicoQuimicoServiceService {
  constructor(private http: HttpClient) { }
  private apiURL = environment.apiURL + '/fisicoQuimico';

  public obtenerTodos(id: number) {
    return this.http.get<fisicoQuimicoDTO>(`${this.apiURL}/index?id=${id}`);
  }

  public obtenerPorPadre(id: number) {
    return this.http.get<fisicoQuimicoDTO[]>(`${this.apiURL}/ReadByXXX?id=${id}`);
  }

  public obtenerUno(id: number) {
    return this.http.get<fisicoQuimicoDTO>(`${this.apiURL}/readBy?id=${id}`);
  }
  public ObtenerDiagnostico(id: number) {
    return this.http.get<string>(`${this.apiURL}/ObtenerDiagnostico?id=${id}`);
  }
  public crear(codigo: fisicoQuimicoCreacionDTO) {
    return this.http.post(this.apiURL, codigo);
  }

  public actualizar(codigo: fisicoQuimicoCreacionDTO) {
    return this.http.put(this.apiURL, codigo);
  }

  public borrar(id: number) {
    return this.http.delete(`${this.apiURL}?id=${id}`);
  }

}

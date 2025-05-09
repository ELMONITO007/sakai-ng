import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { agdDTO, agdCreacionDTO } from '../Entidades/agd';
import { environment } from '../environments/environment';


@Injectable({ providedIn: 'root'})
export class AgdServiceService {
  constructor( private http: HttpClient) { }
  private apiURL = environment.apiURL + '/agd';
  private apiURLReporte = environment.apiURL + '/ParametroAceite';


  public obtenerTodos(id: number): Observable<agdDTO> {
    return this.http.get<agdDTO>(`${this.apiURL}/index?id=${id}`);
  }

  public obtenerPorPadre(id: number){
    return this.http.get<agdDTO[]>(`${this.apiURL}/ReadByXXX?id=${id}`);
  }
  

  public GasesClavesResultado(id: number) {
    return this.http.get<string[]>(`${this.apiURL}/GasesClavesResultado?id=${id}`);
  }

  public RatioMethod(id: number) {
    return this.http.get<string[]>(`${this.apiURL}/RatioMethod?id=${id}`);
  }
  public GasesClaves(id: number){
    return this.http.get<string>(`${this.apiURL}/GasesClaves?id=${id}`);
  }
  public obtenerUno(id: number){
    return this.http.get<agdDTO>(`${this.apiURL}/readBy?id=${id}`);
  }
  public ObtenerDiagnostico(id: number) {
    return this.http.get<string>(`${this.apiURL}/ObtenerDiagnostico?id=${id}`);
  }
   public crear(codigo: agdCreacionDTO) {
       return this.http.post(this.apiURL, codigo);
   }

   public actualizar(codigo: agdCreacionDTO) {
       return this.http.put(this.apiURL, codigo);
   }

   public borrar(id: number) {
        return this.http.delete(`${this.apiURL}?id=${id}`);
   }

}

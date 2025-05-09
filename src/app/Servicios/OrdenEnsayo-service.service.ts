import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ordenEnsayoDTO, ordenEnsayoCreacionDTO, ensayosRealizarDTO } from '../Entidades/ordenEnsayo';
import { environment } from '../environments/environment';


@Injectable({ providedIn: 'root' })
export class OrdenEnsayoServiceService {
  constructor(private http: HttpClient) {}
  private apiURL = environment.apiURL + '/ordenEnsayo';

  public obtenerTodos() {
    return this.http.get<ordenEnsayoDTO[]>(`${this.apiURL}/index`);
  }

  public Ensayos(id: number) {
    return this.http.get<string[]>(`${this.apiURL}/Ensayos?id=${id}`);
  }

    public obtenerPorEquipo(id: number) {
    return this.http.get<ordenEnsayoDTO[]>(`${this.apiURL}/ReadByEquipo?id=${id}`);
  }
  public ReadbyLaboratista(id: string) {
    return this.http.get<ordenEnsayoDTO[]>(`${this.apiURL}/ReadbyLaboratista?id=${id}`);
  }
  public obtenerUno(id: number) {
    return this.http.get<ordenEnsayoDTO>(`${this.apiURL}/readBy?id=${id}`);
  }
  
  public CerrarOrden(codigo: ordenEnsayoCreacionDTO) {
    return this.http.post(`${this.apiURL}/CerrarOrden`, codigo);
  }
  
  public AsignarCuba(codigo: ordenEnsayoCreacionDTO) {
    return this.http.post(`${this.apiURL}/AsignarCuba`, codigo);
  }
  public RecibirCuba(codigo: ordenEnsayoCreacionDTO) {
    return this.http.post(`${this.apiURL}/RecibirCuba`, codigo);
  }
  public crear(codigo: ordenEnsayoCreacionDTO) {
    return this.http.post<ordenEnsayoDTO>(this.apiURL, codigo);
  }
  public crearEnsayos(codigo: ensayosRealizarDTO) {
    return this.http.post(`${this.apiURL}/CrearEnsayos`, codigo);
  }
  public actualizar(codigo: ordenEnsayoCreacionDTO) {
    return this.http.put(this.apiURL, codigo);
  }

  public borrar(id: number) {
    return this.http.delete(`${this.apiURL}?id=${id}`);
  }
}

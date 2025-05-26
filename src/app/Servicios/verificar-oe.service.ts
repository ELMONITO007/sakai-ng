import { Injectable } from '@angular/core';
import { UsuarioServiceService } from './Usuario-service.service';
import { OrdenEnsayoServiceService } from './OrdenEnsayo-service.service';
import { usuarioDTO } from '../Entidades/usuario';
import { ordenEnsayoDTO } from '../Entidades/ordenEnsayo';

@Injectable({
    providedIn: 'root'
})
export class VerificarOEService {
    constructor(
        private usuarioService: UsuarioServiceService,
        private service: OrdenEnsayoServiceService
    ) {}

    usuario: usuarioDTO;
    oe: ordenEnsayoDTO;
    puedeEditar: boolean = false;
    estaAbierto: boolean = false;
    puedeEditarOE(id: number): boolean {
        let puedeEditar = false;
        this.usuarioService.getUsuarioLogeado().subscribe((data: any) => {
            this.usuario = data;
            this.service.obtenerUno(id).subscribe((orden: any) => {
                this.oe = orden;
                if (this.usuario.puesto === 'Administrador' || this.usuario.puesto === 'Laboratista') {
                    this.puedeEditar = true;
                }
                if (this.oe.estado === 'En Proceso') {
                    this.estaAbierto = true;
                }
                if (this.puedeEditar && this.estaAbierto) {
                  puedeEditar = true;
                }
                console.log('adentro:', this.puedeEditar);
            });
        });
        console.log('fuera:', this.puedeEditar);

        return puedeEditar;
    }
}

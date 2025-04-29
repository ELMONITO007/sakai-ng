export interface usuarioDTO{
  id_Usuario:number,
  nombre:string,
  apellido:string,
  email:string,
  userName:string,
  contraseña:string,
  puesto:string,
  bloqueado:boolean,
  cantidadIntentos:number,
}


export interface usuarioCreacionDTO{
  id_Usuario:number,
  nombre:string,
  apellido:string,
  email:string,
  userName:string,
  contraseña:string,
  puesto:string,
  bloqueado:boolean,
  cantidadIntentos:number,
}

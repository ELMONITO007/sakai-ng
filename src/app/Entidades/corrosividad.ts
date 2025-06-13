export interface corrosividadDTO{
id_Corrosividad:number,
  determinacionCorrosivoCobre:boolean,
  determinacionCorrosivoPlata:boolean,
  potencialmenteCorrosivoCobre:boolean,
  potencialmenteCorrosivoPapel:boolean,
  contendioDBDS:number,
  contenidoPasivador:number,
  id_OrdenEnsayo:number,
  fechaSubida:string,
  fechaEnsayo:string,
  linkArchivo:string,
  observaciones?: string,
}


export interface corrosividadCreacionDTO{
  id_Corrosividad:number,
  determinacionCorrosivoCobre:boolean,
  determinacionCorrosivoPlata:boolean,
  potencialmenteCorrosivoCobre:boolean,
  potencialmenteCorrosivoPapel:boolean,
  contendioDBDS:number,
  contenidoPasivador:number,
  id_OrdenEnsayo:number,
  fechaSubida:string,
  fechaEnsayo:string,
  linkArchivo:string,
    observaciones?: string,
}

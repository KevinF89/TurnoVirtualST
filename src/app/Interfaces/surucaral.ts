export interface Sucursal {
    Id:number,
    Address?:string,
    Description?:string,
    Name:string,
    ParentUnitId?:number,
    TelNumber?:string

}

export class ResSucursal{
    
    Respuesta:string;
    Descripcion:string;
    Error:string;
   Sucursales:Sucursal[]

}

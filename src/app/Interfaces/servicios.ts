export interface Servicios {
    Id: number;
    ExtRef:string;
    Name?: string;
    
}


export class SerRespuesta {
   
     Respuesta:string
   
     Descripcion:string
   
     Error:string
   
    Servicios:Servicios[]

}
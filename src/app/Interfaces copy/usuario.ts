export interface Usuario {
   
        IdUser: number;
        Nombres?: string;
        Apellidos?:string;
        imagen?: any;
        Documento?: string;//Documento usuario autenticado
        TipoDocumento?:number;//Tipo docuemnto usuario autenticado
        DesTipoDocumento:string;
        tipoUsuario?: string;
        Servicio?: string;
        Ciudad?: string;
        Telefoco?: string;
        Celular?:number;
        Email?:string;  
        Token?:string;
    
    
}

export class UsRespuesta {
       
         Respuesta:string
       
         Descripcion:string
       
         Error:string
       
        Usuario:Usuario

}

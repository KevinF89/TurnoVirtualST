import { Mensaje } from '../Interfaces/mensaje';

export interface CargueNovedades {
        valido:boolean;
        url:string;
        error:string;
        pdf:string;
        descripcion:string;
    
}

export class Carguearchivo {

    IdUser:number;
    EmpleadorId:string;
    EmpleadorTipoId:string;
    Archivo:string;

}    

export class Modelo {

    mensaje?: Mensaje;
    noRegistros?: number;
    nombreArchivo?: string;
    extensionArchivo?: string;
    path?: string;
    pathOriginal?: string;
    listaLineas?: string[];
    bRedireccionarAutomatico?: boolean;
}
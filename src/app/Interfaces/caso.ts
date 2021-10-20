export interface Caso {
    Active
    CaseId
    CustomerId
    InitialServiceId
    QCode
    QNumber
    ReferenceDate
    Status
}

export class CasoRespuesta {
   
    Respuesta:string
  
    Descripcion:string
  
    Error:string
  
    CantAsesores:number;

   Caso:Caso

}
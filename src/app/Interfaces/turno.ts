export interface Turno {
CaseId
CustomerId
EnqueueDate
Notes
ProcessId
QCode
QNumber
ServiceId
SetQueuePosition
TicketId
UserId
}

export class ResTurno
{
    Respuesta:string;
    Descripcion:string;
    Error:string;
   Turno:Turno
}

export interface Rescancelacion{
    Respuesta:string;
    Descripcion:string;
    Error:string;
   cancelacion:objCancelacion;
}
export class objCancelacion
{
    CurrentProcessID:number;
    UserStatus:string;
}

export class ResCola
{
    
        Respuesta:string
        
        Descripcion:string
        
        Error:string
        
        TurnoActual:string
        
        IdCaso:number
        
        Estado:string
        
        CantEspera:number
}

export class ResCantUsers
{
    
        Respuesta:string
        
        Descripcion:string
        
        Error:string
        
        CantUsers:number
        

}
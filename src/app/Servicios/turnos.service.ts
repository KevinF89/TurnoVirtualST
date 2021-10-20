import { Injectable, OnInit} from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Usuario,UsRespuesta} from '../interfaces/usuario';
import {Servicios,SerRespuesta} from '../interfaces/servicios';
import {Sucursal,ResSucursal} from '../interfaces//surucaral';
import { DropdownListClass} from '../interfaces/dropdown-list-class';
import {STResponse,RespuestaApi,ProcessResul} from'../Interfaces/strresponse';
import {Caso,CasoRespuesta} from'../Interfaces/caso';
import {Turno,ResTurno,Rescancelacion,ResCola,ResCantUsers} from '../Interfaces/turno';
import { Archivos} from '../Interfaces/archivos';


@Injectable({
  providedIn: 'root'
})
export class TurnosService {


  urlGetDocumentos: string;
  UrlTokenQflow: string;
  UrlGetToken:string;
  //ListaOperadores: OperadorPila[];
  ID_Autorizaciones: number = 1;
  constructor(private http: HttpClient) {
    //this.ListaOperadores = JSON.parse(sessionStorage.getItem('menuRecaudos'));

   }

  
  GenerarTurno(JWT:string,Token:string,IdServicio:number,IdUsuario:number,Notas:string,prioridad:any): Promise<ResTurno>{
    return new Promise((resolve,reject)=>{
      try{
        //debugger;
        this.UrlTokenQflow = JSON.parse(sessionStorage.getItem('configTurnos')).urlApiTurnos + 'Turnos/SolicitarTurno';
        this.UrlTokenQflow = this.UrlTokenQflow+'?Token='+Token+'&IdServicio='+IdServicio+'&IdUsuario='+IdUsuario+'&Notas='+Notas+'&prioridad='+prioridad;
        this.get(this.UrlTokenQflow,true,JWT).subscribe((params: ResTurno) =>{
          //debugger;
          resolve(params);
        })
      } catch(ex){
        reject(ex);
      }
    })
  }

  ConsTurnos(JWT:string,Token:string,IdServicio:number): Promise<ResCola>{
    return new Promise((resolve,reject)=>{
      try{
        //debugger;
        this.UrlTokenQflow = JSON.parse(sessionStorage.getItem('configTurnos')).urlApiTurnos + 'Turnos/NumeroTurnos';
        this.UrlTokenQflow = this.UrlTokenQflow+'?Token='+Token+'&IdServicio='+IdServicio;
        this.get(this.UrlTokenQflow,true,JWT).subscribe((params: ResCola) =>{
          //debugger;
          resolve(params);
        })
      } catch(ex){
        reject(ex);
      }
    })
  }

  // CantUsers(JWT:string,Token:string,IdServicio:number): Promise<ResCantUsers>{
  //   return new Promise((resolve,reject)=>{
  //     try{
  //       //debugger;
  //       this.UrlTokenQflow = JSON.parse(sessionStorage.getItem('configTurnos')).urlApiTurnos + 'Turnos/NumeroAsesores';
  //       this.UrlTokenQflow = this.UrlTokenQflow+'?Token='+Token+'&IdUnidad='+IdServicio;
  //       this.get(this.UrlTokenQflow,true,JWT).subscribe((params: ResCantUsers) =>{
  //         //debugger;
  //         resolve(params);
  //       })
  //     } catch(ex){
  //       reject(ex);
  //     }
  //   })
  // }


  SubirArchivos(JWT:string,Archivo:Archivos): Promise<RespuestaApi>{
    return new Promise((resolve,reject)=>{
      try{
        debugger;
        this.UrlTokenQflow = JSON.parse(sessionStorage.getItem('configTurnos')).urlApiTurnos + 'Adjuntos/';
        let metodo:string = 'AdjuntarArchivos?Token=' +Archivo.Token + '&IdUsuario='+Archivo.IdUsuario+'&Idcaso='+Archivo.Idcaso+'&nombre='+Archivo.nombre;
        let formData:FormData = new FormData();
        formData.append('uploadFile', Archivo.Archivo, Archivo.nombre);
        this.post(this.UrlTokenQflow,metodo,formData,true,JWT).subscribe((params: RespuestaApi) =>{
          //debugger;
          resolve(params);
        })
      } catch(ex){
        reject(ex);
      }
    })
  }

  ObtenerTurno(JWT:string,Token:string,IdProceso:number): Promise<SerRespuesta>{
    ////debugger;
   return new Promise((resolve,reject)=>{
     try{
       this.urlGetDocumentos = JSON.parse(sessionStorage.getItem('configTurnos')).urlApiTurnos + 'Procesos/ConsultarProceso?Token='+Token+'&IdProceso='+IdProceso;
       this.get(this.urlGetDocumentos,true,JWT).subscribe((params: SerRespuesta) =>{
         ////debugger
         resolve(params);
       })
     } catch(ex){
       reject(ex);
     }
   })
 }

 CancelarTurno(JWT:string,Token:string,IdProceso:number,IdUsuario:number): Promise<Rescancelacion>{
  ////debugger;
 return new Promise((resolve,reject)=>{
   try{
     this.urlGetDocumentos = JSON.parse(sessionStorage.getItem('configTurnos')).urlApiTurnos + 'Procesos/CancelarProceso?Token='+Token+'&IdProceso='+IdProceso+'&IdUsuario='+IdUsuario;
     this.get(this.urlGetDocumentos,true,JWT).subscribe((params: Rescancelacion) =>{
       ////debugger
       resolve(params);
     })
   } catch(ex){
     reject(ex);
   }
 })
}

 ObtenerCaso(JWT:string,Token:string,IdCaso:number): Promise<CasoRespuesta>{
  ////debugger;
 return new Promise((resolve,reject)=>{
   try{
     this.urlGetDocumentos = JSON.parse(sessionStorage.getItem('configTurnos')).urlApiTurnos + 'Adjuntos/ConsultarCaso?Token='+Token+'&IdCaso='+IdCaso;
     this.get(this.urlGetDocumentos,true,JWT).subscribe((params: CasoRespuesta) =>{
       ////debugger
       resolve(params);
     })
   } catch(ex){
     reject(ex);
   }
 })
}

ObtenerCasoDelUser(JWT:string,Token:string,Usuario:number): Promise<ProcessResul>{
  ////debugger;
 return new Promise((resolve,reject)=>{
   try{
     this.urlGetDocumentos = JSON.parse(sessionStorage.getItem('configTurnos')).urlApiTurnos + 'Usuarios/ConsultarProcesoXUser?Token='+Token+'&IdUsuario='+Usuario;
     this.get(this.urlGetDocumentos,true,JWT).subscribe((params: ProcessResul) =>{
       ////debugger
       resolve(params);
     })
   } catch(ex){
     reject(ex);
   }
 })
}




// private getEmpleador(Tipodoc:string,Doc:string){

//    //let headers = new HttpHeaders().set('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImVlNTZhZTMyLTdlNTktNGIzZC1iOTRhLTg0OTYxZGQ2ZDM1MCIsIm5iZiI6MTU3ODYwNTAxNiwiZXhwIjoxNTc4NjA2ODE2LCJpYXQiOjE1Nzg2MDUwMTYsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDkyMjAiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjQ5MjIwIn0.zisPpXtsyBGEjBVpDlIFnor_KUqWoBTrCTePGWB68G0');

//   this.UrlEstadoCuenta = JSON.parse(sessionStorage.getItem('configRecaudos')).urlAPiRecudos + JSON.parse(sessionStorage.getItem('configRecaudos')).MetodoConsultarEmp;
//   this.UrlEstadoCuenta = this.UrlEstadoCuenta + '?Documento='+Doc+'&TipoDocumento='+Tipodoc;
//   //return this.http.get(this.UrlEstadoCuenta   /*,{headers: headers}*/);
  
// }
private get(url:string,auth:boolean, token?:string){
 
  //this.urlGetDocumentos = JSON.parse(sessionStorage.getItem('configRecaudos')).urlGetDocumentos;

  if(auth){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':  token });
      let options = { headers: headers };
      
      return this.http.get(url,options);
  }else{
    return this.http.get(url);
  
}
}
private post(url:string,metodo:string, body: any, auth:boolean, token?:string){
  // if (!this.urlAdminUsuarios){
  //   this.urlAdminUsuarios = JSON.parse(sessionStorage.getItem('configRecaudos')).urlApiAdminUsuarios;
  // }
    if(auth){
      //debugger;
      let headers = new HttpHeaders({
        //'Content-Type': 'multipart/form-data',
        'Authorization':  token });
        let options = { headers: headers };
        
        return this.http.post(`${ url }${ metodo }`, body, options);
    }else{
      return this.http.post(`${ url }${ metodo }`, body);
    }
  }


JWTAfil() {
  return new Promise((resolve,reject) =>{ 
      try{
        //debugger;
        this.UrlGetToken = JSON.parse(sessionStorage.getItem('configTurnos')).urlApiTurnos + 'Token/GetToken?Token=&Origen=OficinaVirtual';
        this.get(this.UrlGetToken,false).subscribe((response: STResponse) =>{
          if(!response.error){  
            resolve(response);
          }else{
            reject(response);
          }
        },
        (exception)=>{
          
        }
        );
      } 
      catch(ex) {
       
        reject(ex);
      }
    });
    
}

}

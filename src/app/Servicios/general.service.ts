import { Injectable, OnInit} from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Usuario,UsRespuesta} from '../Interfaces/usuario';
import { Servicios, SerRespuesta } from '../Interfaces/servicios';
import { Sucursal, ResSucursal } from '../Interfaces//surucaral';
import { DropdownListClass } from '../Interfaces/dropdown-list-class';
import {RespuestaserviciosH} from '../Interfaces/modelo'
import {STResponse,ResMensajes} from'../Interfaces/strresponse';


@Injectable({
  providedIn: 'root'
})
export class GeneralService {


  urlGetDocumentos: string;
  UrlTokenQflow: string;
  UrlGetToken:string;
  //ListaOperadores: OperadorPila[];
  ID_Autorizaciones: number = 1;
  constructor(private http: HttpClient) {
    //this.ListaOperadores = JSON.parse(sessionStorage.getItem('menuRecaudos'));

   }

   ObtenerCiudadesQF(JWT:string,Token:string): Promise<ResSucursal>{
     ////debugger;
    return new Promise((resolve,reject)=>{
      try{
        this.urlGetDocumentos = JSON.parse(sessionStorage.getItem('configTurnos')).urlApiTurnos + 'Sucursales/ConsultarSucursales?Token='+Token;
        this.get(this.urlGetDocumentos,true,JWT).subscribe((params: ResSucursal) =>{
          ////debugger
          resolve(params);
        })
      } catch(ex){
        reject(ex);
      }
    })
  }

  ObtenerTramitesQF(JWT:string,Token:string,IdCiudad:number): Promise<SerRespuesta>{
    ////debugger;
   return new Promise((resolve,reject)=>{
     try{
       this.urlGetDocumentos = JSON.parse(sessionStorage.getItem('configTurnos')).urlApiTurnos + 'Sucursales/ConsultarServicios?Token='+Token+'&UnitId='+IdCiudad;
       this.get(this.urlGetDocumentos,true,JWT).subscribe((params: SerRespuesta) =>{
         ////debugger
         resolve(params);
       })
     } catch(ex){
       reject(ex);
     }
   })
 }

 ObtenerServiciosH(JWT:string): Promise<RespuestaserviciosH>{
  ////debugger;
 return new Promise((resolve,reject)=>{
   try{
     this.urlGetDocumentos = JSON.parse(sessionStorage.getItem('configTurnos')).urlApiTurnos + 'SesionQflow/ConsultarServiciosHome';
     this.get(this.urlGetDocumentos,true,JWT).subscribe((params: RespuestaserviciosH) =>{
       ////debugger
       resolve(params);
     })
   } catch(ex){
     reject(ex);
   }
 })
}

  ObtenerTipoDocumento(JWT:string,Token:string): Promise<DropdownListClass>{
    
   return new Promise((resolve,reject)=>{
     try{
       this.urlGetDocumentos = JSON.parse(sessionStorage.getItem('configTurnos')).urlApiTurnos + 'Usuarios/ConsultarTDocumentos?Token='+Token;
       this.get(this.urlGetDocumentos,true,JWT).subscribe((params: DropdownListClass) =>{
         resolve(params);
       })
     } catch(ex){
       reject(ex);
     }
   })
 }


  ConsultarUsuarioQF(JWT:string,Token:string,Documento:string,TipoDocumento:string,Tipodocstring:string): Promise<UsRespuesta>{
    return new Promise((resolve,reject)=>{
      try{
        ////debugger;
        this.UrlTokenQflow = JSON.parse(sessionStorage.getItem('configTurnos')).urlApiTurnos + 'Usuarios/ConsultarUser';
        this.UrlTokenQflow = this.UrlTokenQflow+'?Token='+Token+'&Documento='+Documento+'&TipoDocumento='+TipoDocumento+'&tipostring='+Tipodocstring;
        this.get(this.UrlTokenQflow,true,JWT).subscribe((params: UsRespuesta) =>{
          ////debugger;
          resolve(params);
        })
      } catch(ex){
        reject(ex);
      }
    })
  }

  

  CrearUsuarioQF(JWT:string,User:Usuario): Promise<UsRespuesta>{
    return new Promise((resolve,reject)=>{
      try{
        ////debugger;
        this.UrlTokenQflow = JSON.parse(sessionStorage.getItem('configTurnos')).urlApiTurnos + 'Usuarios/';
        //this.UrlTokenQflow = this.UrlTokenQflow+'?Token='+Token+'&Documento='+Documento+'&TipoDocumento='+TipoDocumento;
        let body:any;
        
        this.post(this.UrlTokenQflow,"CrearUser",User,true,JWT).subscribe((params: UsRespuesta) =>{
          ////debugger;
          resolve(params);
        })
      } catch(ex){
        reject(ex);
      }
    })
  }



InicioSesionQF(JWT:string): Promise<STResponse>{
  return new Promise((resolve,reject)=>{
    try{
      ////debugger;
      this.UrlTokenQflow = JSON.parse(sessionStorage.getItem('configTurnos')).urlApiTurnos + 'SesionQflow/ConsultarToken';
      this.get(this.UrlTokenQflow,true,JWT).subscribe((params: STResponse) =>{
        resolve(params);
      })
    } catch(ex){
      reject(ex);
    }
  })
}


ConsultaHorario(JWT:string): Promise<ResMensajes>{
  return new Promise((resolve,reject)=>{
    try{
      ////debugger;
      this.UrlTokenQflow = JSON.parse(sessionStorage.getItem('configTurnos')).urlApiTurnos + 'SesionQflow/ConsultarHorario';
      this.get(this.UrlTokenQflow,true,JWT).subscribe((params: ResMensajes) =>{
        resolve(params);
      })
    } catch(ex){
      reject(ex);
    }
  })
}

ConsultaListaDocs(JWT:string,tramite:number): Promise<ResMensajes>{
  return new Promise((resolve,reject)=>{
    try{
      ////debugger;
      this.UrlTokenQflow = JSON.parse(sessionStorage.getItem('configTurnos')).urlApiTurnos + 'SesionQflow/ConsultarDocs?codigo='+tramite;
      this.get(this.UrlTokenQflow,true,JWT).subscribe((params: ResMensajes) =>{
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
      ////debugger;
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
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
        ////debugger;
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

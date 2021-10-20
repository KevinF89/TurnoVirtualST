import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Modelo} from 'src/app/Interfaces/modelo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mensaje, tipoMensaje, respuestaMensaje } from 'src/app/Interfaces/mensaje';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { process, State } from '@progress/kendo-data-query';
import localeEsAr from '@angular/common/locales/es-AR';
import { GlobalService } from 'src/app/Servicios/global.service';
import { GeneralService } from 'src/app/Servicios/general.service';
import { STResponse,RespuestaApi,ProcessResul} from 'src/app/Interfaces/strresponse';
import {DropdownListClass,ListaDocs} from 'src/app/Interfaces/dropdown-list-class'
import { Observable } from 'rxjs';
import { ComboBoxModule,DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { Usuario,UsRespuesta } from 'src/app/interfaces/usuario';
import { Sucursal,ResSucursal } from 'src/app/interfaces/surucaral';
import { anyChanged } from '@progress/kendo-angular-common';
import {Servicios,SerRespuesta} from 'src/app/interfaces/servicios';
import {TurnosService} from 'src/app/Servicios/turnos.service';
import {Turno,ResTurno,Rescancelacion,ResCola} from 'src/app/Interfaces/turno';
import { Archivos } from 'src/app/Interfaces/archivos';
import {Caso,CasoRespuesta} from'src/app/Interfaces/caso';
import { AlertaService } from 'src/app/Servicios/alerta.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { timer } from 'rxjs';
// registerLocaleData(localeEsAr);
//import { parse } from 'date-fns';
import $ from 'jquery'
import { numberSymbols } from '@telerik/kendo-intl';
import { Arc } from '@progress/kendo-drawing/dist/npm/geometry';
import { FnParam } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {
  public globalService:GlobalService;
  public lstTipoDoc:DropdownListClass;
  @Output() TimerExpired: EventEmitter<any> = new EventEmitter<any>();
  abrirVentana: boolean = false;
  mensaje: Mensaje = null;

consultarft:boolean=false;
  CodigoTicket:string;
  RespuestaCaso:CasoRespuesta;
  IdServicio:number;
  Caso:Caso;
  Cola:ResCola;
  Idcaso:number;
  labelestadogris:string;
  labelestadoazul:string;
  CasoActual:Caso;
  ListArchivos:Archivos;
  ListaDcs:ListaDocs[];
  listannos: Array<number>=[];
  Respuesta:UsRespuesta;
  ResSer:SerRespuesta;
  listramites:Servicios[];
  ListCiudad:Sucursal[];
  ResTurno:ResTurno;
  Turno:Turno;
  CantAsesores:number;
  IdProceso:number;
  Resul:ProcessResul;
  tiene:boolean=false;
  public modelo: Modelo = { };
  file: Array<any>=[];
  cargando: boolean = false;
  valtiempo:string;
 
  formConsulta : FormGroup;
consultado:boolean=false;
ResCity:ResSucursal;
  Edicion: boolean = false;
TipoDocText:string;
cancel:Rescancelacion;
 TurnoAtencion:string;
  usuario:Usuario =
  {
    IdUser:0,
DesTipoDocumento:null
  }

  Tiempo:number;
  _second = 1000;
  _minute = this._second * 60;
  _hour = this._minute * 60;
  end: any;
  now: any;
  day: any;
  hours: any;
  minutes: any=0;
  seconds: any=0;
  source = timer(0, 1000);
  clock: any;

  idModuloActual :number;
   textb:any;
   RespuestaArch:RespuestaApi;
  constructor(private router: Router,private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private generalService: GeneralService,
    private globalservices:GlobalService,
    private TurnosService:TurnosService,
    private Alerta:AlertaService,
    private SpinnerService: NgxSpinnerService) { 
      this.globalService = globalservices;
      this.tiene=this.globalService.yatiene;
      this.Tiempo=JSON.parse(sessionStorage.getItem('configTurnos')).Segundos;
      //////debugger;
      if(this.globalService.Turno == undefined)
      {
        this.SpinnerService.show();
      }
      
      this.cargarCombos();
      this.cargarCiudades();
      
      if(this.globalService.Turno != undefined)
      {
        this.ConsultarProcesUs();
      }
      
    }



  formSubir : FormGroup;


  


  ngOnInit() {
    this.formConsulta  =  this.formBuilder.group({
      txtNumeroIdentificacion:['',],
      ddlTipoIdentificacion:['',],
    });
    this.formSubir  =  this.formBuilder.group({

      fileDropRef:['',]
 
    });
  }


  cargarCombos(){
    try {
      
      this.generalService.JWTAfil().then(
        (res: STResponse) =>{
       
    this.globalService.JWT = res.Token;
    this.generalService.ObtenerTipoDocumento( this.globalService.JWT,this.globalService.Token).then((response:DropdownListClass)=>{
    
      this.lstTipoDoc = response;
      this.ListaDcs = this.lstTipoDoc.ListaDocs;
      this.SpinnerService.hide();
    });
  
  },
  (rej)=>{
    console.log(rej);
    
  }
  );
  }
  catch (error) {
    console.log(error);
    this.SpinnerService.hide();
    }
  }

  cargarCiudades(){
    try {
      
      this.generalService.JWTAfil().then(
        (res: STResponse) =>{
       //////debugger;
    this.globalService.JWT = res.Token;
    this.generalService.ObtenerCiudadesQF( this.globalService.JWT,this.globalService.Token).then((response:ResSucursal)=>{
      //////debugger;
      this.ResCity = response;
      this.ListCiudad = this.ResCity.Sucursales;
    });
  
  },
  (rej)=>{
    console.log(rej);
    
  }
  );
  }
  catch (error) {
    console.log(error);
    }
  }


  PreguntarCancelacion()
  {
    this.mensaje = {
      tipo: tipoMensaje.Confirmacion,
      mensaje: "¿Realmente deseas cancelar el turno?"
    }
    this.abrirVentana = true;
  }
  CancelarTurno()
  {
    try {
      this.SpinnerService.show();
      this.generalService.JWTAfil().then(
        (res: STResponse) =>{
       ////debugger;
     
       let idprocess:number;
       idprocess=this.IdProceso;
    this.globalService.JWT = res.Token;
    this.TurnosService.CancelarTurno( this.globalService.JWT,this.globalService.Token,idprocess,this.globalService.usuario.IdUser).then((response:Rescancelacion)=>{
      ////debugger;
      this.cancel=response;

    if(this.cancel.Respuesta=="1")
    {
      this.mensaje = {
        tipo: tipoMensaje.Informacion,
        mensaje: "Se ha cancelado el turno"
      }
      this.abrirVentana = true;    
      this.SpinnerService.hide();
     
    }

    });
  
  },
  (rej)=>{
    console.log(rej);
    
  }
  );
  }
  catch (error) {
    console.log(error);
    }
  }



   delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}


  ConsultarTurno(){
    try {
      this.SpinnerService.show();
      
      
      this.generalService.JWTAfil().then(
        (res: STResponse) =>{
       ////debugger;
       let idprocess:number;
       idprocess=this.Idcaso;
    this.globalService.JWT = res.Token;
    this.TurnosService.ObtenerCaso( this.globalService.JWT,this.globalService.Token,idprocess).then((response:CasoRespuesta)=>{
      debugger;
     this.RespuestaCaso=response;
     this.Caso=this.RespuestaCaso.Caso;
     this.IdServicio=this.RespuestaCaso.Caso.InitialServiceId
     this.CantAsesores = this.RespuestaCaso.CantAsesores;
     this.CodigoTicket=this.Caso.QCode+this.Caso.QNumber;
     if(response.Caso.Status==1)
     {
      this.TurnoAtencion=this.CodigoTicket;
      this.labelestadoazul="¡Tu solicitud fue resuelta!";
      this.labelestadogris="Verifica en tu correo electrónico la respuesta a tu solicitud";
      this.SpinnerService.hide();
      return;
     }
     
     if(this.Resul.Estado =="InService")
     {
      this.TurnoAtencion=this.CodigoTicket;
      this.labelestadoazul="Estamos dando solución a tu solicitud...";
      this.labelestadogris="Te notificaremos la solución a través del correo electrónico registrado, de lo contrario recibirás una llamada.";
      this.SpinnerService.hide();
      return;
     }
     this.Consultarcola();
     if(this.tiene){
      this.labelestadoazul="Actualmente tienes un turno en espera...";
      this.labelestadogris="En unos momentos será atendida tu solicitud";
      this.tiene=false;
      this.globalService.yatiene=false;
     }
     else{
      this.labelestadoazul="Por favor espera tu turno...";
      this.labelestadogris="";
     }
     

     
     
    //  this.delay(this.Tiempo*1000).then( (res:any)=>{$("#btnConsultar").attr('disabled',false);});
     this.calculartiempo();
     this.consultarft=false;
    });
  
  },
  (rej)=>{
    console.log(rej);
    
  }
  );
  }
  catch (error) {
    console.log(error);
    this.SpinnerService.hide();
    }
  }

  Consultarcola(){
    try {
      
      this.generalService.JWTAfil().then(
        (res: STResponse) =>{
       ////debugger;
       let idprocess:number;
       idprocess=this.Idcaso;
    this.globalService.JWT = res.Token;
    this.TurnosService.ConsTurnos( this.globalService.JWT,this.globalService.Token,this.IdServicio).then((response:ResCola)=>{
      ////debugger;
      this.Cola=response;
      this.TurnoAtencion=this.Cola.TurnoActual;
      this.SpinnerService.hide();
    });
  
  },
  (rej)=>{
    console.log(rej);
    
  }
  );
  }
  catch (error) {
    console.log(error);
    this.SpinnerService.hide();
    }
  }

  ConsultarProcesUs(){
    try {
      
      this.generalService.JWTAfil().then(
        (res: STResponse) =>{
       debugger;
   
    this.globalService.JWT = res.Token;
    this.TurnosService.ObtenerCasoDelUser( this.globalService.JWT,this.globalService.Token,this.globalService.usuario.IdUser).then((response:ProcessResul)=>{
      debugger;

     this.Resul=response;

     if(response.Respuesta=="2")
     {
      this.SpinnerService.hide();
      if(this.globalService.usuario.IdUser !=0){
       this.Alerta.error(response.Descripcion,true,4000);
       return;
       }
     }
     if(response.Respuesta=="1")
     {
        this.Idcaso=this.Resul.IDcaso;
        this.IdProceso=this.Resul.IdProcess;
        this.ConsultarTurno();
     }

    });
  
  },
  (rej)=>{
    console.log(rej);
    
  }
  );
  }
  catch (error) {
    console.log(error);
    this.SpinnerService.hide();
    }
  }
 /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFiles() {
    this.file =[];
    $("#fileDropRef").val('');
  }
  deleteFile(art) {
  ////debugger;
    //$("#fileDropRef").val('');
    for(let x=0;x<this.file.length;x++){
    if (this.file[x].name==art.name)
    {
      this.file.splice(x,1);
      // (x,1);
      return;
    }
}
  }
 
  async guardarArchivo(event) {
    //////debugger;
    try {
      this.cargando = true;
      // if(event.length > 1){
      //   this.cargando = false;
      //   this.modelo.mensaje = {
         
      //     mensaje: `Solo es posible ingresar un archivo`
      //   }
      //   this.abrirVentana = true;    
      //   return;
      // }
      //await this.borrarModelo();
      this.file = event;
      // if(this.file.size > (2 * 1024 * 1024)){
      //   this.cargando = false;
      //   this.modelo.mensaje = {
         
      //     mensaje: `¡El archivo excede el tamaño permitido de 2MB!`
      //   }
      //   this.abrirVentana = true;    
      //   return;
      // }
     
         
      let Arch:Archivos={Archivo:null,Idcaso:null,IdUsuario:null,nombre:null,Token:null};
      let nombre = this.file[0].name.split('.');
      this.modelo.extensionArchivo = nombre[nombre.length -1];
      this.modelo.nombreArchivo = this.file[0].name;
      this.modelo.pathOriginal = this.file[0].name;
     
    
      let ar:File = this.file[0];
       Arch.nombre=this.file[0].name;
      Arch.Archivo=ar;
        
       this.ListArchivos=Arch;
      ////debugger;
      
    
    } catch (ex) {
      this.IrAModulo(0,"");
      
    }
  }


  async borrarModelo(){
    return new Promise((resolve,reject)=>{
      try{
        // this.modelo.listaAutorizaciones = [];
        // this.modelo.listaEncabezadoArchivoError = [];
        // this.modelo.listaDetalleArchivoError = [];
        // this.modelo.listaResultadoAutorizacion = [];
        this.modelo.noRegistros = 0;
        // this.modelo.observaciones = '';
        // this.modelo.autorizacionesGeneradas = 0;
        // this.modelo.autorizacionesNoGeneradas = 0;
        this.modelo.nombreArchivo = '';
        this.modelo.extensionArchivo = '';
        // this.modelo.cerrar = true;
        // this.modelo.mostrarErroresCargue = false;
        // this.modelo.idEncabezadoArchivo = 0;
        this.modelo.pathOriginal = '';
        this.modelo.path = '';
        // this.modelo.bProcesoIncompleto = false;
        this.modelo.bRedireccionarAutomatico = false;
        resolve();
      } catch(ex){
        reject(ex);
      }
    });
  }

  ConsultarEmp(){
////debugger;
    let DocumentoId:string;
    let TipoDoc:string;
try {
this.consultarft=true;
  this.generalService.JWTAfil().then(
    (res: STResponse) =>{
this.globalService.JWT = res.Token;
  //let idempleador:string;
  //let tipodoc:string;
 ////debugger;
  
 
    if(this.formConsulta.invalid){
     
      //this.alertService.error("Debe diligenciar todos los campos",false);
      return;
    }
    DocumentoId=this.formConsulta.get('txtNumeroIdentificacion').value,
    TipoDoc=this.formConsulta.get('ddlTipoIdentificacion').value
    this.TipoDocText= this.ConsultarTipoDoc(this.formConsulta.get('ddlTipoIdentificacion').value);
//this.formUsuarioIPS.get('ddlEstado').value,
//this.formUsuarioIPS.get('txtNumeroIdentificacion').value,
this.activatedRoute.params.subscribe( params =>{
  //Inicio de modulo
  this.generalService.ConsultarUsuarioQF(this.globalService.JWT,this.globalService.Token,DocumentoId,TipoDoc, this.TipoDocText).then((params) => {
    //////debugger;
    this.Respuesta = params;
    if(this.Respuesta.Usuario != undefined)
    {
      this.usuario = this.Respuesta.Usuario;
      this.globalService.usuario=this.usuario;
      this.ConsultarProcesUs();
    }
    this.consultado=true;
    //this.TipoDocText= this.ConsultarTipoDoc(this.formGenTurno.get('ddlTipoIdentificacion').value);
  });
});

},
(rej)=>{
console.log(rej);

}

);
} catch (error) {
console.log(error);
this.IrAModulo(0,"");
}
}


ConsultarTipoDoc(id:number):string{
  ////debugger;
    let i:number;
    for(i=0;i<this.ListaDcs.length;i++)
    {
      if(this.ListaDcs[i].IdTipodoc==id)
      {
      return  this.ListaDcs[i].NTipodoc
      }
    }
}
SubirArchivos()
{
  
 

try {

this.generalService.JWTAfil().then(
  (res: STResponse) =>{
this.globalService.JWT = res.Token;

  ////debugger;
  
    let ResArchivo:RespuestaApi;
    let ObjArchivo:Archivos={Token:null,Archivo:null,nombre:null,IdUsuario:null,Idcaso:null};
    ObjArchivo=this.ListArchivos;
    ObjArchivo.Token=this.globalService.Token;
    ObjArchivo.Idcaso= this.Caso.CaseId;
    ObjArchivo.IdUsuario= this.usuario.IdUser;
     
    this.activatedRoute.params.subscribe( params =>{
    //Inicio de modulo
    this.TurnosService.SubirArchivos(this.globalService.JWT,ObjArchivo).then((params) => {
    //////debugger;
    ResArchivo = params;
    if(ResArchivo.Respuesta =="1")
    {
      this.deleteFiles();
      this.borrarModelo();
      this.Alerta.success("Se ha cargado el archivo",true,3000);
    }

  });
  });
    

 

},
(rej)=>{
console.log(rej);

}

);
} catch (error) {
console.log(error);
this.IrAModulo(0,"");
}
  
}


IrAModulo(id: number, ruta: string) {
  this.globalService.usuario.IdUser=0;
  this.router.navigate([ ruta , id ],{skipLocationChange:true});
}

calculartiempo(){

  $("#btnConsultar").attr('disabled','disabled');
this.minutes=0;
this.seconds=0;
this.end =  new Date();
this.end.setSeconds(this.end.getSeconds()+this.Tiempo)
if(this.consultarft==false){
  this.clock = this.source.subscribe(t => {

    this.now = new Date();
    if(this.minutes >=0 && this.seconds >=0){
    this.showDate();
  
  
    }
    else{
      //this.valtiempo="";
      this.TimerExpired.emit();
     
      
    }
  });
}



}
showDate(){
  let distance = this.end - this.now;
  this.minutes = Math.floor((distance % this._hour) / this._minute);
  this.seconds = Math.floor((distance % this._minute) / this._second);
  if(this.minutes >=0 && this.seconds >=0){
  this.valtiempo="Volver a consultar en "+ this.minutes + " minutos y " +this.seconds +" segundos";
}
else{
  $("#btnConsultar").attr('disabled',false);
 this.valtiempo="";
}
}
recibirRespuestaMensaje(respuesta: respuestaMensaje )
      {      
        ////debugger;
     if(respuesta==respuestaMensaje.Aceptar)
     {
      this.CancelarTurno();
      
     }
     if( this.mensaje.tipo == tipoMensaje.Informacion)
     {
       this.IrAModulo(0,"");
     }
     this.abrirVentana = false;
    }
    

}

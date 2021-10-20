import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Modelo} from 'src/app/Interfaces/modelo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { process, State } from '@progress/kendo-data-query';
import localeEsAr from '@angular/common/locales/es-AR';
import { GlobalService } from 'src/app/Servicios/global.service';
import { Mensaje, tipoMensaje, respuestaMensaje } from 'TurnoVirtualST/src/app/interfaces/mensaje';
import { GeneralService } from 'src/app/Servicios/general.service';
import { STResponse,RespuestaApi,ResMensajes} from 'src/app/Interfaces/strresponse';
import {DropdownListClass,ListaDocs} from 'src/app/Interfaces/dropdown-list-class'
import { Observable, VirtualTimeScheduler } from 'rxjs';
import { ComboBoxModule,DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { Usuario,UsRespuesta } from 'src/app/interfaces/usuario';
import { Sucursal,ResSucursal } from 'src/app/interfaces/surucaral';
import { anyChanged } from '@progress/kendo-angular-common';
import {Servicios,SerRespuesta} from 'src/app/interfaces/servicios';
import {TurnosService} from 'src/app/Servicios/turnos.service';
import {Turno,ResTurno} from 'src/app/Interfaces/turno';
import { Archivos } from 'src/app/Interfaces/archivos';
import { NgxSpinnerService } from 'ngx-spinner';
// registerLocaleData(localeEsAr);
//import { parse } from 'date-fns';
import $ from 'jquery'
import { numberSymbols } from '@telerik/kendo-intl';
import { Arc } from '@progress/kendo-drawing/dist/npm/geometry';


@Component({
  selector: 'app-gen-turno',
  templateUrl: './gen-turno.component.html',
  styleUrls: ['./gen-turno.component.scss']
})

export class GenTurnoComponent implements OnInit {

  public globalService:GlobalService;
  public lstTipoDoc:DropdownListClass;
  CodigoTicket:string;
  ListArchivos:Array<Archivos>=[];
  Archivo1:Archivos;
  Archivo2:Archivos;
  Archivo3:Archivos;
  ListaDcs:ListaDocs[];
  listannos: Array<number>=[];
  Respuesta:UsRespuesta;
  ResSer:SerRespuesta;
  listramites:Servicios[];
  ListCiudad:Sucursal[];
  ResTurno:ResTurno;
  Turno:Turno;
  Mensajes:ResMensajes;
  archivos:Array<string>=[];
  public modelo: Modelo = { };
  file: Array<any>=[];
  files2: Array<any>=[];files3: Array<any>=[];
  cargando: boolean = false;
  abrirVentana: boolean = false;
  mensaje: Mensaje = null;
  formGenTurno : FormGroup;
  formGenUsu : FormGroup;
  consultado:boolean=false;
  ResCity:ResSucursal;
  Edicion: boolean = false;
  TipoDocText:string;
  usuario:Usuario =
  {
    IdUser:0,
DesTipoDocumento:null
  }
  patternText :string = "^[a-zA-Z0-9]+$";
  regexnames:string="^[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]*\\s*[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]*\\s*$";
  regexnumeros:string="^[+-]?\\d+(\\.\\d+)?$";
  regexemail:string="\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*";
  idModuloActual :number;
   textb:any;
   RespuestaArch:RespuestaApi;
 validacion:string;
 validacion2:string;
 valnombres:string;
 valapellidos:string;
 valciudad:string;
 valcorreo:string;
 valcelular:string;
 valtramite:string;
 valnotas:string;
 valtelefono:string;
 valadjunto:string;

 celularMostrar:string;
 TelefonoMostrar:string;
 CorreoMostrar:string;
 celularConvertido:string;
 TelefonoConvertido:string;
 CorreoConverido:string;

  file2:boolean=false;
  file3:boolean=false;

  constructor(private router: Router,private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private generalService: GeneralService,
    private globalservices:GlobalService,
    private TurnosService:TurnosService,
    private SpinnerService: NgxSpinnerService
    ) {
      this.globalService = globalservices;
      this.cargarCombos();
     

      if(this.globalService.Turno != undefined)
      {
        this.ConsultarTurno();
      }
    }

  ngOnInit() {
    this.formGenTurno  =  this.formBuilder.group({
      txtNumeroIdentificacion:['',[Validators.required,Validators.minLength(4),Validators.maxLength(20), Validators.pattern(this.regexnumeros)]],
      ddlTipoIdentificacion:['',[Validators.required,Validators.nullValidator]],
      fileDropRef:['',],
      txtNombre:['',[Validators.required, Validators.pattern(this.regexnames)]],
      txtApellido:['',[Validators.required, Validators.pattern(this.regexnames)]],
      txtCorreo:['',[Validators.required,Validators.pattern(this.regexemail)]],
      ddlCiudad:['',[Validators.required, Validators.nullValidator]],txtTelefono:['',[Validators.pattern(this.regexnumeros)]],
      txtCelular:['',[Validators.required, Validators.pattern(this.regexnumeros)]],
      ddlTramite:['',[Validators.required, Validators.nullValidator]],
      txcomentario:['',[Validators.required]]
    });


    $("ddlTramite").attr('disabled','disabled');
    this.formGenTurno.controls['ddlTramite'].disable();
    this.cargarCombos();
  }

  get fval() {
  
    return this.formGenTurno.controls;
    
  }
  ConsultarTipoDoc(id:number):string{
   ;
      let i:number;
      for(i=0;i<this.ListaDcs.length;i++)
      {
        if(this.ListaDcs[i].IdTipodoc==id)
        {
        return  this.ListaDcs[i].NTipodoc
        }
      }
}


  cargarCombos(){
    try {
      this.SpinnerService.show();
      this.generalService.JWTAfil().then(
        (res: STResponse) =>{
//debugger;
    this.globalService.JWT = res.Token;
    this.generalService.ObtenerTipoDocumento( this.globalService.JWT,this.globalService.Token).then((response:DropdownListClass)=>{

      this.lstTipoDoc = response;
      this.ListaDcs = response.ListaDocs;
     
      this.cargarCiudades();
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
    this.IrAModulo(0,"");
    this.SpinnerService.hide();
    }
  }

  cargarCiudades(){
    try {

      this.generalService.JWTAfil().then(
        (res: STResponse) =>{
       ////debugger;
    this.globalService.JWT = res.Token;
    this.generalService.ObtenerCiudadesQF( this.globalService.JWT,this.globalService.Token).then((response:ResSucursal)=>{
   debugger;
      this.ResCity = response;
      this.ListCiudad = response.Sucursales;
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

  ConsultarTurno(){
    try {

      this.generalService.JWTAfil().then(
        (res: STResponse) =>{
       ////debugger;
       let idprocess:number;
       idprocess=this.globalService.Turno.ProcessId;
    this.globalService.JWT = res.Token;
    this.TurnosService.ObtenerTurno( this.globalService.JWT,this.globalService.Token,idprocess).then((response:SerRespuesta)=>{
      ////debugger;

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

 /**
   * Delete file from files list
   * @param index (File index)
   */

   ActivarFile(){

    
    if (this.file2==false)
    {
      this.file2=true;
    }
    else{
      this.file3=true;
    }

   }
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
      this.file.slice(x,1);
      // (x,1);
      return;
    }
}
  }

  async guardarArchivo(event) {
  ;
    try {
      this.cargando = true;
        this.cargando = false;
    
      
      this.file = event;
   
      let i:number;
     

      let Arch:Archivos={Archivo:null,Idcaso:null,IdUsuario:null,nombre:null,Token:null};
      let ar:File = this.file[0];
       Arch.nombre=this.file[0].name;
      Arch.Archivo=ar;
        
       this.Archivo1=Arch;
    
      // let myReader: FileReader = new FileReader() ,UrlBase64;
      // myReader.onloadend = (e: ProgressEvent)=>{
   
      //  debugger;
      //   UrlBase64 = myReader.result;
      //    Arch.Archivo=UrlBase64;
        
      //   this.Archivo1=Arch;
      //   this.cargando = false;
      // }
      // myReader.readAsDataURL(this.file[0]);
     
   
  //  let myReader: FileReader = new FileReader();
  //     myReader.onloadend = (e: ProgressEvent)=>{
   
  //      debugger;
         
  //        Arch.Archivo=myReader.result.toString();
        
  //       this.Archivo1=Arch;
  //       this.cargando = false;
  //     }
  //     myReader.readAsDataURL(this.file[0]);

    
    } catch (ex) {
      this.cargando = false;
      this.modelo.mensaje = {

        mensaje: `Ha ocurrido un error: ${ ex }`
      }
      this.abrirVentana = true;
    }
  }

  async guardarArchivo2(event) {
    ////debugger;
    try {
      this.cargando = true;
        this.cargando = false;
    
      
      this.files2 = event;
   
      let i:number;
    

      let Arch:Archivos={Archivo:null,Idcaso:null,IdUsuario:null,nombre:null,Token:null};
     
      Arch.nombre=this.files2[0].name;
      let ar:File = this.files2[0];
      Arch.nombre=this.files2[0].name;
     Arch.Archivo=ar;
       
      this.Archivo2=Arch;
    

 
    } catch (ex) {
      this.cargando = false;
      this.modelo.mensaje = {

        mensaje: `Ha ocurrido un error: ${ ex }`
      }
      this.abrirVentana = true;
    }
  }

  async guardarArchivo3(event) {
    ////debugger;
    try {
      this.cargando = true;
        this.cargando = false;
    
      
      this.files3 = event;
   
      let i:number;
    

      let Arch:Archivos={Archivo:null,Idcaso:null,IdUsuario:null,nombre:null,Token:null};
     
      Arch.nombre=this.files3[0].name;

      let ar:File = this.files3[0];
      Arch.nombre=this.files3[0].name;
     Arch.Archivo=ar;
     this.Archivo3= Arch;
     

    
    } catch (ex) {
      this.cargando = false;
      this.modelo.mensaje = {

        mensaje: `Ha ocurrido un error: ${ ex }`
      }
      this.abrirVentana = true;
    }
  }


  async borrarModelo(){
    return new Promise((resolve,reject)=>{
      try{

        this.modelo.noRegistros = 0;

        this.modelo.nombreArchivo = '';
        this.modelo.extensionArchivo = '';

        this.modelo.pathOriginal = '';
        this.modelo.path = '';

        this.modelo.bRedireccionarAutomatico = false;
        resolve();
      } catch(ex){
        reject(ex);
      }
    });
  }

  ConsultarEmp(){
   
        let DocumentoId:string;
        let TipoDoc:string;
    try {

      this.generalService.JWTAfil().then(
        (res: STResponse) =>{
    this.globalService.JWT = res.Token;
      //let idempleador:string;
      //let tipodoc:string;
     ;

      this.TipoDocText= this.ConsultarTipoDoc(this.formGenTurno.get('ddlTipoIdentificacion').value);
        if(this.formGenTurno.get('txtNumeroIdentificacion').value == "" || this.formGenTurno.get('ddlTipoIdentificacion').value == ""){
          this.validacion="Debe diligenciar todos los campos*";
          //this.alertService.error("Debe diligenciar todos los campos",false);
          return;
        }
        if(this.formGenTurno.get('txtNumeroIdentificacion').invalid)
        {
          this.validacion="Debe digitar Solo números sin espacios";
          return;
        }
        
        DocumentoId=this.formGenTurno.get('txtNumeroIdentificacion').value,
        TipoDoc=this.formGenTurno.get('ddlTipoIdentificacion').value
     this.validacion="";
    //this.formUsuarioIPS.get('ddlEstado').value,
    //this.formUsuarioIPS.get('txtNumeroIdentificacion').value,
    this.activatedRoute.params.subscribe( params =>{
      //Inicio de modulo
      this.SpinnerService.show();
      this.generalService.ConsultarUsuarioQF(this.globalService.JWT,this.globalService.Token,DocumentoId,TipoDoc,this.TipoDocText).then((params) => {
       ;
        this.Respuesta = params;
        if(this.Respuesta.Usuario != undefined)
        {
          this.usuario = this.Respuesta.Usuario;
          if( this.usuario.Celular !=null){
            if( this.usuario.Celular.toString().length==10){
              if( this.usuario.CelularMostrar != undefined){
                this.celularMostrar = this.usuario.CelularMostrar;
                this.celularConvertido = this.usuario.CelularMostrar;
              }
              else{
                 this.celularMostrar = this.usuario.Celular.toString().substring(0,3) + "xxxx"+ this.usuario.Celular.toString().substring(7,10);
                 this.celularConvertido = this.usuario.Celular.toString().substring(0,3) + "xxxx"+ this.usuario.Celular.toString().substring(7,10);
              }
            }
          }
          
          if( this.usuario.Telefoco != null)
          {
            if( this.usuario.Telefoco.toString().length>4){
              if( this.usuario.TelefocoMostrar != undefined){
                this.TelefonoMostrar = this.usuario.TelefocoMostrar;
                this.TelefonoConvertido =  this.usuario.TelefocoMostrar;
              }
              else{
                this.TelefonoMostrar = this.usuario.Telefoco.toString().substring(0,3) + "xxxxx";
                this.TelefonoConvertido = this.usuario.Telefoco.toString().substring(0,3) + "xxxxx";
              }
  
            }
          }
          if( this.usuario.Email !=null )
          {
            if( this.usuario.Email.toString().length>4 && this.usuario.Email.toString().includes('@') ){
              if(this.usuario.EmailMostrar  != undefined)
              {
                this.CorreoMostrar = this.usuario.EmailMostrar;
                this.CorreoConverido = this.usuario.EmailMostrar;
              }
              else{
                let antesarr:string;
                let despuesarr:string;
                antesarr=this.usuario.Email.split('@')[0];
                despuesarr=this.usuario.Email.split('@')[1];
                let x:number;
                x=despuesarr.length;
                this.CorreoMostrar = antesarr.toString().substring(0,1) + "xxxxx@"+despuesarr;
                this.CorreoConverido = antesarr.toString().substring(0,1) + "xxxxx@"+despuesarr;
              }
             
            }
          }
        
        }
        this.consultado=true;
        this.TipoDocText= this.ConsultarTipoDoc(this.formGenTurno.get('ddlTipoIdentificacion').value);
        this.SpinnerService.hide();
      });
    });

  },
  (rej)=>{
    console.log(rej);

  }

  );
  } catch (error) {
  console.log(error);
  this.SpinnerService.hide();
  }
  }

vaciar()
{
  this.validacion2="";
  if(this.formGenTurno.get('txtCorreo').valid)
  {
    this.valcorreo="";
  
  }
  if(this.formGenTurno.get('txtNombre').valid)
    {
      this.valnombres="";
    
    }
    if(this.formGenTurno.get('txtApellido').valid)
    {
      this.valapellidos="";
     
    }
    if(this.formGenTurno.get('txtCorreo').valid)
    {
      this.valcorreo="";
     
    }
    if(this.formGenTurno.get('ddlCiudad').valid || this.formGenTurno.get('ddlCiudad').value != "")
    {
      this.valciudad="";
     
    }
    if(this.formGenTurno.get('txtCelular').valid || this.formGenTurno.get('txtCelular').value==this.celularConvertido)
    {
      this.valcelular="";
     
    }
    if(this.formGenTurno.get('txtTelefono').valid || this.formGenTurno.get('txtTelefono').value==this.TelefonoConvertido)
    {
      this.valtelefono="";
     
    }
    if(this.formGenTurno.get('ddlTramite').valid || this.formGenTurno.get('ddlTramite').value != "")
    {
      this.valtramite="";
      
    }
    if(this.formGenTurno.get('fileDropRef').valid || this.formGenTurno.get('fileDropRef').value != "")
    {
      this.valadjunto="";
      
    }
    if(this.formGenTurno.get('txcomentario').valid)
    {
      this.valnotas="";
      
    }
}
  CrearUserQF(){
    
    let User:Usuario={
      IdUser:0,
      Documento:null,
      TipoDocumento:null,
      DesTipoDocumento:null,
      Nombres:null,
      Apellidos:null,
      Celular:null,
      Email:null,
      Telefoco:null,
      Ciudad:null


    };
    //let TipoDoc:string;
try {

  this.generalService.JWTAfil().then(
    (res: STResponse) =>{
this.globalService.JWT = res.Token;
  //let idempleador:string;
  //let tipodoc:string;
 ;

 let Desdoc:string;

 this.generalService.ConsultaHorario( this.globalService.JWT).then((response:ResMensajes)=>{
   debugger;
if (response.Valido=="0")
{
  this.mensaje = {
    tipo: tipoMensaje.Informacion,
    mensaje: "Nuestro horario de atención a finalizado por el día de hoy. \n\r Te invitamos a realizar tu solicitud nuevamente  en los siguientes horarios: Lunes a viernes de 7:00 a.m. a 4:00 p.m. Sábados de 8:00 a.m. a 11:00 a.m"
  }
  this.abrirVentana = true;    
  this.SpinnerService.hide();
  return;
}
else{



    if(this.formGenTurno.invalid || this.file.length==0){

      this.validacion2="Debes diligenciar todos los campos*";
      
    }
    if(this.formGenTurno.get('txtNombre').invalid)
    {
      this.valnombres="El campo nombre tiene algunos caracteres no válidos";
      return;
    }
    if(this.formGenTurno.get('txtApellido').invalid)
    {
      this.valapellidos="El campo apellido tiene algunos caracteres no válidos";
      return;
    }
//debugger;
    if(this.CorreoConverido != "" &&  this.CorreoConverido != undefined)
    {
      let aaa:string =this.formGenTurno.get('txtCorreo').value;
     if(this.formGenTurno.get('txtCorreo').invalid && this.formGenTurno.get('txtCorreo').value != this.CorreoConverido)
     {
       this.valcorreo="El campo correo tiene algunos caracteres no válidos";
       return;
     }
    }else
    {
      if(this.formGenTurno.get('txtCorreo').invalid)
    {
      this.valcorreo="El campo correo tiene algunos caracteres no válidos";
      return;
    }
    }
   
    if(this.formGenTurno.get('ddlCiudad').invalid || this.formGenTurno.get('ddlCiudad').value == "")
    {
      this.valciudad="Debes seleccionar una ciudad";
      return;
    }
   if(this.celularConvertido != "" &&  this.celularConvertido != undefined)
   {
    if(this.formGenTurno.get('txtCelular').invalid && this.formGenTurno.get('txtCelular').value != this.celularConvertido)
    {
      this.valcelular="El campo celular tiene algunos caracteres no válidos";
      return;
    }
   }else
   {
    if(this.formGenTurno.get('txtCelular').invalid)
    {
      this.valcelular="El campo celular tiene algunos caracteres no válidos";
      return;
    }
   }

   if(this.TelefonoConvertido != "" &&  this.TelefonoConvertido != undefined)
   {
    if(this.formGenTurno.get('txtTelefono').invalid && this.formGenTurno.get('txtTelefono').value != this.TelefonoConvertido)
    {
      this.valtelefono="El campo telefono tiene algunos caracteres no válidos";
      return;
    }
   }else
   {
    if(this.formGenTurno.get('txtTelefono').invalid)
    {
      this.valtelefono="El campo telefono tiene algunos caracteres no válidos";
      return;
    }
   }
  
    if(this.formGenTurno.get('ddlTramite').invalid || this.formGenTurno.get('ddlTramite').value == "")
    {
      this.valtramite="Debes seleccionar un servicio";
      return;
    }
    if(this.formGenTurno.get('txcomentario').invalid)
    {
      this.valnotas="Debes realizar una breve descripción de tu solicitud";
      return;
    }
    if(this.file.length==0 )
    {
      this.valadjunto="Debes seleccionar al menos un archivo";
      return;
    }
    this.validacion2="";
    if(this.usuario.IdUser!=0)
    {
     User.IdUser=this.usuario.IdUser;
    }
   ;
    User.Documento=this.formGenTurno.get('txtNumeroIdentificacion').value,
    User.TipoDocumento=this.formGenTurno.get('ddlTipoIdentificacion').value,
    User.DesTipoDocumento= this.TipoDocText;
    User.Nombres=this.formGenTurno.get('txtNombre').value,
    User.Apellidos=this.formGenTurno.get('txtApellido').value,
    User.Ciudad=this.formGenTurno.get('ddlCiudad').value;
    if(this.formGenTurno.get('txtCorreo').value != this.CorreoConverido)
    {
      User.Email=this.formGenTurno.get('txtCorreo').value;
    }
    else
    {
      User.Email=this.usuario.Email;
    }
    
    if(this.formGenTurno.get('txtTelefono').value != this.TelefonoConvertido)
    {
      User.Telefoco=this.formGenTurno.get('txtTelefono').value;
    }
    else
    {
      User.Telefoco=this.usuario.Telefoco;
    }
    if(this.formGenTurno.get('txtCelular').value != this.celularConvertido)
    {
      User.Celular=this.formGenTurno.get('txtCelular').value
    }
    else
    {
      User.Celular=this.usuario.Celular;
    }
 
    
    User.Token=this.globalService.Token;
//this.formUsuarioIPS.get('ddlEstado').value,
//this.formUsuarioIPS.get('txtNumeroIdentificacion').value,
this.activatedRoute.params.subscribe( params =>{
  //Inicio de modulo
  this.SpinnerService.show();
  this.generalService.CrearUsuarioQF(this.globalService.JWT,User).then((params) => {
   ;
    this.Respuesta = params;
    if(this.Respuesta.Respuesta=="1")
    {
      this.usuario = this.Respuesta.Usuario;
    this.globalService.usuario=this.Respuesta.Usuario;
    this.GenerarTurno();
  }
  else{
    this.IrAModulo(0,"");

  }
    this.consultado=true;
  });
});
}
});
},
(rej)=>{
console.log(rej);

}

);
} catch (error) {
console.log(error);
this.SpinnerService.hide();
this.IrAModulo(0,"");
}

}
// ConsultarSucursales(){

//   let DocumentoId:string;
//   let TipoDoc:string;
// try {

// this.generalService.JWTAfil().then(
//   (res: STResponse) =>{
// this.globalService.JWT = res.Token;
// //let idempleador:string;
// //let tipodoc:string;
// //////debugger;


//   if(this.formGenTurno.invalid){

//     //this.alertService.error("Debe diligenciar todos los campos",false);
//     return;
//   }
//   DocumentoId=this.formGenTurno.get('txtNumeroIdentificacion').value,
//   TipoDoc=this.formGenTurno.get('ddlTipoIdentificacion').value

// //this.formUsuarioIPS.get('ddlEstado').value,
// //this.formUsuarioIPS.get('txtNumeroIdentificacion').value,
// this.activatedRoute.params.subscribe( params =>{
// //Inicio de modulo
// this.generalService.ConsultarUsuarioQF(this.globalService.JWT,this.globalService.Token,DocumentoId,TipoDoc).then((params) => {
//   ////debugger;
//   this.Respuesta = params;
//   if(this.Respuesta.Usuario != undefined)
//   {
//     this.usuario = this.Respuesta.Usuario;
//   }
//   this.consultado=true;
// });
// });

// },
// (rej)=>{
// console.log(rej);

// }

// );
// } catch (error) {
// console.log(error);

// }
// }

ConultarTramites()
{
  this.SpinnerService.show();
 
  this.formGenTurno.controls['ddlTramite'].enable();

  try {

    this.generalService.JWTAfil().then(
      (res: STResponse) =>{
    this.globalService.JWT = res.Token;

   
    let ciudad:number=this.formGenTurno.get('ddlCiudad').value;

    this.activatedRoute.params.subscribe( params =>{
    //Inicio de modulo
    this.generalService.ObtenerTramitesQF(this.globalService.JWT,this.globalService.Token,ciudad).then((params) => {
      ////debugger;
      this.ResSer = params;
      if(this.ResSer.Servicios != undefined)
      {
        this.listramites = params.Servicios;
      }
      this.consultado=true;
      this.SpinnerService.hide();
    });
    });

    },
    (rej)=>{
    console.log(rej);

    }

    );
    } catch (error) {
    console.log(error);
    this.SpinnerService.hide();
    }
}

GenerarTurno()
{

  let IdServicio:number;
  let IdUsuario:number;
  let Notas:string;
  let prioridad:number;
try {

this.generalService.JWTAfil().then(
  (res: STResponse) =>{
this.globalService.JWT = res.Token;
//let idempleador:string;
//let tipodoc:string;
//////debugger;



;
  IdServicio=this.formGenTurno.get('ddlTramite').value,
  IdUsuario= this.usuario.IdUser;
  prioridad= this.usuario.Prioridad;
  Notas= this.formGenTurno.get('txcomentario').value,
//this.formUsuarioIPS.get('ddlEstado').value,
//this.formUsuarioIPS.get('txtNumeroIdentificacion').value,
this.activatedRoute.params.subscribe( params =>{
//Inicio de modulo
this.TurnosService.GenerarTurno(this.globalService.JWT,this.globalService.Token,IdServicio,IdUsuario,Notas,prioridad).then((params) => {
 ;
  this.ResTurno = params;
  if(this.ResTurno.Turno != undefined)
  {
    if(this.ResTurno.Turno.CaseId==0)
    {
      this.globalService.Turno=this.ResTurno.Turno;
      // this.consultado=true;
      // this.CodigoTicket="Ya tienes un turno activo";
      // this.SpinnerService.hide();
      this.IrAModulo(2,"Consulta");
      this.globalService.yatiene = true;
      return;
    }
    this.Turno = this.ResTurno.Turno;
    this.SubirArchivos(this.ResTurno.Turno.CaseId);
    this.CodigoTicket=this.Turno.QCode+this.Turno.QNumber;
    this.globalService.Turno=this.Turno;
  }
  this.consultado=true;
});
});

},
(rej)=>{
console.log(rej);

}

);
} catch (error) {
console.log(error);
this.SpinnerService.hide();
this.IrAModulo(0,"");
}

}

SubirArchivos(IdCaso:number)
{



try {

this.generalService.JWTAfil().then(
  (res: STResponse) =>{
    debugger;
this.globalService.JWT = res.Token;
if(this.Archivo1 != undefined)
{
  this.ListArchivos.push(this.Archivo1)
}
if(this.Archivo2 != undefined)
{
  this.ListArchivos.push(this.Archivo2)
}
if(this.Archivo3 != undefined)
{
  this.ListArchivos.push(this.Archivo3)
}
  
  for(let x=0;x<this.ListArchivos.length;x++){
    let ResArchivo:RespuestaApi;
    let ObjArchivo:Archivos={Token:null,Archivo:null,nombre:null,IdUsuario:null,Idcaso:null};
    ObjArchivo=this.ListArchivos[x];
    ObjArchivo.Token=this.globalService.Token;
    ObjArchivo.Idcaso=IdCaso;
    ObjArchivo.IdUsuario= this.usuario.IdUser;

    this.activatedRoute.params.subscribe( params =>{
    //Inicio de modulo
    this.TurnosService.SubirArchivos(this.globalService.JWT,ObjArchivo).then((params) => {
   
    ResArchivo = params;
    if(ResArchivo.Respuesta =="1")
    {

    }
    this.SpinnerService.hide();
  });
  });

}

this.SpinnerService.hide();
},
(rej)=>{
console.log(rej);

}

);
} catch (error) {
console.log(error);
this.SpinnerService.hide();
}

}
ConsularMensaje(){
  try {
    let tramite:number=this.formGenTurno.get('ddlTramite').value;

   
    this.generalService.JWTAfil().then(
      (res: STResponse) =>{
    
  this.globalService.JWT = res.Token;
  this.generalService.ConsultaListaDocs( this.globalService.JWT,tramite).then((response:ResMensajes)=>{
   
    this.archivos = response.mensajes;
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

recibirRespuestaMensaje(respuesta: respuestaMensaje )
      {      
        ////debugger;
     
     if( this.mensaje.tipo == tipoMensaje.Informacion)
     {
       this.IrAModulo(0,"");
     }
     this.abrirVentana = false;
    }
    




IrAModulo(id: number, ruta: string) {
  this.SpinnerService.show();
  this.router.navigate([ ruta , id ],{skipLocationChange:true});
}


}



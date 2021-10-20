import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Mensaje, tipoMensaje, respuestaMensaje } from './src/app/interfaces/mensaje'

@Component({
  selector: 'app-ventana',
  templateUrl: './ventana.component.html',
  styleUrls: ['./ventana.component.scss']
})
export class VentanaComponent implements OnInit {

  @Input() Mensaje: Mensaje
  @Output() respuestaMensaje: EventEmitter<respuestaMensaje> = new EventEmitter();
  
  titulo: string = '';
  btnCancelar: boolean = false;

  constructor() {}
  
  ngOnInit(){ 
    switch(this.Mensaje.tipo) {
      case tipoMensaje.Confirmacion: {
        this.titulo = 'Mensaje de confirmación';
        this.btnCancelar = true;
        break;
      }
      case tipoMensaje.Error: {
        this.titulo = 'Mensaje de error';
        break;
      }
      case tipoMensaje.Informacion: {
        this.titulo = 'Mensaje de información';
        break;
      } 
      case tipoMensaje.Verificacion: {
        this.titulo = 'Mensaje de verificación';
        break;
      }
    }
  }

  accion(accion: string) {
    switch(accion){
      case 'cerrar':{
        this.respuestaMensaje.emit(respuestaMensaje.Cerrar);
        break;
      }
      case 'aceptar':{
        this.respuestaMensaje.emit(respuestaMensaje.Aceptar);
        break;
      }
      case 'cancelar':{
        this.respuestaMensaje.emit(respuestaMensaje.Cancelar);
        break;
      }
    }
  }

}


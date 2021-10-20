import { Component } from '@angular/core';
//import { Mensaje , tipoMensaje } from './interfaces/mensaje';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TurnoVirtual';
  nombreModulo: string[];
  rutaRegresar : string = "";
}

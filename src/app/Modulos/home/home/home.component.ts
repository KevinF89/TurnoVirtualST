import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GlobalService } from 'src/app/Servicios/global.service';
import { GeneralService } from 'src/app/Servicios/general.service';
import { Router, ActivatedRoute } from '@angular/router';
import { STResponse, ResMensajes } from 'src/app/Interfaces/strresponse';
import { AlertaService } from 'src/app/Servicios/alerta.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListaDocs, DropdownListClass } from 'src/app/Interfaces/dropdown-list-class'
import { RespuestaserviciosH } from 'src/app/Interfaces/modelo';
import $ from 'jquery'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Output() actNombreModulo: EventEmitter<string[]> = new EventEmitter();
  @Output() ruta: EventEmitter<string> = new EventEmitter();
  public lstTipoDoc: DropdownListClass;
  public globalService: GlobalService;
  ListaServices: Array<string[]>;
  horarios: Array<string> = [];
  Mensajes: ResMensajes;
  ListaDcs: ListaDocs[];
  private router: Router;
  private activatedRoute: ActivatedRoute;
  private generalService: GeneralService;
  private globalservices: GlobalService;
  private Alerta: AlertaService;
  private SpinnerService: NgxSpinnerService;
  constructor(

  ) {
    //this.SpinnerService.show();
    //let externalUrl = "https://desarrollo.saludtotal.com.co/OficinaVirtual/"//JSON.parse(sessionStorage.getItem('configRecaudos')).urlAppOFVirtual;

    //this.IniciarSesionQF();

  }

  ngOnInit() {

  }


  ValidarHorario() {
    if (this.Mensajes.Valido == "0") {
      $("#btnTurno").attr('disabled', 'disabled');
      $("#btnSeguimiento").attr('disabled', 'disabled');
    }
    if (this.Mensajes.Valido == "1") {
      $("#btnTurno").attr('disabled', false);
      $("#btnSeguimiento").attr('disabled', false);
    }
  }

  cargarCombos() {
    try {
      this.SpinnerService.show();
      this.generalService.JWTAfil().then(
        (res: STResponse) => {
          this.globalService.JWT = res.Token;
          this.generalService.ObtenerTipoDocumento(this.globalService.JWT, this.globalService.Token).then((response: DropdownListClass) => {

            this.lstTipoDoc = response;
            this.ListaDcs = response.ListaDocs;


          });

        },
        (rej) => {
          console.log(rej);

        }
      );
    }
    catch (error) {
      console.log(error);
      this.IrAModulo(0, "");
      this.SpinnerService.hide();
    }
  }

  IniciarSesionQF() {
    try {

      this.SpinnerService.show();
      this.generalService.JWTAfil().then(
        (res: STResponse) => {

          this.globalService.JWT = res.Token;
          this.generalService.InicioSesionQF(this.globalService.JWT).then((response: STResponse) => {

            this.ConsularMensaje();
            this.ServiciosHome();
            this.globalService.Token = response.Token;
          });

        },
        (rej) => {
          console.log(rej);
        }
      );
    }
    catch (error) {
      console.log(error);
      this.SpinnerService.hide();
    }
  }

  ServiciosHome() {
    try {

      this.SpinnerService.show();
      this.generalService.JWTAfil().then(
        (res: STResponse) => {

          this.globalService.JWT = res.Token;
          this.generalService.ObtenerServiciosH(this.globalService.JWT).then((response: RespuestaserviciosH) => {

            this.ListaServices = response.Servicios;
          });

        },
        (rej) => {
          console.log(rej);
        }
      );
    }
    catch (error) {
      console.log(error);
      this.SpinnerService.hide();
    }
  }



  ConsularMensaje() {
    try {

      this.generalService.JWTAfil().then(
        (res: STResponse) => {

          this.globalService.JWT = res.Token;
          this.generalService.ConsultaHorario(this.globalService.JWT).then((response: ResMensajes) => {

            this.Mensajes = response;
            this.horarios = response.mensajes;
            this.ValidarHorario();
            this.SpinnerService.hide();
          });

        },
        (rej) => {
          console.log(rej);
        }
      );
    }
    catch (error) {
      console.log(error);
      this.SpinnerService.hide();
    }
  }
  IrAModulo(id: number, ruta: string) {
    this.SpinnerService.show();
    this.router.navigate([ruta, id], { skipLocationChange: true });
  }
  
  public sumar(a: number, b: number): number {
    debugger
	  return Number(a) + Number(b); 
  }

}

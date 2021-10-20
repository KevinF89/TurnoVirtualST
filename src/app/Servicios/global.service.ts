import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { SesionUsuario } from '../interfaces/sesion-usuario';
//import { ParametroSistema } from '../interfaces/parametro-sistema';
import { Usuario } from '../interfaces/usuario';
import { Turno } from '../Interfaces/turno';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public Token: string = '';
  public JWT: string = '';
  public idUsuario: number = 0;
  public usuario: Usuario;
  public Turno: Turno;
  public Segundos: number;
  public yatiene: boolean;

  constructor(private router: Router) {

    if (sessionStorage.getItem('globalService') != undefined)
      if (this.Token == null || this.Token == "") {
        let globalService = JSON.parse(sessionStorage.getItem('globalService'));
        this.JWT = globalService.JWT;
        this.Token = globalService.Token;
        this.usuario = globalService.usuario;
        this.Turno = globalService.Turno;
        this.Segundos = globalService.Segundos;
        this.yatiene = globalService.yatiene;

      }
  }
}

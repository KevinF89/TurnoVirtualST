import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgModule, APP_INITIALIZER,LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { ShareddModule } from './modulos/shared/shared.module';
import { HomeModule } from './modulos/home/home.module';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import { Config } from 'src/app/Interfaces/config';
import localeEs from '@progress/kendo-angular-intl/locales/es/all';
import { DropDownsModule, DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { NgxSpinnerModule } from "ngx-spinner";
//import { ErrorInterceptor } from './Interceptador/error.interceptor';

registerLocaleData(localeEs,'es-ES');

// export function iniciar(http: HttpClient,usuarioService: UsuarioService, globalService: GlobalService): (() => Promise<boolean>) {
  export function iniciar(http: HttpClient): (() => Promise<boolean>) {
  return (): Promise<boolean> => {
    return new Promise<boolean>( (resolve: (a: boolean) => void): void => {
      let config: Config = {};
      
      const jsonFile = 'assets/config/config.json';
      http.get(jsonFile).toPromise().then((ConfigJson: Config) =>{
        config.urlApiTurnos = ConfigJson.urlApiTurnos;                             
        config.UrlAppTurnoVirtual = ConfigJson.UrlAppTurnoVirtual; 
        config.Segundos = ConfigJson.Segundos;

        sessionStorage.setItem('configTurnos',JSON.stringify(config));
           resolve(true);
        });
      });
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,NgxSpinnerModule,
    ShareddModule,
    HomeModule,
    LayoutModule,
    DropDownsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: iniciar,
      deps: [
        HttpClient
      ],
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'es-ES' },
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

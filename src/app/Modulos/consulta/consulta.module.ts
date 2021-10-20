
import { ConsultaComponent } from './consulta/consulta.component';
import { LOCALE_ID,NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule, PDFModule, ExcelModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
//import { SharedModule } from '@progress/kendo-angular-dialog';
import { ConsultaRoutingModule } from './consulta-routing.module';
import { ComboBoxModule,DropDownsModule,DropDownListComponent,ComboBoxComponent, DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { FormsModule,FormGroup,FormControl,ReactiveFormsModule   } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { Subscription } from 'rxjs';
import { registerLocaleData } from '@angular/common';
import localesES from '@angular/common/locales/es';
import { IntlModule } from '@progress/kendo-angular-intl';
import { ShareddModule } from 'src/app/modulos/shared/shared.module';

// import 'hammerjs';
import '@progress/kendo-angular-intl/locales/de/all';
import '@progress/kendo-angular-intl/locales/es/all';




@NgModule({
  declarations: [ConsultaComponent],
  imports: [
    GridModule,FormsModule,IntlModule,
    InputsModule,
    PDFModule,
    ExcelModule,
    CommonModule,
    ConsultaRoutingModule,
    ShareddModule,
    CommonModule,
    ComboBoxModule,DropDownsModule,ReactiveFormsModule ,DropDownListModule ,LayoutModule
  ],providers: [
    { provide: LOCALE_ID, useValue: 'es-ES' }], 
    exports: [ConsultaComponent],
    bootstrap: [ ConsultaComponent ]
  
})
export class ConsultaModule { }

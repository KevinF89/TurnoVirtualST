import { LOCALE_ID,NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule, PDFModule, ExcelModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { SharedModule } from '@progress/kendo-angular-dialog';
import { GenTurnoRoutingModule } from './gen-turno-routing.module';
import { ComboBoxModule,DropDownsModule, DropDownListModule } from '@progress/kendo-angular-dropdowns';
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
import { GenTurnoComponent } from './gen-turno/gen-turno.component';


@NgModule({
  declarations: [GenTurnoComponent],
  imports: [
    GridModule,FormsModule,IntlModule,DropDownListModule,
    InputsModule,
    PDFModule,
    ExcelModule,
    CommonModule,
    GenTurnoRoutingModule,
    SharedModule,ShareddModule,
    CommonModule,
    ComboBoxModule,DropDownsModule,ReactiveFormsModule 
  ]
  //,providers: [
  //   { provide: LOCALE_ID, useValue: 'es-ES' }], 
  //   exports: [GenTurnoComponent],
  //   bootstrap: [ GenTurnoComponent ]
  
})
export class GenTurnoModule { }

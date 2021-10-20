import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ReactiveFormsModule } from '@angular/forms';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ScrollViewModule } from '@progress/kendo-angular-scrollview';

import { FooterComponent } from './footer/footer.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { AlertaComponent } from './alerta/alerta.component';
import { VentanaComponent } from './ventana/ventana.component';
// import { VentanaComponent } from './ventana/ventana.component';
// import { AlertaComponent } from './alerta/alerta.component';

@NgModule({
declarations: [FooterComponent, TopBarComponent, AlertaComponent, VentanaComponent],
 // declarations: [],
  imports: [
    
    CommonModule,
    RouterModule,
    DialogModule,
    ButtonsModule,
    ReactiveFormsModule,
    DropDownsModule,
    ScrollViewModule
  ],
  exports: [TopBarComponent,FooterComponent,AlertaComponent,VentanaComponent]
  //exports: [ ]
})
export class ShareddModule { }

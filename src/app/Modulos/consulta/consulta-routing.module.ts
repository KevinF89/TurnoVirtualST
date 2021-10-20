import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaComponent } from './consulta/consulta.component';


const EC_ROUTES: Routes = [
  { path: ':idModulo', component: ConsultaComponent}]

  @NgModule({
    declarations: [],
    imports: [
      RouterModule.forChild(EC_ROUTES)
    ],
    exports: [
      RouterModule 
    ]
  })

export class ConsultaRoutingModule { }

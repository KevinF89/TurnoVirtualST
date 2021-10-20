import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GenTurnoComponent } from './gen-turno/gen-turno.component';

const HOME_ROUTES: Routes = [
  { path: '', component: GenTurnoComponent},
  { path: 'Home', loadChildren: () => import('../home/home.module').then(mod => mod.HomeModule) },
  { path: 'Consulta', loadChildren: () => import('../consulta/consulta.module').then(mod => mod.ConsultaModule) },

];
const EC_ROUTES: Routes = [
  { path: ':idModulo', component: GenTurnoComponent}]

  @NgModule({
    declarations: [],
    imports: [
      RouterModule.forChild(EC_ROUTES)
    ],
    exports: [
      RouterModule 
    ]
  })

export class GenTurnoRoutingModule { }

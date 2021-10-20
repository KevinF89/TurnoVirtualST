import { NgModule, InjectionToken }             from '@angular/core';
import { RouterModule, Routes, ActivatedRouteSnapshot } from '@angular/router';
import { HomeComponent } from './home/home.component';

const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');
const deactivateGuard = new InjectionToken('deactivateGuard');

const HOME_ROUTES: Routes = [
    { path: '', component: HomeComponent},
    { path: 'GenTurno', loadChildren: () => import('../gen-turno/gen-turno.module').then(mod => mod.GenTurnoModule) },
    { path: 'Consulta', loadChildren: () => import('../consulta/consulta.module').then(mod => mod.ConsultaModule) },
    { path: 'externalRedirect', canActivate: [externalUrlProvider],component: HomeComponent},
 
];

@NgModule({
    imports: [
      RouterModule.forChild(HOME_ROUTES)
    ],
    exports: [
      RouterModule
    ], providers: [
      {
          provide: externalUrlProvider,
          useValue: (route: ActivatedRouteSnapshot) => {
              const externalUrl = route.paramMap.get('externalUrl');
              window.open(externalUrl,'_self');
          },
      },
      {
        provide: deactivateGuard,
        useValue: () => {
          return false;
        }
      },
  ],
  })
  export class HomeRoutingModule {}

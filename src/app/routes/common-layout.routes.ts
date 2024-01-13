import { Routes } from "@angular/router";
import { DashboardComponent } from "../pages/modules/dashboard/dashboard.component";
import { DependenciasComponent } from "../pages/modules/dependencias/dependencias.component";
import { authGuardGuard } from "../guard/auth-guard.guard";
import { DependeciasHijasComponent } from "../pages/modules/dependecias-hijas/dependecias-hijas.component";
import { AreasComponent } from "../pages/modules/areas/areas.component";
import { AreasHijasComponent } from "../pages/modules/areas-hijas/areas-hijas.component";

export const CommonLayout_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuardGuard]
  },
  {
    path: 'dependencias',
    component: DependenciasComponent,
    canActivate: [authGuardGuard]
  },
  {
    path: 'dependencias-hijas/:id',
    component: DependeciasHijasComponent,
    canActivate: [authGuardGuard]
  },
  {
    path: 'areas',
    component: AreasComponent,
    canActivate: [authGuardGuard]
  },
  {
    path: 'areas-hijas/:id',
    component: AreasHijasComponent,
    canActivate: [authGuardGuard]
  },
];

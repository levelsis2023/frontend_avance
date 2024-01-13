import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { DashboardComponent } from './pages/modules/dashboard/dashboard.component';
import { DependenciasComponent } from './pages/modules/dependencias/dependencias.component';

import { FormGroup, FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DependeciasHijasComponent } from './pages/modules/dependecias-hijas/dependecias-hijas.component';
import { AreasHijasComponent } from './pages/modules/areas-hijas/areas-hijas.component';
import { AreasComponent } from './pages/modules/areas/areas.component';


@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    CommonLayoutComponent,
    HeaderComponent,
    MenuComponent,
    LoginComponent,
    DashboardComponent,
    DependenciasComponent,
    DependeciasHijasComponent,
    AreasHijasComponent,
    AreasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

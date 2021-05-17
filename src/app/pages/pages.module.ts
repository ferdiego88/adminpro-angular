import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importamos el RouterModule
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuarioComponent } from './mantenimientos/usuario/usuario.component';
import { MedicoComponent } from './mantenimientos/medico/medico.component';
import { HospitalComponent } from './mantenimientos/hospital/hospital.component';
import { MantenimientomedicoComponent } from './mantenimientos/medico/mantenimientomedico/mantenimientomedico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';




@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent,
    UsuarioComponent,
    MedicoComponent,
    HospitalComponent,
    MantenimientomedicoComponent,
    BusquedaComponent,
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
  ],
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    ComponentsModule,
    PipesModule
  ]
})
export class PagesModule { }

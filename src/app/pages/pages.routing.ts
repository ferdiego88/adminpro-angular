import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuarioComponent } from './mantenimientos/usuario/usuario.component';
import { MedicoComponent } from './mantenimientos/medico/medico.component';
import { HospitalComponent } from './mantenimientos/hospital/hospital.component';
import { MantenimientomedicoComponent } from './mantenimientos/medico/mantenimientomedico/mantenimientomedico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';



const routes: Routes = [
  {path: 'dashboard',
  component: PagesComponent,
  canActivate: [AuthGuard],
  children:
  [
    {path: '', component: DashboardComponent, data: {titulo: 'Dashboard'} },
    {path: 'progress', component: ProgressComponent, data: {titulo: 'ProgressBar'}},
    {path: 'grafica1', component: Grafica1Component, data: {titulo: 'Gráfica 1'}},
    {path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes de Tema'}},
    {path: 'buscar/:termino', component: BusquedaComponent, data: {titulo: 'Búsquedas'}},
    {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'} },
    {path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil del Usuario'} },
    {path: 'rxjs', component: RxjsComponent, data: {titulo: 'RXJS'}},
    // Mantenimientos
    {path: 'medicos', component: MedicoComponent, data: {titulo: 'Mantenimiento de Medicos'}},
    {path: 'hospitales', component: HospitalComponent, data: {titulo: 'Mantenimiento de Hospitales'}},
    {path: 'medico/:id', component: MantenimientomedicoComponent, data: {titulo: 'Mantenimiento de Medicos'}},
    // {path: '', redirectTo: '/dashboard', pathMatch: 'full'},

    // Rutas de Admin
    {path: 'usuarios', canActivate: [AdminGuard], component: UsuarioComponent, data: {titulo: 'Mantenimiento de Usuarios'}},
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}

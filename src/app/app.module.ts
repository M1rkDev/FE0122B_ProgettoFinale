import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UtentiComponent } from './components/utenti/utenti.component';
import { FattureComponent } from './components/fatture/fatture.component';
import { ClientiComponent } from './components/clienti/clienti.component';
import { FattureClienteComponent } from './components/fatture-cliente/fatture-cliente.component';
import { ModificaFatturaComponent } from './components/modifica-fattura/modifica-fattura.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NuovoClienteComponent } from './components/nuovo-cliente/nuovo-cliente.component';
import { NuovaFatturaComponent } from './components/nuova-fattura/nuova-fattura.component';
import { ModificaClienteComponent } from './components/modifica-cliente/modifica-cliente.component';

const routes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'utenti',
    component: UtentiComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'fatture',
    component: FattureComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'clienti',
    component: ClientiComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'fatture-cliente/:id',
    component: FattureClienteComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'modifica-fattura/:id',
    component: ModificaFatturaComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'nuovo-cliente',
    component: NuovoClienteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'nuova-fattura/:id',
    component: NuovaFatturaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'modifica-cliente/:id',
    component: ModificaClienteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    UtentiComponent,
    FattureComponent,
    ClientiComponent,
    FattureClienteComponent,
    ModificaFatturaComponent,
    NuovoClienteComponent,
    NuovaFatturaComponent,
    ModificaClienteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorPageComponent } from './share/error-page/error-page.component';

const routes: Routes = [
  {
    path: 'auth',
    // lazy load
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then( m => m.HeroesModule )
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {    
    path: '**',
    //component: ErrorPageComponent,
    // Otra manera de hacerlo
    redirectTo: '404'
  }
]
 

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

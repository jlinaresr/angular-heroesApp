import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private authService: AuthService ,
               private router: Router){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
      console.log(route);
      console.log(state);

      return this.authService.verificaAutenticacion()
                .pipe(
                  tap(  estaAutenticado => {
                    if( !estaAutenticado ){
                      this.router.navigate(['./auth/login']);
                    }
                  })
                );

      // OTRA MANERA SIN MIRAR EN EL LOCALSTORAGE Y POR LO TANTO SE PIERDE LA SESIÓN
      /* if ( this.authService.auth.id ){
        console.log('canActivate', true);
        return true;
      }
      console.log('canActivate', false);
      console.log('Bloqueado por el authGuard - CanActivate');
      return false; */
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      
      console.log(route);
      console.log(segments);

      return this.authService.verificaAutenticacion()
                .pipe(
                  tap(  estaAutenticado => {
                    if( !estaAutenticado ){
                      this.router.navigate(['./auth/login']);
                    }
                  })
                );
    
      // OTRA MANERA PERO SIN VALIDAR EL LOCALSTORAGE Y POR LO TANTO SE PIERDE LA SESIÓN
      /* if ( this.authService.auth.id ){
        console.log('canload', true);
        return true;
      }
      console.log('canload', false);
      console.log('Bloqueado por el authGuard - CanLoad');
      return false; */
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent{

  constructor(private router: Router,
              private authService: AuthService) { }

  login(){

    // 1) Ir al backend
    this.authService.login()
      .subscribe(  resp => {
        console.log( resp );
        if( resp.id ){
            // 3) Navegar a la pantalla de heroes
            this.router.navigate(['./heroes']);
        }
      });
    // 2) almacenar en la sesión el usuario

  
  }

  // Demostración de cargue del módulo y anulación del módulo
  ingresarSinlogin(){
    this.authService.logout();
    this.router.navigate(['./heroes']);
  }

}

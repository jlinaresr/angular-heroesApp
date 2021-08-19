import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img{
      width: 100%;
      border-radius: 5px;
    }
  `]
})
export class AgregarComponent implements OnInit {

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  publishers = [
    {
      id:'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id:'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  constructor( private heroesService: HeroesService,
               private  activatedRoute: ActivatedRoute,
               private router: Router,
               private snackBar: MatSnackBar,
               private dialog: MatDialog) { }

  ngOnInit(): void {
  
    if( !this.router.url.includes('editar') ){
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.heroesService.getHeroePorId( id ))
      )
      .subscribe(  heroe => this.heroe = heroe);

  }

  guardar(){
    if( this.heroe.superhero.trim().length === 0 ){
      return;
    }
    
    if( this.heroe.id ){
      this.heroesService.actualizarHeroe( this.heroe )
      .subscribe(  resp => {
        this.mostrarSnackBar('Registro actualizado!');
        console.log('respuesta', resp)
      });
    }
    else{
      this.heroesService.agregarHeroe( this.heroe )
        .subscribe(  resp => {
          this.router.navigate(['/heroes/editar', resp.id]);  
          this.mostrarSnackBar('Registro creado!');
        });

    }
    
  }

  eliminar(){

    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '350px',
      data: { ...this.heroe } // como enviar info
    });

    // Esto se puede pasar a un siwtchmap
    dialog.afterClosed()
      .subscribe(
        (result) => {
          console.log(result);
          if(result){
            this.heroesService.eliminarHeroe( this.heroe.id! )
                .subscribe(  resp => {
                  this.router.navigate(['/heroes']); 
                  this.mostrarSnackBar('Registro eliminado!'); 
                });
          }
        }
      );
  }

  mostrarSnackBar( mensaje: string) : void {
    this.snackBar.open(mensaje, 'Ok',{
        duration: 2500
    });
  }

}

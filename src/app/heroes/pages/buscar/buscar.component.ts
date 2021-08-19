import { Component, OnInit } from '@angular/core';

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Heroe } from '../../interfaces/heroes.interface';

import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado: Heroe | undefined;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  buscando(){
    this.heroesService.getHeroePorFiltro( this.termino.trim() ).subscribe(
      heroes =>  this.heroes = heroes
    );
  }

  opcionSeleccionada( event: MatAutocompleteSelectedEvent ) {
    console.log(event);
    if(event.option.value !== ""){
      const heroe: Heroe = event.option.value;
      //console.log(heroe);
      this.termino = heroe.superhero;
  
      this.heroesService.getHeroePorId( heroe.id! )
        .subscribe(
          heroe => this.heroeSeleccionado = heroe
        );
    }   
    else{
      this.heroeSeleccionado = undefined;
    }
  }

}

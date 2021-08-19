import { Component, Input, OnInit } from '@angular/core';

import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles: [`
    mat-card{
      margin-top: 20px;
    }
  `]
})
export class HeroeTarjetaComponent implements OnInit {

  @Input() heroe!: Heroe;
  // otra manera para eliminar la restriccion de no nulo
  // @Input() heroe2: Heroe | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}

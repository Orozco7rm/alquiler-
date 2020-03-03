import { Component, OnInit, Input } from '@angular/core';
import {Reserva} from '../reserva';

@Component({
  selector: 'app-detalles-reservacion',
  templateUrl: './detalles-reservacion.component.html',
  styleUrls: ['./detalles-reservacion.component.scss']
})
export class DetallesReservacionComponent implements OnInit {

  @Input() reserva: Reserva;

  constructor() { }

  ngOnInit(): void {
  }

}

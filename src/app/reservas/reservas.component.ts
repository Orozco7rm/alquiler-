import { Component, OnInit, OnDestroy } from '@angular/core';
import {Reserva} from '../reserva';
import {ReservaService} from '../reserva.service';
import {MensajeService} from '../mensajes.service';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';



@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss']
})
export class ReservasComponent implements OnInit, OnDestroy {

  reservas: Reserva[];
  selectedReserva : Reserva;
  reservasSub: Subscription;

  constructor(private reservaServicio : ReservaService , private mensajeServicio : MensajeService) { }

  ngOnInit(): void {
    this.reservaServicio.getReservaciones();
     this.reservasSub = this.reservaServicio.cargaReservas.subscribe(
     reserva => this.reservas = reserva);
   
    
  }

  onSelect(reserva: Reserva): void {
    this.selectedReserva = reserva;
    this.mensajeServicio
    .add(`Mensaje de reservacion  :  Reserva seleccionada id = ${this.selectedReserva.id}`);
  }

 /* getReservaciones():void {
      this.reservaServicio.getReservaciones().subscribe(reservas =>
      this.reservas = reservas
    );
  }*/

  ngOnDestroy(){
    this.reservasSub.unsubscribe();
  }
 
}

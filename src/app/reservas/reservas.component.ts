import { Component, OnInit, OnDestroy } from '@angular/core';
import {Reserva} from '../reserva';
import {ReservaService} from '../reserva.service';
import {MensajeService} from '../mensajes.service';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss']
})
export class ReservasComponent implements OnInit, OnDestroy {

  reservas: Reserva[];
  selectedReserva: Reserva;
  reservasSub: Subscription;
  formGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    correo: new FormControl('', [Validators.email, Validators.required]),
    fechai: new FormControl('', Validators.required),
    fechas: new FormControl('', Validators.required),
    numHab: new FormControl('', Validators.required)
  });

  constructor(private reservaServicio: ReservaService , private mensajeServicio: MensajeService) { }

  ngOnInit(): void {
    this.reservaServicio.getReservaciones();
     this.reservasSub = this.reservaServicio.cargaReservas.subscribe(
     reserva => this.reservas = reserva);
   }

  onSelect(reserva: Reserva): void {
    this.selectedReserva = reserva;
    this.mensajeServicio
    .add(`Mensaje de reservacion  :  Reserva seleccionada nombre = ${this.selectedReserva.nombre}`);
  }

 /* getReservaciones():void {
      this.reservaServicio.getReservaciones().subscribe(reservas =>
      this.reservas = reservas
    );
  }*/
    add(): void {
    const reservaNew: Reserva = {
      nombre: this.formGroup.get('nombre').value, 
      correo: this.formGroup.get('correo').value, 
      fechai: this.formGroup.get('fechai').value, 
      fechas: this.formGroup.get('fechas').value, 
      numHab: this.formGroup.get('numHab').value, 
    };
      this.reservaServicio.insertarEnBaseD(reservaNew);
  }
    delete(reserva: Reserva) {
      this.reservaServicio.eliminarEnBaseD(reserva);

  }

  ngOnDestroy(){
    this.reservasSub.unsubscribe();
  }
 
}

import { Injectable } from '@angular/core';
import {Reserva} from './reserva';
import {Reservas} from './reservas';
import { Observable, of, Subject } from 'rxjs';
import {MensajeService} from './mensajes.service';
import { AngularFirestore } from 'angularfire2/firestore';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  cargaReservas = new Subject<Reserva[]>();
  reservas: Observable<Reserva[]>;
  private reservaciones : Reserva[ ] = [];

  constructor(private mensajeServicio : MensajeService, private db : AngularFirestore) { }

  getReservaciones(){
    
    this.db.collection('reservaciones')
    .snapshotChanges()
    .pipe(
    map( docArray =>{
             return docArray.map(doc   => { 
               const data =  (doc.payload.doc.data() as Reserva);
         return {
           id: doc.payload.doc.id, 
          nombre:  data.nombre, 
           correo: data.correo, 
           numHab: data.numHab,
           fechai: data.fechai,
           fechas: data.fechas
          };
       });
     })
    ).subscribe((reserva : Reserva []) =>{
      this.reservaciones = reserva;
      this.cargaReservas.next([...this.reservaciones]);
    } );
    
    this.mensajeServicio.add('Mensaje de Reservaciones: Buscando reservacion');

  }
}

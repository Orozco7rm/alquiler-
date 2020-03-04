import { Injectable } from '@angular/core';
import {Reserva} from './reserva';
import { Observable, of, Subject } from 'rxjs';
import {MensajeService} from './mensajes.service';
import { AngularFirestore } from 'angularfire2/firestore';
import {catchError, map, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  cargaReservas = new Subject<Reserva[]>();
  reservas: Observable<Reserva[]>;
  private reservaciones : Reserva[ ] = [];

  private log(message: string) {
    this.mensajeServicio.add(`Mensaje de Reservaciones: ${message}`);
  }

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
     ,tap(_ => this.log('Reservas encontradas')),
     catchError( this.handleError <Reserva[]>('getReservaciones', []))
    ).subscribe((reserva : Reserva []) =>{
      this.reservaciones = reserva;
      this.cargaReservas.next([...this.reservaciones]);
    } );
   this.mensajeServicio.add('Mensaje de Reservaciones: Buscando reservacion');
  }

  private handleError<Reserva> (operation = 'operation', result?: Reserva) {
    return (error: any): Observable<Reserva> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
     this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as Reserva);
    };
  }

   insertarEnBaseD(reserva : Reserva){
    this.db.collection('reservaciones').add(reserva);  
    this.mensajeServicio.add('Mensaje de Reservaciones: Reservacion Ingresada');
  }
   eliminarEnBaseD(reserva: Reserva){
this.db.collection('reservaciones').doc(reserva.id).delete();
   }

}

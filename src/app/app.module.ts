import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {environment} from '../environments/environment';


import { AppComponent } from './app.component';
import { ReservasComponent } from './reservas/reservas.component';
import { initializeApp } from 'firebase';
import { DetallesReservacionComponent } from './detalles-reservacion/detalles-reservacion.component';
import { MensajesComponent } from './mensajes/mensajes.component';


@NgModule({
  declarations: [
    AppComponent,
    ReservasComponent,
    DetallesReservacionComponent,
    MensajesComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


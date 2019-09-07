import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FindService } from './search.service';
import { CleanService } from './clean.service';

import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule } from '@angular/fire/firestore'

// Firestore Credentials
const firebaseConfig = {
  apiKey: "AIzaSyDrNeXR0jCpQ3xOaQT2Sm0d5Jy2Qi8V0GU",
  authDomain: "songs-522b9.firebaseapp.com",
  databaseURL: "https://songs-522b9.firebaseio.com",
  projectId: "songs-522b9",
  storageBucket: "",
  messagingSenderId: "749099498662",
  appId: "1:749099498662:web:c3e8f878f8317a72370867"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule
  ],
  providers: [
    FindService,
    CleanService],
  bootstrap: [AppComponent]
})
export class AppModule { }

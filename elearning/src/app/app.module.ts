import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppComponent } from './app.component';
import { ClassRoomComponent } from './class-room/class-room.component';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { LoginComponent } from './login/login.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/database';


const appRoutes: Routes = [
  { path: 'classroom', component: ClassRoomComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    ClassRoomComponent,
    PdfViewerComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDNZm-Fge-EZavmehVeQxKAewQT69YuH9o",
    authDomain: "e-learning-c2db4.firebaseapp.com",
    databaseURL: "https://e-learning-c2db4.firebaseio.com",
    projectId: "e-learning-c2db4",
    storageBucket: "e-learning-c2db4.appspot.com",
    messagingSenderId: "937205849892"
  }
};

platformBrowserDynamic().bootstrapModule(AppModule);

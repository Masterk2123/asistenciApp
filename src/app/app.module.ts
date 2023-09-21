import { ApiclientService } from './services/apiclient.service';
import { AuthenticationService } from './services/authetication.service';
import { SQLiteService } from './services/sqlite.service';
import { StorageService } from './services/storage.service';
import { DatabaseService } from './services/database.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuardService } from './services/auth-guard.guard';
import { LoginGuardService } from './services/login-guard.guard';
import { JeepSqliteCustomEvent } from 'jeep-sqlite';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    BrowserAnimationsModule, 
    HttpClientModule],
  providers: [
    DatabaseService, 
    StorageService, 
    SQLiteService, 
    AuthenticationService,
    ApiclientService,
    AuthGuardService,
    LoginGuardService,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

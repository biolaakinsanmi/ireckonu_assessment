import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { Page404Component } from './page404/page404.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileListComponent,
    Page404Component,
    ViewProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

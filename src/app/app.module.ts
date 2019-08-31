import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { Page404Component } from './page404/page404.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileDetailComponent } from './view-profile/profile-detail/profile-detail.component';
import { ProfileIdsComponent } from './view-profile/profile-ids/profile-ids.component';
import { ActivityTimelineComponent } from './view-profile/activity-timeline/activity-timeline.component';
import { QuickFactsComponent } from './view-profile/quick-facts/quick-facts.component';


@NgModule({
  declarations: [
    AppComponent,
    ProfileListComponent,
    Page404Component,
    ViewProfileComponent,
    ProfileDetailComponent,
    ProfileIdsComponent,
    ActivityTimelineComponent,
    QuickFactsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

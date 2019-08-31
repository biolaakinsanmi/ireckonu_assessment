import { ProfileListComponent } from './profile-list/profile-list.component';
import { Page404Component } from './page404/page404.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path:  'home',
    component:  ProfileListComponent
  },
  {
    path:  'profile/:id',
    component:  ViewProfileComponent
  },
  {
    path: '**',
    component: Page404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

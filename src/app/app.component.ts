import { SubscriptionLike } from 'rxjs';
import { ProfilesService } from './_services/profiles.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ireckonuproject';
  constructor(
    private profilesService: ProfilesService
  ){}

  doneFetching: Boolean = null;
  hasFetchedProfiles$: SubscriptionLike;

  ngOnInit() {
    //tell service to fetch profiles
    this.profilesService.fetchApiProfiles();


    //listen profiles loaded...
    this.hasFetchedProfiles$ = this.profilesService.hasFetchedProfiles$.subscribe(
      (val: Boolean)=>{
        //get Id from activated route
        this.doneFetching = val;
      }
    )
  }


  ngOnDestroy(){
    if(this.hasFetchedProfiles$){
      this.hasFetchedProfiles$.unsubscribe();
    }
  }
}

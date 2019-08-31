import { ProfilesService } from '../_services/profiles.service';
import { Profile } from './../_models/profile-model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionLike } from 'rxjs';


@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profilesService: ProfilesService,
  ) { }


  fetchedProfiles: Array<Profile> = [];
  hasFetchedProfiles$: SubscriptionLike;

  theProfile: Profile = new Profile;

  ngOnInit() {
    //when profiles loaded...
    this.hasFetchedProfiles$ = this.profilesService.hasFetchedProfiles$.subscribe(
      (val: Boolean)=>{
        if(val){
          //get Id from activated route
          this.theProfile.localId = +this.route.snapshot.paramMap.get('id');

          //fetch ID from servicedata
          this.findProfileById();
        }
      }
    )
  }

  findProfileById(){
    this.theProfile = this.profilesService.findProfileById(this.theProfile.localId);

    if(!this.theProfile){
      this.router.navigate(['/404'])
    }
  }

  ngOnDestroy(){
    if(this.hasFetchedProfiles$){
      this.hasFetchedProfiles$.unsubscribe();
    }
  }

}

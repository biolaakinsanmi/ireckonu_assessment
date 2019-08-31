import { MatTableDataSource } from '@angular/material/table';
import { Profile } from './../_models/profile-model';
import { ProfilesService } from '../_services/profiles.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { of, SubscriptionLike } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})
export class ProfileListComponent implements OnInit, OnDestroy {

  constructor(
    private profilesService: ProfilesService,
    private router: Router
  ) { }

  public searchQuery: FormControl = new FormControl('');

  allProfiles: Array<Profile> = [];
  hasFetchedProfiles$: SubscriptionLike;

  renderedProfiles: Array<Profile> = [];
  dataSource = new MatTableDataSource(this.allProfiles);

  displayedColumns = ['avatar', 'localId', 'email', 'name', 'phoneNumber', 'address', 'modified', 'view'];

  page: number = 1;
  pageSize: number = 25;

  noFetchedResult: Boolean = false;
  noFilterResultWarning: Boolean = false;

  ngOnInit() {
    //when profiles loaded...
    this.hasFetchedProfiles$ = this.profilesService.hasFetchedProfiles$.subscribe(
      (val: Boolean)=>{
        if(val){
          //get service loaded profiles
          this.allProfiles = this.profilesService.getProfiles();

          //if noresults, eneable view alert
          this.noFetchedResult = this.allProfiles.length > 0? false: true;

          //disable the filter inputs if no result
          if(this.noFetchedResult){
            this.searchQuery.disable();
          }
          else{
            this.searchQuery.enable();
          }

          //render results in view
          this.updateDataSource(this.allProfiles);
        }
      }
    )

    //subscribe to input field changes
    this.searchQuery.valueChanges.pipe(
      debounceTime(200),    //delay by 200ms for changes
      distinctUntilChanged(),  //ingnore similar emits
      switchMap((query) =>  {
        //trigger search on every query
        return this.filterProfile(query)
      })
    )
    .subscribe( (result:Array<Profile>) =>
    {
      if(result && result.length < 1 && !this.searchQuery.value){
        this.updateDataSource(this.allProfiles); //show all results
      }
      else{
        this.noFilterResultWarning = result.length < 1? true : false; //show notice f no filter
        this.updateDataSource(result) //update datasource in view with result
      }
    });
  }

  /**
   * Update the dataSource used by the Angular Material Table
   * @param  {Profile[]} data - the array list of profiles to display
   */
  updateDataSource(data: Array<Profile>){
    //TODO: SHOW NO RESULTS
    this.renderedProfiles = [... data];
    let startIndex = (this.page - 1) * this.pageSize;
    this.dataSource = new MatTableDataSource(this.renderedProfiles.slice(startIndex, startIndex + this.pageSize));
  }


  /**
   * filter the list of Profiles that match the query on firstName, lastName and emailAdress fields
   * @param {string} query - the filter query
   */
  filterProfile(query: string){
    let result = this.profilesService.filterProfileByNameOrEmail(query)
    return of(result);
  }

  /**
   * Page event handler when the paginator is clicked
   * @param $event - event from the mat-paginator directive
   */
  pageEvent($event: any){
    this.page = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.updateDataSource(this.allProfiles);
  }

  /**
   * Handles routing to the viewed profile page
   * @param {Profile} profile - the profile to be viewed
   */
  viewProfile(profile: Profile){
    this.router.navigate(['/profile', profile.localId])
  }

  /**
   * Sort Data
   * @param $event - Event from clicked item
   */
  sortData(sort: any){
    const data = this.renderedProfiles.slice();
    if (!sort.active || sort.direction === '') {
      this.renderedProfiles = data;
      return;
    }
    else{
      this.renderedProfiles = data.sort((a:Profile, b:Profile) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'localId': return this.compareStrings(a.localId, b.localId, isAsc);
          case 'email': return this.compareStrings(a.emailAddress, b.emailAddress, isAsc);
          case 'name': return this.compareStrings(a.prefix + ' ' + a.firstName + ' ' + a.lastName, b.prefix + ' ' +  b.firstName + ' ' + b.lastName, isAsc);
          case 'phoneNumber': return this.compareStrings(a.phoneNumber, b.phoneNumber, isAsc);
          case 'address': return this.compareStrings(a.address, b.address, isAsc);
          case 'modified': return this.compareDates(a.birthDate, b.birthDate, isAsc);
          default: return 0;
        }
      });
    }

    this.updateDataSource(this.renderedProfiles);

  }

  compareStrings(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  compareDates(a: number | string, b: number | string, isAsc: boolean) {
    let dateA = new Date(a);
    let dateB = new Date(b);
    return (dateA < dateB ? -1 : 1) * (isAsc ? 1 : -1);
  }

  /**
   * unsubscribe
   */
  ngOnDestroy(){
    if(this.hasFetchedProfiles$){
      this.hasFetchedProfiles$.unsubscribe();
    }
  }
}

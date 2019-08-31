import { Profile } from '../_models/profile-model';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  constructor(
    private http: HttpClient
  ) { }


  allProfiles: Array<Profile> = [];
  hasFetchedProfiles: Boolean = null;
  _hasFetchedProfiles: BehaviorSubject<Boolean> = new BehaviorSubject(this.hasFetchedProfiles);
  hasFetchedProfiles$: Observable<Boolean> = this._hasFetchedProfiles.asObservable();

  /**
   * Service to fetch profiles form API
   * @param null
   */
  fetchApiProfiles(){
    this.hasFetchedProfiles = null;

    this.http.get(environment.fireApiBaseUrl).subscribe(
      (response: Array<Profile>)=>{
        this.allProfiles = response == null? [] : response;
        this.hasFetchedProfiles = true;
        this._hasFetchedProfiles.next(this.hasFetchedProfiles);
      },
      (error: any)=>{
        this.hasFetchedProfiles = false;
        this._hasFetchedProfiles.next(this.hasFetchedProfiles);
      }
    )
  }

  /**
   * Get loaded profiles
   */
  getProfiles(){
    return this.allProfiles;
  }

  /**
   * Find a profile that matches a profile Id
   * @param {number} localId
   */
  findProfileById(localId: number): Profile{
    if(isNaN(+localId)) return  null;
    var result = this.allProfiles.filter(
      (e: Profile)=>{
        return +e.localId === +localId;
      }
    )
    console.log(result, "LLLLLLLLLLLL", this.allProfiles)
    return result.length > 0? result[0]: null;
  }

  /**
   * Find profiles with name and email that match query
   * @param {string} query
   */
  filterProfileByNameOrEmail(query: string){
    query = query.toLowerCase();
    var result = this.allProfiles.filter(
      (e: Profile)=>{
        return e.lastName.toLowerCase().includes(query) || e.firstName.toLowerCase().includes(query) || e.emailAddress.toLowerCase().includes(query)
      }
    )
    return result;
  }
}

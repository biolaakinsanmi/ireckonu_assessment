import { Profile } from './../../_models/profile-model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[app-profile-ids]',
  templateUrl: './profile-ids.component.html',
  styleUrls: ['./profile-ids.component.scss']
})
export class ProfileIdsComponent implements OnInit {
  @Input() theProfile: Profile;

  constructor() { }

  ngOnInit() {
  }

}

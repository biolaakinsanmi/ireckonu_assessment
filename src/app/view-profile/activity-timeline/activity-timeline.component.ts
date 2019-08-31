import { Profile } from './../../_models/profile-model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-activity-timeline',
  templateUrl: './activity-timeline.component.html',
  styleUrls: ['./activity-timeline.component.scss']
})
export class ActivityTimelineComponent implements OnInit {
  @Input() theProfile: Profile;

  constructor() { }

  ngOnInit() {
  }

}

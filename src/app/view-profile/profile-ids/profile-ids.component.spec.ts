import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileIdsComponent } from './profile-ids.component';

describe('ProfileIdsComponent', () => {
  let component: ProfileIdsComponent;
  let fixture: ComponentFixture<ProfileIdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileIdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileIdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileListComponent } from './profile-list.component';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

fdescribe('ProfileListComponent', () => {
  let component: ProfileListComponent;
  let fixture: ComponentFixture<ProfileListComponent>;
  let navigateSpy: jasmine.Spy;

  const dataRows = [
    {
      "address": "66367 Continental Terrace",
      "avatar": "https://robohash.org/etquisipsam.png?size=50x50&set=set1",
      "birthDate": "2019-02-03",
      "emailAddress": "cdelong0@feedburner.com",
      "firstName": "Camilla",
      "languagePreference": "Latvian",
      "lastName": "Delong",
      "localId": 1,
      "phoneNumber": "532-525-3782",
      "prefix": "Mrs",
      "suffix": "IV"
    },
    {
      "address": "63135 Forest Dale Terrace",
      "avatar": "https://robohash.org/veritatisaliasaut.jpg?size=50x50&set=set1",
      "birthDate": "2019-08-23",
      "emailAddress": "rmathie1@shareasale.com",
      "firstName": "Rozina",
      "languagePreference": "Zulu",
      "lastName": "Mathie",
      "localId": 2,
      "phoneNumber": "154-525-7640",
      "prefix": "Mrs",
      "suffix": "IV"
    },
    {
      "address": "23 Warrior Plaza",
      "avatar": "https://robohash.org/odiovelfugiat.png?size=50x50&set=set1",
      "birthDate": "2018-12-12",
      "emailAddress": "otakos2@princeton.edu",
      "firstName": "Orsola",
      "languagePreference": "Indonesian",
      "lastName": "Takos",
      "localId": 3,
      "phoneNumber": "758-123-4138",
      "prefix": "Ms",
      "suffix": "Sr"
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileListComponent ],
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    navigateSpy = spyOn(TestBed.get(Router), 'navigate'); // <= init spy
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 1 row on the profiles table', () => {
    component.updateDataSource(dataRows);
    fixture.detectChanges();

    let tableRows = fixture.nativeElement.querySelectorAll('tr .img_thumb img');

    expect(tableRows.length).toBe(3);
  });

  it('should render 0 row on the profiles table', () => {
    const emptyDataRows = [];
    component.updateDataSource(emptyDataRows);
    fixture.detectChanges();

    let tableRows = fixture.nativeElement.querySelectorAll('tr .img_thumb img');

    expect(tableRows.length).toBe(0);
  });

  it('should navigte profile page when you pass profile to viewdProfile()', (() => {
    component.viewProfile(dataRows[0])
    expect(navigateSpy).toHaveBeenCalledWith(['/profile', dataRows[0].localId]); // <= check spy
  }));
});

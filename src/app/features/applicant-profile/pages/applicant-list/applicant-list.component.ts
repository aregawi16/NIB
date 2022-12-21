import { Religion } from './../../../../core/constants/religion.enum';
import { MaritalStatus } from './../../../../core/constants/marital-status.enum';
import { AddApplicantComponent } from './../add-applicant/add-applicant.component';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApplicantProfileService } from '../../services/applicant-profile.service';
import { Gender } from 'src/app/core/constants/gender.enum';

export interface ApplicantProfile {
  id: number;
  applicantProfilename: string;
  password: string;
  profile: ApplicantProfileProfile;
  work: ApplicantProfileWork;
  contacts: ApplicantProfileContacts;
  social: ApplicantProfileSocial;
  settings: ApplicantProfileSettings;
}


export interface ApplicantProfileProfile {
  name: string;
  surname: string;
  birthday: Object;
  gender: string;
  image: string;
}

export interface ApplicantProfileWork {
  company: string;
  position: string;
  salary: number;
}

export interface ApplicantProfileContacts{
  email: string;
  phone: string;
  address: string;
}

export interface ApplicantProfileSocial {
  facebook: string;
  twitter: string;
  google: string;
}

export interface ApplicantProfileSettings{
  isActive: boolean;
  isDeleted: boolean;
  registrationDate: string;
  joinedDate: string;
}
@Component({
  selector: 'app-applicant-list',
  templateUrl: './applicant-list.component.html',
  styleUrls: ['./applicant-list.component.scss']
})





export class ApplicantListComponent implements OnInit {
    public applicantProfiles!: ApplicantProfile[];
    public searchText!: string;
    public page:any;
    countries!:{name:string,code:string}[];
    genders!:number[];
    genderList=Gender;
    maritalStatuses!:number[];
    maritalStatusList=MaritalStatus;
    religions!:number[];
    religionList=Religion;
    constructor(
                public dialog: MatDialog,
                public _applicantService: ApplicantProfileService,
                ){
    }

    ngOnInit() {

        this.getApplicantProfiles();
              this.genders= Object.keys(this.genderList).map(key => parseInt(key)).filter(f => !isNaN(Number(f)));
              this.maritalStatuses= Object.keys(this.maritalStatusList).map(key => parseInt(key)).filter(f => !isNaN(Number(f)));
              this.religions= Object.keys(this.religionList).map(key => parseInt(key)).filter(f => !isNaN(Number(f)));

            }

    public getApplicantProfiles(): void {
      this._applicantService.getApplicantRofiles()
      .subscribe(data => {
        this.applicantProfiles = data;
        console.log(data);
      });


    }
    public addApplicantProfile(applicantProfile:any){
    }
    public updateApplicantProfile(applicantProfile:any){
    }
    public deleteApplicantProfile(applicantProfile:any){
    }
    public detailApplicantProfile(applicantProfile){
      this._applicantService.getApplicantRofileById(applicantProfile.applicantProfileId)
      .subscribe(data => {
        this.applicantProfiles = data;
        console.log(data);
      });

    }


    public onPageChanged(event){
        this.page = event;
        this.getApplicantProfiles();
        window.scrollTo(0,0);
        // if(this.settings.fixedHeader){
        //     document.getElementById('main-content').scrollTop = 0;
        // }
        // else{
        //     document.getElementsByClassName('mat-drawer-content')[0].scrollTop = 0;
        // }
    }

    public openApplicantProfileDialog(applicantProfile){
        let dialogRef = this.dialog.open(AddApplicantComponent, {
            data: applicantProfile
        });

        dialogRef.afterClosed().subscribe(applicantProfile => {
            if(applicantProfile){
                (applicantProfile.id) ? this.updateApplicantProfile(applicantProfile) : this.addApplicantProfile(applicantProfile);
            }
        });
    }

}

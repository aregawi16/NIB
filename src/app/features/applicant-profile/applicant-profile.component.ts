import { ApplicantProfileService } from './services/applicant-profile.service';
import { Component } from '@angular/core';
import { DropDownObject } from 'src/app/core/models/dropDownObject';

@Component({
  selector: 'app-applicant-profile',
  templateUrl: './applicant-profile.component.html',
  styleUrls: ['./applicant-profile.component.scss']
})
export class ApplicantProfileComponent {

   commonJobs!: Array<DropDownObject>;
constructor(  private _applicantProfileService:ApplicantProfileService)
{

}




}

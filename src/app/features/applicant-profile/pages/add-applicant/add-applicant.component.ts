import { SettingService } from './../../../setting/setting.service';
import { MaritalStatus } from './../../../../core/constants/marital-status.enum';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ApplicantProfileService } from './../../services/applicant-profile.service';
import { DropDownObject } from './../../../../core/models/dropDownObject';
import { formatDate } from '@angular/common';


import {Component} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms'
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { Gender } from 'src/app/core/constants/gender.enum';
import { Religion } from 'src/app/core/constants/religion.enum';

/**
 * @title Stepper with customized states
**/
@Component({
  selector: 'add-applicant',
  templateUrl: 'add-applicant.component.html',
  styleUrls: ['add-applicant.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
})
export class AddApplicantComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  workExperienceForm!: FormGroup;
  personalInfoFormGroup!: FormGroup;
  workExperienceFormGroup!: FormGroup;
  contactPersonFormGroup!: FormGroup;
  experiencedJobFormGroup!: FormGroup;
  documentFormGroup!: FormGroup;
  disabled:boolean=false;
  countries!:{name:string,code:string}[];
  genders!:number[];
  genderList=Gender;
  maritalStatuses!:number[];
  maritalStatusList=MaritalStatus;
  religions!:number[];
  refNo:string="nnn";
  hidden = false;
  religionList=Religion;
  locale: string = 'en-US';
  format: string = 'MM-dd-yyyy';
  formatData = new FormData();
  isEditable = false;

   commonJobs: DropDownObject[] = [
  ];
   countrys: DropDownObject[] = [
  ];


  constructor(public _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _settingService: SettingService,
    private _applicantProfileService:ApplicantProfileService
    ) {
    this.workExperienceForm = this._formBuilder.group({
      rows: this._formBuilder.array([])
    })
    this.experiencedJobFormGroup = this._formBuilder.group({
      jobs: this._formBuilder.array([])
    })

    //Personal Info
    this.personalInfoFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: ['', Validators.required],
      phoneNumber: ['', Validators.required,Validators.maxLength(10)],
      passportNo: ['', Validators.required,Validators.maxLength(6)],
      passportIssueDate: ['', Validators.required],
      passportExpiryDate: ['', Validators.required],
      referenceNo: ['', Validators.required],
      DOB: ['', Validators.required],
      nationality: ['', Validators.required],
      maritalStatus: [Number, Validators.required],
      gender: ['', Validators.required],
      noOfChildren: ['', Validators.required],
      religion: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      city: ['', Validators.required],
      wereda: ['', Validators.required],
      kebelle: ['', Validators.required],
      workExperiences:[],
      contactPerson:{},
      experiencedJobs:[],
      applicantDocuments:{}

    });
    // this.workExperienceFormGroup = this._formBuilder.group({
    //   startDate: ['', Validators.required],
    //   endDate: ['', Validators.required],
    //   country: ['', Validators.required],
    //   jobDescription: ['', Validators.required],
    // });
    this.contactPersonFormGroup = this._formBuilder.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      city: ['', Validators.required],
      wereda: ['', Validators.required],
      kebelle: ['', Validators.required],
      });



      this.initGroup();
      this.initCommonJobs();


    this.documentFormGroup = this._formBuilder.group({
      applicantPassport: [''],
      applicantId: [''],
      contactDocument: [''],
      applicantVideo: [''],
      applicantShortPhoto: [''],
      applicantFullPhoto: [''],
    });


  this.countries = _applicantProfileService.getCountries();

  this.getCountrys();
  this.genders= Object.keys(this.genderList).map(key => parseInt(key)).filter(f => !isNaN(Number(f)));
  this.maritalStatuses= Object.keys(this.maritalStatusList).map(key => parseInt(key)).filter(f => !isNaN(Number(f)));
  console.log(this.maritalStatuses);
  this.religions= Object.keys(this.religionList).map(key => parseInt(key)).filter(f => !isNaN(Number(f)));


  }
  initGroup() {
    console.log("falsss");
    let rows = this.workExperienceForm.get('rows') as FormArray;
    rows.push(this._formBuilder.group({
      ApplicantProfileId: [1],
      startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    country: ['', Validators.required],
    jobDescription: ['', Validators.required],
    }))
  }

  transformDate(date) {
    console.log(formatDate(date, this.format, this.locale));
    return formatDate(date, this.format, this.locale);
  }

  initCommonJobs(){

this._applicantProfileService.getCommonJobs()
    .subscribe(data => {

      this.commonJobs = data;
      this.commonJobs.forEach(item =>{
  let jobs = this.experiencedJobFormGroup.get('jobs') as FormArray;
  jobs.push(this._formBuilder.group({
    commonJobId: item.id,
    commonJobName: item.name,
  haveExperience: false,
  }))


    });

     console.log(this.commonJobs);
   console.log(this.experiencedJobFormGroup['controls'].jobs['controls']);


   });

}
generateRefNo()
{
  this.refNo = this.personalInfoFormGroup['controls'].firstName.value?.charAt(0);;
}
  onDeleteRow(rowIndex) {
    let rows = this.workExperienceForm.get('rows') as FormArray;
    rows.removeAt(rowIndex)
  }

  public giveImage(event)
{
  console.log(event.target.files[0]);
}

checkExp(row)
{

  //row.value.haveExperience.setValue(true);
}

getJobs()
{

  this._applicantProfileService.getCommonJobs()
    .subscribe(data => {
      this.commonJobs = data;



    });
}
getCountrys()
{

  this._settingService.getCountryList()
    .subscribe(data => {
      this.countrys = data;
      console.log(this.countrys);
;


    });
}
onSubmit()
{
  this.personalInfoFormGroup.controls.workExperiences.setValue(this.workExperienceForm.value.rows);
  this.personalInfoFormGroup.controls.contactPerson.setValue(this.contactPersonFormGroup.value);
  this.personalInfoFormGroup.controls.experiencedJobs.setValue(this.experiencedJobFormGroup.value.jobs);
  this.personalInfoFormGroup.controls.applicantDocuments.setValue(this.documentFormGroup.value);
  const formData = new FormData();
  Object.entries(this.personalInfoFormGroup.value).forEach(([key, value]) => {
    formData.append(key,JSON.stringify(value));
  });
  console.log(formData);
    console.log(this.personalInfoFormGroup.value);
    this._applicantProfileService.createApplicantProfile(formData)
    .subscribe(data => {


          this._snackBar.open('Job added successfully', 'Undo', {
            duration:10000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });


    });
}

onChangeApplicantPassport(event)
{
  this.documentFormGroup.controls.applicantPassport.setValue(event.target.files[0]);
  this.formatData.append("applicantPassport",event.target.files[0]);
}
onChangeApplicantId(event)
{
  this.documentFormGroup.controls.applicantId.setValue(event.target.files[0]);
  this.formatData.append("applicantId",event.target.files[0]);

}
onChangeContactId(event)
{
  this.documentFormGroup.controls.contactDocument.setValue(event.target.files[0]);
  this.formatData.append("contactDocument",event.target.files[0]);

}
onChangeApplicantShortPhoto(event)
{
  this.documentFormGroup.controls.applicantShortPhoto.setValue(event.target.files[0]);
  this.formatData.append("applicantShortPhoto",event.target.files[0]);

}
onChangeApplicantFullPhoto(event)
{
  this.documentFormGroup.controls.applicantFullPhoto.setValue(event.target.files[0]);
  this.formatData.append("applicantFullPhoto",event.target.files[0]);

}
onChangeApplicantVideo(event)
{
  this.documentFormGroup.controls.applicantVideo.setValue(event.target.files[0]);
  this.formatData.append("applicantVideo",event.target.files[0]);

}
}

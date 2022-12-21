import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ApplicantProfileService } from './../../services/applicant-profile.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-applicant-detail',
  templateUrl: './applicant-detail.component.html',
  styleUrls: ['./applicant-detail.component.scss']
})
export class ApplicantDetailComponent implements OnInit {

   applicantProfile !:any;
   workExperienceDataSource!: MatTableDataSource<any>;
   experiencedJobDataSource!: MatTableDataSource<any>;
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;
   displayedWorkExperienceColumns: string[] = ['startDate', 'endDate', 'duration', 'country', 'jobDescription'];
   displayedExperiencedJobsColumns: string[] = ['job', 'haveExperience'];

  constructor(
    public _applicantService: ApplicantProfileService,
    private activatedRoute: ActivatedRoute

  ) { }


  ngOnInit(): void {

  this.activatedRoute.params.subscribe(params => {
    if(params['id']){
      this.getApplicantProfileById(params['id']);
    }
    else{
      this.getApplicantProfileById(1);
    }
  });
}

public getApplicantProfileById(id:any){
  this._applicantService.getApplicantRofileById(id)
  .subscribe(data => {
    this.applicantProfile = data;
    this.workExperienceDataSource = new MatTableDataSource(data.workExperiences);
    this.workExperienceDataSource.paginator = this.paginator;
    this.workExperienceDataSource.sort = this.sort;

    this.experiencedJobDataSource = new MatTableDataSource(data.experiencedJobs);
    this.experiencedJobDataSource.paginator = this.paginator;
    this.experiencedJobDataSource.sort = this.sort;
    console.log(data);
  });

}

}

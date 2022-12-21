import { environment } from "src/environments/environment";

export class HttpApi {
  // OAuth
  static oauthLogin = 'Auth/SignIn';
  static userRegister = 'Auth/SignUp';

// Get Applicant Profile
static getApplicantProfiles = 'ApplicantProfile';
static createApplicantProfile = 'ApplicantProfile';
static getApplicantProfileList = 'ApplicantProfile';

// Get Jobs
static getJobs = 'CommonJob/list';
static createJob = 'CommonJob';
static getJobList = 'CommonJob';
// Get Jobs
static getCountryList = 'Country/list';
static country = 'Country';

}

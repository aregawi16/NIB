import { DropDownObject } from './../../../core/models/dropDownObject';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpApi } from 'src/app/core/interceptor/http-api';
import { Country } from 'src/app/core/constants/country';

@Injectable({
  providedIn: 'root'
})
export class ApplicantProfileService {

constructor(
  private _http:HttpClient
) { }

 getCommonJobs()
{
  return this._http.get<DropDownObject[]>(HttpApi.getJobs)
  .pipe(
    map((response: any) => {
      return response;
    })
  );
}

createApplicantProfile(data)
{
  return this._http.post(HttpApi.createApplicantProfile,data)
  .pipe(
    map((response: any) => {
      return response;
    })
  );
}

public getApplicantRofiles()
{
  return this._http.get(HttpApi.createApplicantProfile)
  .pipe(
    map((response: any) => {
      return response;
    })
  );
}

public getApplicantRofileById(id:any)
{
  return this._http.get(HttpApi.createApplicantProfile+'/'+id)
  .pipe(
    map((response: any) => {
      return response;
    })
  );
}
public getCountries(){
  return Country;
}
}

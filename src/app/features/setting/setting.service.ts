import { DropDownObject } from './../../core/models/dropDownObject';
import { map } from 'rxjs/operators';
import { HttpApi } from 'src/app/core/interceptor/http-api';
import { CommonJob } from './pages/job/job.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from './pages/country/country.component';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(
    private _http:HttpClient
  ) { }

  //Common Job API
  public getCommonJobList()
  {
    return this._http.get<CommonJob[]>(HttpApi.getJobList)
    .pipe(
      map((response: CommonJob[]) => {
        console.log(response);
        return response;
      })
    );
  }

  public createCommonJob(data:CommonJob)
  {
    return this._http.post<CommonJob>(HttpApi.getJobList,data)
    .pipe(
      map((response: CommonJob) => {
        console.log(response);
        return response;
      })
    );
  }

  public deleteCommonJob(id:any)
  {
    return this._http.delete<CommonJob>(HttpApi.getJobList+'/'+id)
    .pipe(
      map((response: CommonJob) => {

      })
    );
  }

  //Country Api
  public getCountryList()
  {
    return this._http.get<DropDownObject[]>(HttpApi.getCountryList)
    .pipe(
      map((response: DropDownObject[]) => {
        return response;
      })
    );
  }
  public getCountrys()
  {
    return this._http.get<Country[]>(HttpApi.country)
    .pipe(
      map((response: Country[]) => {
        return response;
      })
    );
  }

  public createCountry(data:Country)
  {
    return this._http.post<Country>(HttpApi.country,data)
    .pipe(
      map((response: Country) => {
        console.log(response);
        return response;
      })
    );
  }

  public deleteCountry(id:any)
  {
    return this._http.delete<Country>(HttpApi.country+'/'+id)
    .pipe(
      map((response: Country) => {

      })
    );
  }


}

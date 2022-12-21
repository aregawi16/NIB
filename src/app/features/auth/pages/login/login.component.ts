import { LoginForm } from './../../models/LoginForm';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Subject, take, takeUntil } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit  {
  public  loginValid:boolean = true;


  hide = true;
  checked = false;
  disabled = false;

  login : LoginForm={
    userName:'',
    password:'',
    rememberMe:false
  };
  loginForm = new FormGroup({
    userName: new FormControl(
      this.login.userName, [
      Validators.required,
      Validators.minLength(5)
    ]),
    password: new FormControl(
      this.login.password, [
        Validators.required,
        Validators.minLength(8)
      ]
    ),
    rememberMe: new FormControl(false)
  });
  required:boolean=true;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService
  ) {
  }



  public ngOnInit(): void {

    this._authService.isLogged()
    {
      this._router.navigateByUrl('/');

    }

  }

  public onLogin(): void {


    this.loginValid = true;
console.log(this.loginForm.value);
    this._authService.loginWithUserCredentials(this.login)
    .pipe(
      take(1)
    ).subscribe({
      next: _ => {
        this.loginValid = true;
        this._router.navigateByUrl('/');
      },
      error: _ => this.loginValid = false
    });
  }
}


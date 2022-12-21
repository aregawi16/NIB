import { AuthService } from 'src/app/features/auth/services/auth.service';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { AppSettings, Settings } from '../app.settings';
import { Router, NavigationEnd, ActivatedRoute,Route } from '@angular/router';
import { MenuService } from './components/menu/menu.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {
  @ViewChild('sidenav') sidenav:any;
  public userImage = 'assets/images/others/core.jpg';
  public settings:Settings;
  accessToken!: string;
  public menuItems!:Array<any>;
  public toggleSearchBar:boolean = false;
  constructor(public appSettings:AppSettings,
              public router:Router,
              public route:ActivatedRoute,
              public authService:AuthService,
              private menuService: MenuService){
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    if(window.innerWidth <= 960){
      this.settings.adminSidenavIsOpened = false;
      this.settings.adminSidenavIsPinned = false;
    };
    setTimeout(() => {
      this.settings.theme = 'blue';
    });
    this.menuItems = this.menuService.getMenuItems();
    this.route.queryParams
      .subscribe(params => {
        //console.log(params);
         this.accessToken = params['access_token'];
        // console.log(this.accessToken); // price
         if(this.accessToken!=null)
         {
          localStorage.setItem('quick_access_token', JSON.stringify(this.accessToken));
          this.router.navigateByUrl('/core');


         }
          });
          // this.router.navigateByUrl('/core');
  }

  ngAfterViewInit(){
    if(document.getElementById('preloader')){
      document.getElementById('preloader')?.classList.add('hide');
    }
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.scrollToTop();
      }
      if(window.innerWidth <= 960){
        this.sidenav.close();
      }
    });
    this.menuService.expandActiveSubMenu(this.menuService.getMenuItems());
  }

  public toggleSidenav(){
    this.sidenav.toggle();
  }


  public scrollToTop(){
    var scrollDuration = 200;
    var scrollStep = -window.pageYOffset  / (scrollDuration / 20);
    var scrollInterval = setInterval(()=>{
      if(window.pageYOffset != 0){
         window.scrollBy(0, scrollStep);
      }
      else{
        clearInterval(scrollInterval);
      }
    },10);
    if(window.innerWidth <= 768){
      setTimeout(() => {
        window.scrollTo(0,0);
      });
    }
  }

  @HostListener('window:resize')
  public onWindowResize():void {
    if(window.innerWidth <= 960){
      this.settings.adminSidenavIsOpened = false;
      this.settings.adminSidenavIsPinned = false;
    }
    else{
      this.settings.adminSidenavIsOpened = true;
      this.settings.adminSidenavIsPinned = true;
    }
  }

}

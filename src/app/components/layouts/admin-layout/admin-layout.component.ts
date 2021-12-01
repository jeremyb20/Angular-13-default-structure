import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ThemeService } from 'src/app/services/theme.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MediaResponse, MediaService } from "src/app/services/media.service";
import { AuthService } from 'src/app/services/auth/auth.service';

declare var bootstrap: any;

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  Media: MediaResponse;
  private mediaSubscription: Subscription
  title: String;
  sidebarExpanded : boolean;
  routeState: any;
  user:any;
  selectTheme =  new FormControl('theme-default-dark');

  constructor(private router: Router, private themeService: ThemeService, private _media: MediaService, private _authService: AuthService) {
    this.user = this._authService.getUserRole();

    this.mediaSubscription = this._media.subscribeMedia().subscribe(media => {
      this.Media = media;
      this.sidebarExpanded = media.IsMobile ? false: true;
    })

    let currentUser = this.themeService.getThemeSelected();
    if(currentUser){
      this.themeService.setTheme(currentUser);
      this.selectTheme =  new FormControl(currentUser);
    }else{
      this.themeService.setTheme('theme-default-dark');
    }
    this.selectTheme.valueChanges.subscribe((value) => {
      this.themeService.setTheme(value);
    });
  }
  

  ngOnInit(){
    
  }

  logout(){
    this._authService.logout();
  }

  ngOnDestroy () {
    if(this.mediaSubscription){
      this.mediaSubscription.unsubscribe();
    }
  }

  close() {
    const navLinks = document.querySelectorAll('.nav-item')
    const menuToggle = document.getElementById('offcanvasExample')
    const bsCollapse = new bootstrap.Collapse(menuToggle)
    navLinks.forEach((l) => {
        l.addEventListener('click', () => { bsCollapse.toggle() })
    })
  }

}

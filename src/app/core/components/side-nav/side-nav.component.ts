import { TranslateService } from './../../../services/translate.service';
import { Component,OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Router} from "@angular/router";

import { ThemeService } from '../../services/theme.service';
import {TranslatePipe} from '../../../pipes/translate.pipe';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
user_obj=JSON.parse(localStorage.getItem('user_obj'))

  panelOpenState = false;

  isDarkTheme: Observable<boolean>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private router: Router,private themeService: ThemeService,
    private translate: TranslateService) {
      this.translate.use('en').then(() => {
        console.log('fghfg',this.translate.data);
      });

    }


  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
  };

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  };


logout(){
  localStorage.clear();
  this.router.navigate(['']);
};
changepassword(){
  this.router.navigate(['/main/change-password']);
};

setLang(lang: string) {
  this.translate.use(lang);
};

}

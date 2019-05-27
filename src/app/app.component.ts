import { Component } from '@angular/core';
import { TranslateService } from './services/translate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'soil1';

  constructor(private translate: TranslateService) {
    this.translate.use('en').then(() => {
      console.log('fghfg',this.translate.data);
    });
  }
  setLang (lang: string) {
    this.translate.use(lang);
  }
}

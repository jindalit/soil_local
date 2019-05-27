import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import{AngularmaterialModule} from '../shared/angularmaterial.module';
import {SideNavComponent} from '../core/components/side-nav/side-nav.component';
import {TranslateModule} from '../pipes/translate.module';
import { LoaderComponent } from './components/loader/loader.component';
import {LoaderService} from './services/loader.service';
@NgModule({
  declarations: [SideNavComponent, LoaderComponent,
    
    ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    AngularmaterialModule,
    RouterModule,
    TranslateModule

  ],
  exports: [
      CommonModule,
    FlexLayoutModule,
    AngularmaterialModule,
    RouterModule,
    SideNavComponent,
  ],
  providers: [LoaderService]
})
export class CoreModule { 

}

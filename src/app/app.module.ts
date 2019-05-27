import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule,APP_INITIALIZER  } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
// import {NavComponent} from './core/components/nav/nav.component';
// import {NavigationBarComponent} from './core/components/navigation-bar/navigation-bar.component';
//sared module//
// import{AngularmaterialModule} from '../app/shared/angularmaterial.module';
//core module//
import {CoreModule} from '../app/core/core.module'

import { HomeComponent } from './pages/home/home.component';
import { SideNav1Component } from './side-nav1/side-nav1.component';
import { LoginComponent } from './pages/Auth_pages/login/login.component';
import { MainComponent } from './layout/main/main.component';
import { UserListsComponent } from './pages/user-lists/user-lists.component';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor} from './interceptor/httpconfig.interceptor';
import {ErrordialofComponent} from './services/errordialof/errordialof.component';
import { SingleUserDetailComponent } from './pages/single-user-detail/single-user-detail.component';
import { AgGridModule } from 'ag-grid-angular';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateService } from './services/translate.service';
import { TranslateModule } from './pipes/translate.module';
import { AddNewVendorComponent } from './pages/vendor/add-new-vendor/add-new-vendor.component';

import { FormsModule } from '@angular/forms';
import { NearFarmerComponent } from './pages/Near_by/near-farmer/near-farmer.component';
import { NearULBComponent } from './pages/Near_by/near-ulb/near-ulb.component';
import { NearTestlabComponent } from './pages/Near_by/near-testlab/near-testlab.component';
import { NearFpoComponent } from './pages/Near_by/near-fpo/near-fpo.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ChangePaswordComponent } from './pages/change-pasword/change-pasword.component';
import { NewUsersListComponent } from './pages/new-users-list/new-users-list.component';
import { AddProductComponent } from './pages/product/add-product/add-product.component';
import { CreatePurchaseComponent } from './pages/purchase/create-purchase/create-purchase.component';
import { ProductListComponent } from './pages/product/product-list/product-list.component';
import { InventoryListComponent } from './pages/inventory/inventory-list/inventory-list.component';

import{SignupComponent} from './pages/Auth_pages/signup/signup.component';
import { PuchaselistComponent } from './pages/purchase/puchaselist/puchaselist.component';
import { CreateSaleComponent } from './pages/sale/create-sale/create-sale.component';
import { SaleUpdateComponent, DialogOverviewExampleDialog } from './pages/sale/sale-update/sale-update.component';

import {HorizontalTimelineComponent} from '../app/core/components/horizontal-timeline/horizontal-timeline.component';
import { AddUlbComponent } from './pages/user-lists/add-ulb/add-ulb.component';
import { AddFpoComponent } from './pages/user-lists/add-fpo/add-fpo.component';
import { TransportationComponent } from './pages/user-lists/transportation/transportation.component';
import { SaleListComponent } from './pages/sale/sale-list/sale-list.component';
import { PendingComponent } from './pages/transit/pending/pending.component';
import { OntransitComponent,OntransitMap } from './pages/transit/ontransit/ontransit.component';
import { DeliveredComponent } from './pages/transit/delivered/delivered.component';
import { RejectedComponent } from './pages/transit/rejected/rejected.component';
import { OutputtaxComponent } from './pages/tax/outputtax/outputtax.component';
import { OverdueComponent } from './pages/payment/overdue/overdue.component';
import { InvoiceComponent } from './pages/transit/invoice/invoice.component';
import { UpdateInventoryComponent } from './pages/inventory/update-inventory/update-inventory.component';
import{CurrencyComponent}from "./pipes/currency.pipe";
import { TestLabComponent } from './pages/user-lists/test-lab/test-lab.component';
import { PrintBarcodeComponent } from './pages/inventory/print-barcode/print-barcode.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { ProfileComponent } from './pages/profile/profile.component';
import { FpoListComponent } from './pages/user-lists/fpo-list/fpo-list.component';
import { UlbListComponent } from './pages/user-lists/ulb-list/ulb-list.component';
import { TransitListComponent } from './pages/user-lists/transit-list/transit-list.component';
import { TestlabListComponent } from './pages/user-lists/testlab-list/testlab-list.component';
import { TestCertificateComponent } from './pages/test-certificate/test-certificate.component';

// import { FlexLayoutModule } from '@angular/flex-layout';
// import{AngularmaterialModule} from '../app/shared/angularmaterial.module';

export function setupTranslateFactory(
  service: TranslateService): Function {
  return () => service.use('en');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SideNav1Component,
    LoginComponent,
    MainComponent,
    UserListsComponent,
    ErrordialofComponent,
    SingleUserDetailComponent,
    AddNewVendorComponent,
    NearFarmerComponent,
    NearULBComponent,
    NearTestlabComponent,
    NearFpoComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ChangePaswordComponent,
    NewUsersListComponent,
    AddProductComponent,
    CreatePurchaseComponent,
    ProductListComponent,
    InventoryListComponent,
    SignupComponent,
    PuchaselistComponent,
    CreateSaleComponent,
    SaleUpdateComponent,
    HorizontalTimelineComponent,
    DialogOverviewExampleDialog,
    AddUlbComponent,
    AddFpoComponent,
    TransportationComponent,
    SaleListComponent,
    PendingComponent,
    OntransitComponent,
    DeliveredComponent,
    RejectedComponent,
    OutputtaxComponent,
    OntransitMap,
    OverdueComponent,
    InvoiceComponent,
    UpdateInventoryComponent,
    CurrencyComponent,
    TestLabComponent,
    PrintBarcodeComponent,
    ProfileComponent,
    FpoListComponent,
    UlbListComponent,
    TransitListComponent,
    TestlabListComponent,
    TestCertificateComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    ReactiveFormsModule,
    CoreModule,
    TranslateModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBGAgIGOgNjdLq9JpgWF61GCkzi3ZIg0wk',libraries: ["places"] //Google API key for maps
    })
    , AgGridModule.withComponents([CurrencyComponent]),
    AgmDirectionModule,MatFileUploadModule,NgxBarcodeModule
    
  ],
  entryComponents: [
    ErrordialofComponent,
    DialogOverviewExampleDialog,
    OntransitMap
],
  providers: [TranslateService,{ provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      deps: [ TranslateService ],
      multi: true
    },

  ],
  exports: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

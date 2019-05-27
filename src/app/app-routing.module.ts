import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../app/pages/home/home.component';
import { ChangePaswordComponent } from '../app/pages/change-pasword/change-pasword.component';
import { LoginComponent } from '../app/pages/Auth_pages/login/login.component';
import { RegisterComponent } from '../app/pages/register/register.component';
import { ForgotPasswordComponent } from '../app/pages/forgot-password/forgot-password.component';
import { MainComponent } from '../app/layout/main/main.component';
import { UserListsComponent } from '../app/pages/user-lists/user-lists.component';
import { AddFpoComponent } from '../app/pages/user-lists/add-fpo/add-fpo.component';
import { AddUlbComponent } from '../app/pages/user-lists/add-ulb/add-ulb.component';
import { NewUsersListComponent } from "../app/pages/new-users-list/new-users-list.component"
import { SingleUserDetailComponent } from '../app/pages/single-user-detail/single-user-detail.component';
import { AddNewVendorComponent } from '../app/pages/vendor/add-new-vendor/add-new-vendor.component';
import { AddProductComponent } from "../app/pages/product/add-product/add-product.component";
import { TestLabComponent } from "../app/pages/user-lists/test-lab/test-lab.component";
import { ProductListComponent } from "../app/pages/product/product-list/product-list.component";
import { CreatePurchaseComponent } from "../app/pages/purchase/create-purchase/create-purchase.component"
import { InventoryListComponent } from "../app/pages/inventory/inventory-list/inventory-list.component";
import { UpdateInventoryComponent } from "../app/pages/inventory/update-inventory/update-inventory.component";
import { TransportationComponent } from '../app/pages/user-lists/transportation/transportation.component';
import { CreateSaleComponent } from './pages/sale/create-sale/create-sale.component';
import { SaleUpdateComponent } from './pages/sale/sale-update/sale-update.component';
import { SaleListComponent } from '../app/pages/sale/sale-list/sale-list.component';
import { PendingComponent } from '../app/pages/transit/pending/pending.component';
import { DeliveredComponent } from '../app/pages/transit/delivered/delivered.component';
import { OntransitComponent } from '../app/pages/transit/ontransit/ontransit.component';
import { RejectedComponent } from '../app/pages/transit/rejected/rejected.component';
import { OutputtaxComponent } from '../app/pages/tax/outputtax/outputtax.component';
import { OverdueComponent } from '../app/pages/payment/overdue/overdue.component';
import { InvoiceComponent } from '../app/pages/transit/invoice/invoice.component';
import { PrintBarcodeComponent } from '../app/pages/inventory/print-barcode/print-barcode.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FpoListComponent } from './pages/user-lists/fpo-list/fpo-list.component';
import { UlbListComponent } from './pages/user-lists/ulb-list/ulb-list.component';
import { TransitListComponent } from './pages/user-lists/transit-list/transit-list.component';
import { TestlabListComponent } from './pages/user-lists/testlab-list/testlab-list.component';
import { TestCertificateComponent } from './pages/test-certificate/test-certificate.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: 'main', component: MainComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'userlist', component: UserListsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'addfpo', component: AddFpoComponent },
      { path: 'fpo-list', component: FpoListComponent },
      { path: 'addulb', component: AddUlbComponent },
      { path: 'ulb-list', component: UlbListComponent },
      { path: 'addtrans', component: TransportationComponent },
      { path: 'transit-list', component: TransitListComponent },
      { path: 'addTestLab', component: TestLabComponent },
      { path: 'lab-list', component: TestlabListComponent },
      { path: 'test-Certificate', component: TestCertificateComponent },      
      { path: 'newuserlist', component: NewUsersListComponent },
      { path: 'userinfo', component: SingleUserDetailComponent },
      { path: 'addnewvendor', component: AddNewVendorComponent },
      { path: 'change-password', component: ChangePaswordComponent },
      { path: 'addnewproduct', component: AddProductComponent },
      { path: 'createpurchase', component: CreatePurchaseComponent },
      { path: 'productlist', component: ProductListComponent },
      { path: 'inventoryList', component: InventoryListComponent },
      { path: 'update-inventory', component: UpdateInventoryComponent },
      { path: 'print-barcode', component: PrintBarcodeComponent },

      //sale//
      { path: 'create_sale', component: CreateSaleComponent },
      { path: 'update_sale', component: SaleUpdateComponent },
      { path: 'salelist', component: SaleListComponent },
      //transit//
      { path: 'pendingtransitlist', component: PendingComponent },
      { path: 'delivtransitlist', component: DeliveredComponent },
      { path: 'ontransitlist', component: OntransitComponent },
      { path: 'rejecttransitlist', component: RejectedComponent },
      { path: 'outputtax', component: OutputtaxComponent },
      { path: 'overdue', component: OverdueComponent },
      { path: 'invoice', component: InvoiceComponent }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

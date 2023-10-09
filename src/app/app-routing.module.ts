import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/authentication-module/login/login.component';
import { RegisterUserComponent } from './components/authentication-module/register-user/register-user.component';
import { SendVerificationEmailComponent } from './components/authentication-module/send-verification-email/send-verification-email.component';
import { RegisterMainCompanyComponent } from './components/authentication-module/register-main-company/register-main-company.component';
import { PasswordResetComponent } from './components/authentication-module/password-reset/password-reset.component';
import { RegisterCompanyComponent } from './components/administration/register-company/register-company.component';
import { UsersComponent } from './components/administration/users/users.component';
import { VerifyEmailComponent } from './components/authentication-module/verify-email/verify-email.component';
import { UpdatePasswordComponent } from './components/authentication-module/update-password/update-password.component';
import { NavheadComponent } from './components/interface/navhead/navhead.component';
import { VerifyCodeComponent } from './components/authentication-module/verify-code/verify-code.component';
import { HomeComponent } from './components/authentication-module/home/home.component';
import { CompaniesComponent } from './components/administration/companies/companies.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ProductsComponent } from './components/inventory-module/products/products.component';
import { MainClientsComponent } from './components/clients/main-clients/main-clients.component';
import { DashboardComponent } from './components/interface/dashboard/dashboard.component';
import { MainShoppingComponent } from './components/shopping/main-shopping/main-shopping.component';
import { ShoppingComponent } from './components/shopping/shopping/shopping.component';
import { MainSuppliersComponent } from './components/suppliers/main-suppliers/main-suppliers.component';
import { SuppliersComponent } from './components/suppliers/suppliers/suppliers.component';
import { ModalComponent } from './components/modal/modal/modal.component';
import { RegisterProductComponent } from './components/inventory-module/register-product/register-product.component';
import { SalesComponent } from './components/sales-module/sales/sales.component';
import { RegisterSaleComponent } from './components/sales-module/register-sale/register-sale.component';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  // AUTHENTICATION MODULE
  { path: 'signin', component: LoginComponent },
  { path: 'signup', component: RegisterUserComponent },
  {
    path: 'signup/mail-verification',
    component: SendVerificationEmailComponent,
  },
  { path: 'signup/verify-email/:token', component: VerifyEmailComponent },
  { path: 'password-reset', component: PasswordResetComponent },
  { path: 'password-reset/verify-code', component: VerifyCodeComponent },
  { path: 'password-reset/reset', component: UpdatePasswordComponent },
  {
    path: 'main/register-main-company',
    component: RegisterMainCompanyComponent,
  },
  { path: 'main/update-password', component: UpdatePasswordComponent },
  // ADMINISTRATION MODULE
  { path: 'administration/companies', component: CompaniesComponent },
  // INTERFACE MODULE
  { path: 'navhead', component: NavheadComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      //CLIENTS MODULE
      {
        path: 'mainClients',
        component: MainClientsComponent,
        children: [{ path: 'clients', component: ClientsComponent }],
      },
      // SHOPPING MODULE
      {
        path: 'mainShopping',
        component: MainShoppingComponent,
      },
      {
        path: 'Shopping',
        component: ShoppingComponent,
      },

      // SUPPLIERS MODULE
      {
        path: 'mainSuppliers',
        component: MainSuppliersComponent,
        children: [{ path: 'suppliers', component: SuppliersComponent }],
      },
      // SALES MODULE
      {
        path: 'sales',
        component: SalesComponent,
      },
      {
        path: 'register-sale',
        component: RegisterSaleComponent,
      },
      // INVENTORY MODULE
      {
        path: 'products',
        component: ProductsComponent,
        children: [
          { path: 'register-product', component: RegisterProductComponent },
        ],
      },
      // INTERFACE MODULE
      {
        path: 'home',
        component: HomeComponent,
      },
    ],
  },
  // OTHERS
  { path: 'company', component: RegisterCompanyComponent },
  { path: 'users', component: UsersComponent },
  // CLIENTS MODULE
  {
    path: 'mainClients',
    component: MainClientsComponent,
  },
  { path: 'shopping', component: ShoppingComponent },
  {
    path: 'mainShopping',
    component: MainShoppingComponent,
    children: [{ path: 'shopping', component: ShoppingComponent }],
  },
  { path: 'modal', component: ModalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

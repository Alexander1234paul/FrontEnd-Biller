import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/authentication-module/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegisterCompanyComponent } from './components/administration/register-company/register-company.component';
import { UsersComponent } from './components/administration/users/users.component';
import { RegisterUserComponent } from './components/authentication-module/register-user/register-user.component';
import { SendVerificationEmailComponent } from './components/authentication-module/send-verification-email/send-verification-email.component';
import { RegisterMainCompanyComponent } from './components/authentication-module/register-main-company/register-main-company.component';
import { PasswordResetComponent } from './components/authentication-module/password-reset/password-reset.component';
import { VerifyEmailComponent } from './components/authentication-module/verify-email/verify-email.component';
import { UpdatePasswordComponent } from './components/authentication-module/update-password/update-password.component';
import { NavheadComponent } from './components/interface/navhead/navhead.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { VerifyCodeComponent } from './components/authentication-module/verify-code/verify-code.component';
import { HomeComponent } from './components/authentication-module/home/home.component';
import { CompaniesComponent } from './components/administration/companies/companies.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ProductsComponent } from './components/inventory-module/products/products.component';
import { TableModule } from 'primeng/table';
import { MainClientsComponent } from './components/clients/main-clients/main-clients.component';
import { DashboardComponent } from './components/interface/dashboard/dashboard.component';
import { MainShoppingComponent } from './components/shopping/main-shopping/main-shopping.component';
import { ShoppingComponent } from './components/shopping/shopping/shopping.component';
import { SuppliersComponent } from './components/suppliers/suppliers/suppliers.component';
import { MainSuppliersComponent } from './components/suppliers/main-suppliers/main-suppliers.component';
import { RegisterProductComponent } from './components/inventory-module/register-product/register-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SalesComponent } from './components/sales-module/sales/sales.component';
import { RegisterSaleComponent } from './components/sales-module/register-sale/register-sale.component';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DropdownModule } from 'primeng/dropdown';
import { ModalComponent } from './components/modal/modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterCompanyComponent,
    UsersComponent,
    RegisterUserComponent,
    SendVerificationEmailComponent,
    RegisterMainCompanyComponent,
    PasswordResetComponent,
    VerifyEmailComponent,
    UpdatePasswordComponent,
    NavheadComponent,
    VerifyCodeComponent,
    HomeComponent,
    CompaniesComponent,
    ClientsComponent,
    ProductsComponent,
    MainClientsComponent,
    DashboardComponent,
    MainShoppingComponent,
    ShoppingComponent,
    SuppliersComponent,
    MainSuppliersComponent,
    RegisterProductComponent,
    ModalComponent,
    SalesComponent,
    RegisterSaleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    CommonModule,
    MatProgressBarModule,
    TableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    DropdownModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

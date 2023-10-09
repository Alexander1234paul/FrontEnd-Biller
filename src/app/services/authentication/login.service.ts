import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  verifyEmailRegistered(email: string) {
    let url = environment.base_url + 'api/v1/verify-email-registered/' + email;
    return this.http.get(url);
  }

  verifyCode(form: any) {
    let url = environment.base_url + 'api/v1/verify-code';
    return this.http.post(url, form);
  }

  Login(form: any) {
    console.log(form);
    let url = environment.base_url + 'api/v1/login';
    return this.http.post(url, form);
  }

  // registerUser(form: any) {
  //   console.log(form);
  //   let url = environment.base_url + 'api/v1/register-user';
  //   return this.http.post(url, form);
  // }

  sendVerificationEmail(form: any): Observable<any> {
    let url = environment.base_url + 'api/v1/send-verification-email';
    return this.http.post<any>(url, form);
  }

  sendVerificationCode(form: any) {
    let url = environment.base_url + 'api/v1/send-verification-code';
    return this.http.post(url, form);
  }

  verifyToken(token: string) {
    let url = environment.base_url + 'api/v1/verify-token/' + token;
    return this.http.get(url);
  }

  updatePassword(token: string, password: string) {
    let url = environment.base_url + 'api/v1/update-password';
    let datos = { token: token, password }
    return this.http.put(url, JSON.stringify(datos), this.httpOptions);
  }

  updateCompany(form: any) {
    let url = environment.base_url + 'api/v1/update-company';
    return this.http.put(url, form);
  }

  getCompaniesByUser(id_usuario: number) {
    let url = environment.base_url + 'api/v1/companies/' + id_usuario;
    return this.http.get(url);
  }

  getPersonByCIOrEmail(data: string) {
    console.log(data);
    
    let url = environment.base_url + 'api/v1/persons/person/' + data;
    return this.http.get(url);
  }
}

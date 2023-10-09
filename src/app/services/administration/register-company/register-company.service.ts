import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class RegisterCompanyService {
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public postCreateCompany(datos: any) {
    const url = environment.base_url;
    return this.http.post(
      url + 'administration',
      JSON.stringify(datos),
      this.httpOptions
    );
  }

  public getIdLastPerson() {
    const url = environment.base_url;
    return this.http.get(url + 'administration');
  }
}

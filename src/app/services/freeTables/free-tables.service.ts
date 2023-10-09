import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class FreeTablesService {
  constructor(private http: HttpClient) {}
  public getAllTaxes() {
    const url = `${environment.base_url}api/v1/taxes`;
    return this.http.get(url);
  }
  public getAllDocuments() {
    const url = `${environment.base_url}api/v1/documents`;
    return this.http.get(url);
  }
  public getAllPayments() {
    const url = `${environment.base_url}api/v1/payments`;
    return this.http.get(url);
  }
}

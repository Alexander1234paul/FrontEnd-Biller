import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  constructor(private http: HttpClient) {}

  getAllSales(token: any) {
    const url = environment.base_url + 'api/v1/sales/' + token;
    return this.http.get(url);
  }

  getSaleByQuery(token: any, query: string) {
    const params = new HttpParams().set('token', token).set('query', query);
    const url = environment.base_url + 'api/v1/sales?' + params.toString();
    return this.http.get(url);
  }

  getSerieAndSequenceOfCompany(token: any) {
    const url = environment.base_url + 'api/v1/sales/serie-sequence/' + token;
    return this.http.get(url);
  }

  registerSale(token: any, form: any) {
    const url = environment.base_url + 'api/v1/sales/sale/' + token;
    return this.http.post(url, form);
  }

  deleteSale(token: any, id_venta: number) {
    const params = new HttpParams()
      .set('token', token)
      .set('id_venta', id_venta);
    const url = environment.base_url + 'api/v1/sales/sale?' + params.toString();
    return this.http.delete(url);
  }
}

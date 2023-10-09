import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  constructor(private http: HttpClient) {}
  public createShopping(body: any, token: any) {
    const url = `${environment.base_url}api/v1/shopping/` + token;
    console.log(url);
    return this.http.post(url, body);
  }
  public getAllShops(token: any) {
    const params = new HttpParams().set('token', token);
    const url = `${environment.base_url}api/v1/shopping?${params.toString()}`;
    return this.http.get(url);
  }
  public getAllShopsByIdShop(id_compra: any) {
    const params = new HttpParams().set('id_compra', id_compra);
    const url = `${environment.base_url}api/v1/shoppingI?${params.toString()}`;
    return this.http.get(url);
  }
}

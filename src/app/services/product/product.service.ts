import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  public createProduct(body: any) {
    const url = environment.base_url + `api/v1/product`;
    return this.http.post(url, body);
  }
  public getAllProducts() {
    const url =
      environment.base_url +
      `api/v1/products/` +
      localStorage.getItem(environment.token);
    console.log('products: ', url);
    return this.http.get(url);
  }
}

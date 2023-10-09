import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAllProducts(token: any) {
    const url = environment.base_url + 'api/v1/products/' + token;
    return this.http.get(url);
  }

  getAllCategories(token: any) {
    const url = environment.base_url + 'api/v1/categories/' + token;
    return this.http.get(url);
  }

  getAllUnitsMeasurement() {
    const url = environment.base_url + 'api/v1/products/units-measurement/';
    return this.http.get(url);
  }

  getConversionsByIdUnitMeasurement(id_unidad_medida: number) {
    const url =
      environment.base_url +
      'api/v1/products/units-measurement/' +
      id_unidad_medida;
    return this.http.get(url);
  }

  getProductById(id_producto: number) {
    const url =
      environment.base_url + 'api/v1/products/productU/' + id_producto;
    return this.http.get(url);
  }

  getProductByQuery(token: any, query: string) {
    const params = new HttpParams().set('token', token).set('query', query);
    const url = environment.base_url + 'api/v1/products/?' + params.toString();
    return this.http.get(url);
  }

  getProductByCode(token: any, code: string) {
    const params = new HttpParams().set('token', token).set('code', code);
    const url =
      environment.base_url + 'api/v1/products/product/?' + params.toString();
    return this.http.get(url);
  }

  registerProduct(token: any, body: any) {
    const url = environment.base_url + `api/v1/products/product/` + token;
    return this.http.post(url, body);
  }

  registerCategory(token: any, body: any) {
    const url = environment.base_url + `api/v1/categories/category/` + token;
    return this.http.post(url, body);
  }

  updateProduct(body: any) {
    const url = environment.base_url + 'api/v1/products/product';
    return this.http.put(url, body);
  }

  deleteProduct(id_producto: number) {
    const url = environment.base_url + 'api/v1/products/product/status/';
    const datos = { id_producto: id_producto };
    return this.http.put(url, JSON.stringify(datos), this.httpOptions);
  }
}

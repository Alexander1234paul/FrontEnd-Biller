import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root',
})
export class SuppliersService {
  constructor(private http: HttpClient) {}

  public createSupplier(body: any) {
    const url =
      environment.base_url +
      `api/v1/supplier/` +
      localStorage.getItem(environment.token);
    return this.http.post(url, body);
  }
  public getAllSuppliers(token: any) {
    const params = new HttpParams().set('token', token);

    const url = environment.base_url + `api/v1/suppliers?${params.toString()}`;
    console.log(url);
    return this.http.get(url);
  }
  deleteSupplier(id_proveedor: any) {
    // Construye los parámetros de la URL usando HttpParams
    const params = new HttpParams().set('id_proveedor', id_proveedor);

    // Combina los parámetros en la URL completa
    const url =
      environment.base_url + 'api/v1/supplier' + '?' + params.toString();
    console.log(url);

    return this.http.delete(url);
  }
  public getSupplierByQuery(token: any, searchQuery: any) {
    // Construye los parámetros de la URL usando HttpParams
    const params = new HttpParams()
      .set('token', token)
      .set('searchQuery', searchQuery);

    // Combina los parámetros en la URL completa
    const url =
      environment.base_url + 'api/v1/supplierQ/' + '?' + params.toString();

    return this.http.get(url);
  }
}

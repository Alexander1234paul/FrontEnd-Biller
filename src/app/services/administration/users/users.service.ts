import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // public postCreateCompany(datos: any) {
  //   const url = environment.base_url;
  //   return this.http.post(
  //     url + 'administration/users',
  //     JSON.stringify(datos),
  //     this.httpOptions
  //   );
  // }

  public getAllUsersByIdStore(id_almacen: any) {
    const url = environment.base_url;
    return this.http.get(url + 'administration/users/' + id_almacen);
  }
}

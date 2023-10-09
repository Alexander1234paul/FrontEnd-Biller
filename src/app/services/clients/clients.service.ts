import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(private http: HttpClient) {}

  public createClient(body: any, token: any) {
    const url = `${environment.base_url}api/v1/client/` + token;
    console.log(url);
    return this.http.post(url, body);
  }

  public updateClient(body: any) {
    const url = `${environment.base_url}api/v1/client`;
    return this.http.put(url, body);
  }

  public getAllClients(token: any) {
    const params = new HttpParams().set('token', token);
    const url = `${environment.base_url}api/v1/clients?${params.toString()}`;
    return this.http.get(url);
  }

  public getClientByQuery(token: any, searchQuery: any) {
    const params = new HttpParams()
      .set('token', token)
      .set('searchQuery', searchQuery);

    const url = `${environment.base_url}api/v1/clientQ?${params.toString()}`;
    return this.http.get(url);
  }

  deleteClient(id_cliente: any) {
    const params = new HttpParams().set('id_cliente', id_cliente);
    const url = `${environment.base_url}api/v1/client?${params.toString()}`;
    return this.http.delete(url);
  }

  public getClientById(id_persona: string) {
    const url = `${environment.base_url}api/v1/clientP/${id_persona}`;
    return this.http.get(url);
  }

  public verifyClient(ci_ruc: string, token: any) {
    const params = new HttpParams().set('ci_ruc', ci_ruc).set('token', token);
    const url = `${environment.base_url}api/v1/clientV?${params.toString()}`;
    return this.http.get(url);
  }
}

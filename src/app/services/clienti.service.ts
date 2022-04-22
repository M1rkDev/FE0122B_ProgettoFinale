import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientiService {
  baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

  recuperaClienti(numeroPagina:number = 0, pageSize:number = 20){
    return this.http.get<any>(`${this.baseUrl}/api/clienti?page=${numeroPagina}&size=${pageSize}&sort=id,ASC`);
  }


  rimuoviCliente(id: number){
    return this.http.delete(`${this.baseUrl}/api/clienti/${id}`)
  }

  aggiungiCliente(data: any){
    return this.http.post<Cliente>(`${this.baseUrl}/api/clienti`, data)
  }

  recuperaComune(){
    return this.http.get<any>(`${this.baseUrl}/api/comuni?page=0&size=20&sort=id,ASC`)
  }

  recuperaProvince(){
    return this.http.get<any>(`${this.baseUrl}/api/province?page=0&size=20&sort=id,ASC`)
  }

  tipoCliente(){
    return this.http.get<any>(`${this.baseUrl}/api/clienti/tipicliente`)
  }

  recuperaClienteById(id: number){
    return this.http.get<any>(`${this.baseUrl}/api/clienti/${id}`)
  }

  modificaCliente(data: any, id: number){
    return this.http.put<any>(`${this.baseUrl}/api/clienti/${id}`, data)
  }

  filtroRagioneSociale(nome:any, numeroPagina: number = 0){
    return this.http.get<any>(`${this.baseUrl}/api/clienti/ragionesociale?nome=${nome}&page=${numeroPagina}`)
  }

}

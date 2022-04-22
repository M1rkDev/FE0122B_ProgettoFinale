import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Fattura } from '../models/fattura';

@Injectable({
  providedIn: 'root'
})
export class FattureService {
  baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

  recuperaFatture(numeroPagina:number = 0, pageSize:number = 20){
    return this.http.get<any>(`${this.baseUrl}/api/fatture?page=${numeroPagina}&size=${pageSize}&sort=id,ASC`);
  }

  rimuoviFatture(id: number){
    return this.http.delete(`${this.baseUrl}/api/fatture/${id}`)
  }

  recuperaFattureCliente(id: number, numeroPagina:number = 0, pageSize:number = 20){
    return this.http.get<any>(`${this.baseUrl}/api/fatture/cliente/${id}?page=${numeroPagina}&size=${pageSize}&sort=id,ASC`)
  }

  recuperaFatturaById(id: number){
    return this.http.get<any>(`${this.baseUrl}/api/fatture/${id}`)
  }

  modificaFatture(data: any, id: number){
    return this.http.put<any>(`${this.baseUrl}/api/fatture/${id}`, data)
  }

  statoFattura(){
    return this.http.get<any>(`${this.baseUrl}/api/statifattura?page=0&size=20&sort=id,ASC`)
  }

  nuovaFattura(data: any){
    return this.http.post<any>(`${this.baseUrl}/api/fatture`,data)
  }

  filtroDataBetween(from: any, to: any, numeroPagina: number = 0){
    return this.http.get<any>(`${this.baseUrl}/api/fatture/data/?from=${from}&to=${to}&page=${numeroPagina}&size=20&sort=data,DESC`)
  }

  filtroStato(stato: any, numeroPagina: number = 0){
    return this.http.get<any>(`${this.baseUrl}/api/fatture/stato/${stato}?page=${numeroPagina}&size=20&sort=id,ASC`)
  }

  filtroImporto(from: any, to: any, numeroPagina: number = 0){
    return this.http.get<any>(`${this.baseUrl}/api/fatture/importo/?from=${from}&to=${to}&page=${numeroPagina}&size=20&sort=importo,ASC`)
  }

}

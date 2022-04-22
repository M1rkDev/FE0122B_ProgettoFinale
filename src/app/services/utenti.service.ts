import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Utente } from '../models/utente';

@Injectable({
  providedIn: 'root'
})
export class UtentiService {
  baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

  recuperaUtenti(p: number){
    return this.http.get<any>(`${this.baseUrl}/api/users?page=${p}`);
  }
}

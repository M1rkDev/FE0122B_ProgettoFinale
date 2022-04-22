import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface AuthData {
  accessToken: string,
  user: {
    id: number,
    username: string,
    email: string
  }
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  url =  environment.baseUrl;
  private authSubj = new BehaviorSubject<null | AuthData>(null);
  user$ = this.authSubj.asObservable();
  timeOut: any;

  constructor(private http: HttpClient, private router: Router) {
    this.ripristina();
   }

  login(data: {username: string, password: string}){
    return this.http.post<AuthData>(`${this.url}/api/auth/login`,data).pipe(tap((data) =>{
      console.log(data);
      this.authSubj.next(data);
      localStorage.setItem('user', JSON.stringify(data));
    }))
  }

  logout(){
    this.authSubj.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  registration(data: any){
    return this.http.post(`${this.url}/api/auth/signup`, data)
  }

  ripristina(){
    const user = localStorage.getItem('user');
    if (!user) {
      return;
    }
    const userData: AuthData = JSON.parse(user)

    this.authSubj.next(userData);

  }



}

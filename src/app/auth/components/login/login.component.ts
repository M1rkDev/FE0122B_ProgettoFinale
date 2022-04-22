import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errore = '';

  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async loggati(form: NgForm) {
    try{
      console.log(form.value);
      await this.authSrv.login(form.value).toPromise();
      form.reset();
      this.errore = ''
      this.router.navigate(['/']);
  }catch(error: any){
    console.log(error)
    this.errore = 'Password o Username incorretta';

  }
    }




}

import { Component, OnInit } from '@angular/core';
import { AuthData, AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  utenteLoggato!: any


  constructor(private authSrv: AuthService) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((user)=>{
      this.utenteLoggato = user;
      console.log(this.utenteLoggato.username)
    })

  }

  logout(){
    if(confirm('sei sicuro di voler uscire?')){
      this.authSrv.logout();
    }else{
      return
    }

  }

}

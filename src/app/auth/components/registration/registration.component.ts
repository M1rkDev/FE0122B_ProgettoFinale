import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form!: FormGroup
  utenteLoggato!: any
  user = {username: '', password: '', email: '', role: ['']}
  errore = ''
  constructor(private authSrv: AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((user)=>{
      this.utenteLoggato = user;
      console.log(this.utenteLoggato.username)
    })
    console.log(this.form)
    this.formInit()
  }


   async onsubmit(form: any) {
     try {
       this.user.username = form.value.username
      this.user.password = form.value.password
      this.user.email = form.value.email
      this.user.role.splice(0,1)
      this.user.role.push(form.value.role)
      console.log(this.user)
      console.log(this.form)
      this.errore = ''
     await this.authSrv.registration(this.user).toPromise();
      alert('Nuovo User registrato correttamente!');
      this.router.navigate(['/']);
     } catch (error: any) {
      console.log(error.error.message)
      if(error = 'Error: Username is already taken!'){
        this.errore = 'Username già esistente'
        form.reset()
      }if(error = 'Error: Email is already in use!'){
        this.errore = 'Email già esistente'
        form.reset()
      }else{
        this.errore = error.error.message
      }

     }

  }

  formInit(){
    this.form = this.fb.group({
      username: new FormControl(''),
      password: new FormControl(''),
      email: new FormControl(''),
      role: new FormControl()

    })
  }

  controlloErrori(nome: string, error: string) {
    return this.form.get(nome)?.errors![error];
  }

  controlliForm(nome:string){
    return this.form.get(nome) as AbstractControl;
  }



}

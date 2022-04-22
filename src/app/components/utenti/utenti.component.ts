import { Component, OnInit } from '@angular/core';
import { Utente } from 'src/app/models/utente';
import { UtentiService } from 'src/app/services/utenti.service';

@Component({
  selector: 'app-utenti',
  templateUrl: './utenti.component.html',
  styleUrls: ['./utenti.component.scss']
})
export class UtentiComponent implements OnInit {
  utenti: Utente[] | undefined;
  numeroPagina: number = 0
  maxPagina!: number
  pagination: any


  constructor(private utentiSrv: UtentiService) { }

  ngOnInit(): void {
    this.recuperaUtenti()
    console.log(this.maxPagina)
  }

  /*PAGINATION*/

  public get pageNumberText(){
    return this.numeroPagina + 1;
  }

  public get pageMaxText(){
    return this.maxPagina
  }

  paginaPrecedente(){
    if(this.numeroPagina > 0){
      this.numeroPagina--;
      this.recuperaUtenti()
    }
  }

  paginaSuccessiva(){
    if((this.maxPagina - 2) >= this.numeroPagina){
      this.numeroPagina++;
      this.recuperaUtenti()
    }

  }

  /*FINE PAGINATION*/


  recuperaUtenti(){
    this.utentiSrv.recuperaUtenti(this.numeroPagina).subscribe((u) =>{
      this.maxPagina = u.totalPages
      this.utenti = u.content
      this.pagination = u
      console.log(this.maxPagina)
    })
  }

}

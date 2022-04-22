import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ClientiService } from 'src/app/services/clienti.service';

@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.scss'],
})
export class ClientiComponent implements OnInit {
  clienti: Cliente[] | undefined;
  numeroPagina: number = 0;
  maxPagina!: number;
  boxValue = '';
  variabileBooleana = false
  pagination: any

  constructor(private clientiSrv: ClientiService) {}

  ngOnInit(): void {
    this.recuperaClienti();
  }

  /*PAGINATION*/

  public get pageNumberText() {
    return this.numeroPagina + 1;
  }

  public get pageMaxText(){
    return this.maxPagina
  }

  paginaPrecedente() {
    if (this.numeroPagina > 0) {
      this.numeroPagina--;
      if(this.variabileBooleana == false){
        this.recuperaClienti();
      }else{
        this.filtra(this.boxValue)
      }

    }
  }

  paginaSuccessiva() {
    if (this.maxPagina - 2 >= this.numeroPagina) {
      this.numeroPagina++;
      if(this.variabileBooleana == false){
        this.recuperaClienti();
      }else{
        this.filtra(this.boxValue)
      }

    }
  }

  /*FINE PAGINATION*/

  recuperaClienti() {
    this.clientiSrv.recuperaClienti(this.numeroPagina).subscribe((c) => {
      this.maxPagina = c.totalPages;
      this.clienti = c.content;
      this.pagination = c
      console.log(this.maxPagina);
    });
  }

  elimina(id: number) {
    if (confirm('Sei sicuro di voler elimare il cliente?')) {
      this.clientiSrv.rimuoviCliente(id).subscribe(() => {
        this.recuperaClienti();
      });
    } else {
      return;
    }
  }

  getValue(val: string) {
    this.boxValue = val;
    this.numeroPagina = 0
    this.filtra(this.boxValue);
  }

  getKeyUp(val: string){
    if(!val){
      this.variabileBooleana = false
      this.numeroPagina = 0
      this.recuperaClienti()
    }
  }


  filtra(nome: any) {
    this.clientiSrv.filtroRagioneSociale(nome,this.numeroPagina).subscribe((response) => {
      this.clienti = response.content;
      this.maxPagina = response.totalPages
      this.pagination = response

      console.log(this.maxPagina)
      this.variabileBooleana = true
    });
  }
}

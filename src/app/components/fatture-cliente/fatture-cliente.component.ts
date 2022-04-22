import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Fattura } from 'src/app/models/fattura';
import { FattureService } from 'src/app/services/fatture.service';

@Component({
  selector: 'app-fatture-cliente',
  templateUrl: './fatture-cliente.component.html',
  styleUrls: ['./fatture-cliente.component.scss']
})
export class FattureClienteComponent implements OnInit {
  mieFatture: Fattura[] | undefined
  numeroPagina: number = 0;
  idCliente!: number
  maxPagina!: number
  pagination: any

  constructor(private router: ActivatedRoute, private fattureSrv: FattureService) { }

  ngOnInit(): void {
    this.router.params.subscribe(params=>{
      const idClient = +params['id'];
      console.log(idClient)
      this.idCliente = idClient
    })
    this.recuperaFatture()
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
      this.recuperaFatture()
    }
  }

  paginaSuccessiva(){
    if((this.maxPagina - 1) > this.numeroPagina){
      this.numeroPagina++;
      this.recuperaFatture()
    }
  }

  /*FINE PAGINATION*/

  recuperaFatture(){
    this.router.params.subscribe(async(params)=>{
      const id = +params['id'];
      this.fattureSrv.recuperaFattureCliente(id,this.numeroPagina).subscribe(fatture =>{
        this.mieFatture = fatture.content
        this.maxPagina = fatture.totalPages
        this.pagination = fatture
      })
    })
  }

  rimuoviFatture(id: number){
    if(confirm('sei sicuro di voler elimare la fattura ?')){
      this.fattureSrv.rimuoviFatture(id).subscribe(()=>{
            this.recuperaFatture()
          })
    }else{
      return
    }

  }

}

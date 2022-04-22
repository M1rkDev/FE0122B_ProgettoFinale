import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Fattura } from 'src/app/models/fattura';
import { FattureService } from 'src/app/services/fatture.service';

@Component({
  selector: 'app-fatture',
  templateUrl: './fatture.component.html',
  styleUrls: ['./fatture.component.scss']
})
export class FattureComponent implements OnInit {
  fatture: Fattura[] | undefined
  numeroPagina: number = 0;
  maxPagina!: number
  dataValueFrom = ''
  dataValueTo = ''
  variabileBooleana = 0
  statoValue : any
  euroValueFrom = ''
  euroValueTo = ''
  pagination: any

  constructor(private  fattureSrv: FattureService) { }

  ngOnInit(): void {
    this.recuperaFatture()
  }

  showDiv = {
    previous : false,
    current : false,
    next : false
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
      if(this.variabileBooleana == 0){
        this.recuperaFatture()
      }if(this.variabileBooleana == 1){
        this.filtra(this.dataValueFrom, this.dataValueTo)
      }if(this.variabileBooleana == 2){
        this.filtraPerStato(this.statoValue)
      }if(this.variabileBooleana == 3){
        this.filtroImporto(this.euroValueFrom, this.euroValueTo)
      }
    }
  }

  paginaSuccessiva(){
    if((this.maxPagina - 1) > this.numeroPagina){
      this.numeroPagina++;
      if(this.variabileBooleana == 0){
        this.recuperaFatture()
      }if(this.variabileBooleana == 1){
        this.filtra(this.dataValueFrom, this.dataValueTo)
      }if(this.variabileBooleana == 2){
        this.filtraPerStato(this.statoValue)
      }if(this.variabileBooleana == 3){
        this.filtroImporto(this.euroValueFrom, this.euroValueTo)
      }
    }
  }

  /*FINE PAGINATION*/


  recuperaFatture(){
    this.fattureSrv.recuperaFatture(this.numeroPagina).subscribe((f)=>{
      this.maxPagina = f.totalPages
      this.fatture = f.content
      this.pagination = f
      console.log(this.maxPagina)
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

  /*Filtro data*/

  getValue(valUno: string, valDue: string){
    this.dataValueFrom = valUno;
    this.dataValueTo = valDue
    console.log(this.dataValueFrom)
    console.log(this.dataValueTo)
    this.numeroPagina = 0
    this.variabileBooleana = 1
    this.filtra(this.dataValueFrom, this.dataValueTo)
  }

  filtra(dataUno: any, dataDue: any){
    this.fattureSrv.filtroDataBetween(dataUno,dataDue,this.numeroPagina).subscribe((response)=>{
      this.fatture = response.content
      this.maxPagina = response.totalPages
      this.pagination = response
      console.log(this.maxPagina)
      this.variabileBooleana = 1

    })
  }

  reset(){
    this.numeroPagina = 0
    this.variabileBooleana = 0
    this.showDiv = {
      previous : false,
      current : false,
      next : false
    }
    this.recuperaFatture()

  }

  /*Fine Filtro data*/

  /*Filtro Stato*/

  getValueStato(val:any){
    this.statoValue = val
    console.log(this.statoValue)
    this.numeroPagina = 0
    this.variabileBooleana = 2
    this.filtraPerStato(this.statoValue)

  }

  filtraPerStato(stato: any){
    this.fattureSrv.filtroStato(stato, this.numeroPagina).subscribe((response)=>{
      this.fatture = response.content
      this.maxPagina = response.totalPages
      this.pagination = response
      console.log(this.maxPagina)
      this.variabileBooleana = 2
    })
  }

    /*Fine Filtro Stato*/


    /*Filtro Importo*/

    getValueImporto(euroUno: string, euroDue: string){
      this.euroValueFrom = euroUno;
      this.euroValueTo = euroDue
      console.log(this.euroValueFrom)
      console.log(this.euroValueTo)
       this.numeroPagina = 0
      this.variabileBooleana = 3
      this.filtroImporto(this.euroValueFrom, this.euroValueTo)

    }

  filtroImporto(euroUno: any, euroDue: any){
    this.fattureSrv.filtroImporto(euroUno,euroDue, this.numeroPagina).subscribe((response)=>{
      this.fatture = response.content
      this.maxPagina = response.totalPages
      this.pagination = response
      console.log(this.maxPagina)
      this.variabileBooleana = 3
    })
  }

  /*Fine Filtro Importo*/
}

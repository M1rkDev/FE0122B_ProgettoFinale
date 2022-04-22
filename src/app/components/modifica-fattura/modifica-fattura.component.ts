import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Fattura } from 'src/app/models/fattura';
import { FattureService } from 'src/app/services/fatture.service';

@Component({
  selector: 'app-modifica-fattura',
  templateUrl: './modifica-fattura.component.html',
  styleUrls: ['./modifica-fattura.component.scss']
})
export class ModificaFatturaComponent implements OnInit {
  fattura!:Fattura
  tipi!:any[]
  form!: FormGroup

  fattModificata: any = {id: 0, data: '', numero: 0, anno: 0, importo: 0, stato:{id:0},cliente: {id:0}}

  constructor(private router:ActivatedRoute, private fattureSrv: FattureService, private fb: FormBuilder, private rotta: Router) { }

  ngOnInit(): void {
    this.router.params.subscribe(params =>{
      const id = +params['id'];
      this.fattureSrv.recuperaFatturaById(id).subscribe(f =>{
        this.fattura = f
      })
    })

    this.stato()
    this.formInit()

  }

  formInit(){
    this.form = this.fb.group({
      id: new FormControl(''),
      data: new FormControl(''),
      numero: new FormControl(),
      anno: new FormControl(''),
      importo: new FormControl(''),
      stato: new FormControl(),
      cliente: new FormControl(),
      idCliente: new FormControl('')
    })
  }

  stato(){
     this.fattureSrv.statoFattura().subscribe(s =>{
       this.tipi = s.content
     })
  }

  onsubmit(form: any) {
    this.fattModificata.id = form.value.id
    this.fattModificata.data = form.value.data
    this.fattModificata.numero = form.value.numero
    this.fattModificata.anno = form.value.anno
    this.fattModificata.importo = form.value.importo
    this.fattModificata.stato.id = Number(form.value.stato)
    this.fattModificata.cliente.id = form.value.idCliente
    console.log(this.fattModificata)
    console.log(this.form)
    this.fattureSrv.modificaFatture(this.fattModificata,this.fattura.id).subscribe((f)=>{
      alert('Fattura Modificata!')
      this.rotta.navigate(['/fatture'])
    })
  }
}

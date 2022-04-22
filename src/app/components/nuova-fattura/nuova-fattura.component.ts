import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClientiService } from 'src/app/services/clienti.service';
import { FattureService } from 'src/app/services/fatture.service';

@Component({
  selector: 'app-nuova-fattura',
  templateUrl: './nuova-fattura.component.html',
  styleUrls: ['./nuova-fattura.component.scss']
})
export class NuovaFatturaComponent implements OnInit {
  tipi!:any[]
  form!: FormGroup
  cliente!: Cliente

  fattNuova: any = {data: '', numero: 0, anno: 0, importo: 0, stato:{id:0},cliente: {id:0}}

  constructor(private router:ActivatedRoute, private fattureSrv: FattureService, private fb: FormBuilder, private clientiSrv: ClientiService) { }

  ngOnInit(): void {
    this.router.params.subscribe(params =>{
      const id = +params['id'];
      console.log(id)
      this.clientiSrv.recuperaClienteById(id).subscribe(c =>{
        console.log(c)
        this.cliente = c
      })
    })

    this.stato()
    this.formInit()
  }

  formInit(){
    this.form = this.fb.group({
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
  this.fattNuova.id = form.value.id
  this.fattNuova.data = form.value.data
  this.fattNuova.numero = form.value.numero
  this.fattNuova.anno = form.value.anno
  this.fattNuova.importo = form.value.importo
  this.fattNuova.stato.id = Number(form.value.stato)
  this.fattNuova.cliente.id = form.value.idCliente
  console.log(this.fattNuova)
  console.log(this.form)
  this.fattureSrv.nuovaFattura(this.fattNuova).subscribe((f)=>{
    alert('Nuova fattura creata!')
    this.form.patchValue({
      data: '',
      numero: '',
      anno: '',
      importo: '',
      stato: ''
    })
  })
}


}

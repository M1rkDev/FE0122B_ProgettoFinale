import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Comuni } from 'src/app/models/comuni';
import { Province } from 'src/app/models/province';
import { ClientiService } from 'src/app/services/clienti.service';

@Component({
  selector: 'app-nuovo-cliente',
  templateUrl: './nuovo-cliente.component.html',
  styleUrls: ['./nuovo-cliente.component.scss']
})
export class NuovoClienteComponent implements OnInit {
  form!: FormGroup
  comuni!: Comuni[]
  province!: Province[]
  tipi!:any[]

  cliente: any = {ragioneSociale: '', partitaIva: '', email: '',pec:'',nomeContatto:'',cognomeContatto:'', tipoCliente: '', emailContatto: '', indirizzoSedeOperativa:{via:'', civico:'', cap: '',comune:{provincia:''}}}

  constructor(private clientiSrv: ClientiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formInit()
    this.recuperaComune()
    this.recuperaProvincia()
    this.tipoCliente()
  }

  onsubmit(form: any) {
    this.cliente.ragioneSociale = form.value.ragioneSociale
    this.cliente.partitaIva = form.value.partitaIva
    this.cliente.email = form.value.email
    this.cliente.pec = form.value.pec
    this.cliente.nomeContatto = form.value.nomeContatto
    this.cliente.cognomeContatto = form.value.cognomeContatto
    this.cliente.tipoCliente = form.value.tipoCliente
    this.cliente.emailContatto = form.value.emailContatto
    this.cliente.indirizzoSedeOperativa.via = form.value.via
    this.cliente.indirizzoSedeOperativa.civico = form.value.civico
    this.cliente.indirizzoSedeOperativa.cap = form.value.cap
    this.cliente.indirizzoSedeOperativa.comune = this.comuni.find((c)=>c.id?.toString() === form.value.comune)
    this.cliente.indirizzoSedeOperativa.comune.provincia = this.province.find((p)=>p.id?.toString() === form.value.provincia)
     this.clientiSrv.aggiungiCliente(this.cliente).subscribe(()=>{
       alert('Nuovo cliente registrato correttamente!');
       this.form.reset()
     });

}


  formInit(){
    this.form = this.fb.group({
      ragioneSociale: new FormControl(''),
      partitaIva: new FormControl(''),
      email: new FormControl(''),
      pec: new FormControl(''),
      nomeContatto: new FormControl(''),
      cognomeContatto: new FormControl(''),
      tipoCliente: new FormControl(''),
      emailContatto: new FormControl(''),
      via: new FormControl(''),
      civico: new FormControl(''),
      cap: new FormControl(''),
      comune: new FormControl(),
      provincia: new FormControl('')
    })
  }

  recuperaComune(){
    this.clientiSrv.recuperaComune().subscribe(c =>{
      console.log(c.content)
      console.log(c.content[0].provincia.id)
      this.comuni = c.content
    })
  }

  recuperaProvincia(){
    this.clientiSrv.recuperaProvince().subscribe(p =>{
      console.log(p.content)
      console.log(p.content[0].id)
      this.province = p.content
    })
  }

  tipoCliente(){
    this.clientiSrv.tipoCliente().subscribe(t =>{
      this.tipi = t
    })
  }
}

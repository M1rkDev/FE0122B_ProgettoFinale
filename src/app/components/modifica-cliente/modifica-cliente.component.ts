import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { Comuni } from 'src/app/models/comuni';
import { Province } from 'src/app/models/province';
import { ClientiService } from 'src/app/services/clienti.service';

@Component({
  selector: 'app-modifica-cliente',
  templateUrl: './modifica-cliente.component.html',
  styleUrls: ['./modifica-cliente.component.scss']
})
export class ModificaClienteComponent implements OnInit {
  cliente!: Cliente
  comuni!: Comuni[]
  province!: Province[]
  tipi!:any[]
  form!: FormGroup

  clienteModificato: any = {ragioneSociale: '', partitaIva: '', email: '',pec:'',nomeContatto:'',cognomeContatto:'', tipoCliente: '', emailContatto: '', indirizzoSedeOperativa:{via:'', civico:'', cap: '',comune:{id:0, provincia:{id:0}}}}

  constructor(private router: ActivatedRoute, private clientiSrv: ClientiService, private fb: FormBuilder, private rotta: Router) { }

  ngOnInit(): void {
    this.router.params.subscribe(params =>{
      const id = +params['id'];
      this.clientiSrv.recuperaClienteById(id).subscribe(c =>{
        this.cliente = c
      })
    })
    this.recuperaComune()
    this.recuperaProvincia()
    this.tipoCliente()
    this.formInit()
  }

  recuperaComune(){
    this.clientiSrv.recuperaComune().subscribe(c =>{
      this.comuni = c.content
    })
  }

  recuperaProvincia(){
    this.clientiSrv.recuperaProvince().subscribe(p =>{
      console.log(p)
      this.province = p.content
    })
  }

  tipoCliente(){
    this.clientiSrv.tipoCliente().subscribe(t =>{
      this.tipi = t
    })
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
      provincia: new FormControl()
    })
  }

  onsubmit(form: any) {
    this.clienteModificato.ragioneSociale = form.value.ragioneSociale
    this.clienteModificato.partitaIva = form.value.partitaIva
    this.clienteModificato.email = form.value.email
    this.clienteModificato.pec = form.value.pec
    this.clienteModificato.nomeContatto = form.value.nomeContatto
    this.clienteModificato.cognomeContatto = form.value.cognomeContatto
    this.clienteModificato.tipoCliente = form.value.tipoCliente
    this.clienteModificato.emailContatto = form.value.emailContatto
    this.clienteModificato.indirizzoSedeOperativa.via = form.value.via
    this.clienteModificato.indirizzoSedeOperativa.civico = form.value.civico
    this.clienteModificato.indirizzoSedeOperativa.cap = form.value.cap
    this.clienteModificato.indirizzoSedeOperativa.comune.id= form.value.comune
    this.clienteModificato.indirizzoSedeOperativa.comune.provincia.id= form.value.provincia
    console.log(form)
    console.log(this.clienteModificato)
     this.clientiSrv.modificaCliente(this.clienteModificato,this.cliente.id).subscribe((c)=>{
        alert('Cliente modificato con successo!');
      this.rotta.navigate(['/clienti'])
    })

  }

}

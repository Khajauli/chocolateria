import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente';
import { CargarService } from 'src/app/services/cargar.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.css'],
  providers: [ClienteService, CargarService]
})
export class NuevoClienteComponent implements OnInit{
  public cliente:Cliente;
  public clienteGuardar:Cliente;
  public url:string;
  public status:string;
  public idGuardado:string;

  constructor(
    private _clienteService:ClienteService
  ){
    this.url=Global.url;
    this.cliente= new Cliente('','','',false,'','','');
    this.clienteGuardar= new Cliente('','','',false,'','','');
    this.status="";
    this.idGuardado="";
    
  }

  ngOnInit(): void {
  }
  guardarCliente(form:NgForm) {
    this._clienteService.guardarCliente(this.cliente).subscribe(
      response => {
        if(response.cliente) {
          this.status = 'success';
          this.idGuardado = response.id;
          this.clienteGuardar = response.cliente;
          form.reset();
        } else {
          console.log("medio");
          this.status = 'failed';
        }
      },
      error => {
        console.log("fuera de todo");
        console.log(<any>error);
        this.status = 'failed';
      }
    );
  }
}

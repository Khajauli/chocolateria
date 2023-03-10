import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-login-clientes',
  templateUrl: './login-clientes.component.html',
  styleUrls: ['./login-clientes.component.css'],
  providers:[ClienteService]
})
export class LoginClientesComponent implements OnInit{
  public url:string;
  public usuario:string;
  public contrasenia:string;
  public idGuardado:string;
  public cliente:Cliente;
  public clienteGuardado:Cliente;
  public status:string;

  constructor(
    private _clienteService:ClienteService,
    private _router:Router,

  ){
    this.url=Global.url;
    this.usuario="";
    this.idGuardado="";
    this.contrasenia="";
    this.cliente=new Cliente('','','');
    this.clienteGuardado=new Cliente('','','');
    this.status="";
  }
  ngOnInit(): void {
    
  }

  guardarCliente(form: NgForm) {
    this._clienteService.guardarCliente(this.cliente).subscribe(
      response => {
        this.cliente=response.cliente;
        this._router.navigate(['/home',this.cliente._id]);

      },
      error => {
        this.status='failed';
        console.log(error);

      }
    );
  }
}

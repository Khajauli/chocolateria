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

  constructor(
    private _clienteService:ClienteService,
    private _router:Router,

  ){
    this.url=Global.url;
    this.usuario="";
    this.idGuardado="";
    this.contrasenia="";
    this.cliente=new Cliente('','','',false,'','','');
  }
  ngOnInit(): void {
    
  }

  loginCliente(form: NgForm) {
    this._clienteService.login(this.usuario, this.contrasenia).subscribe(
      response => {
        this.cliente=response.cliente;
        this._router.navigate(['/home',this.cliente._id]);

      },
      error => {
        console.log(error);

      }
    );
  }
}

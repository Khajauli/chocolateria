import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Administrador } from 'src/app/models/administrador';
import { AdministradorService } from 'src/app/services/administrador.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-login-administradores',
  templateUrl: './login-administradores.component.html',
  styleUrls: ['./login-administradores.component.css'],
  providers:[AdministradorService]
})
export class LoginAdministradoresComponent implements OnInit{
  public url:string;
  public usuario:string;
  public contrasenia:string;
  public idGuardado:string;
  public admin:Administrador;

  constructor(
    private _adminService:AdministradorService,
    private _router:Router,

  ){
    this.url=Global.url;
    this.usuario="";
    this.idGuardado="";
    this.contrasenia="";
    this.admin=new Administrador('','','','','','');
  }
  ngOnInit(): void {
    
  }

  loginAdmin(form: NgForm) {
    this._adminService.login(this.usuario, this.contrasenia).subscribe(
      response => {
        this.admin=response.administrador;
        this._router.navigate(['/home',this.admin._id]);

      },
      error => {
        console.log(error);

      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Administrador } from 'src/app/models/administrador';
import { AdministradorService } from 'src/app/services/administrador.service';
import { CargarService } from 'src/app/services/cargar.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-nuevo-administrador',
  templateUrl: './nuevo-administrador.component.html',
  styleUrls: ['./nuevo-administrador.component.css'],
  providers: [AdministradorService, CargarService]
})
export class NuevoAdministradorComponent implements OnInit{
  public administrador:Administrador;
  public administradorGuardar:Administrador;
  public url:string;
  public status:string;
  public idGuardado:string;
  
  constructor(
    private _administradorService:AdministradorService
  ){
    this.url=Global.url;
    this.administrador= new Administrador('','','','','','');
    this.administradorGuardar= new Administrador('','','','','','');
    this.status="";
    this.idGuardado="";
    
  }

  ngOnInit(): void {
  }
  guardarAdministrador(form:NgForm) {
    this._administradorService.guardarAdmin(this.administrador).subscribe(
      response => {
        if(response.administrador) {
          this.status = 'success';
          this.idGuardado = response.id;
          this.administradorGuardar = response.administrador;
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

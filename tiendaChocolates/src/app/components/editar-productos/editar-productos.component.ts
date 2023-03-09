import { Component, OnInit } from '@angular/core';
import { Chocolate } from '../../models/chocolate';
import { ChocolateService } from '../../services/chocolate.service';
import { Global } from '../../services/global';
import { CargarService } from '../../services/cargar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editar-productos',
  templateUrl: '../nuevo-chocolate/nuevo-chocolate.component.html',
  styleUrls: ['./editar-productos.component.css'],
  providers : [ChocolateService, CargarService]
})
export class EditarProductosComponent implements OnInit {
public titulo : string;
public chocolate : Chocolate;
public chocolateSaved : Chocolate;
public url : string;
public archivoSaved : Array <File>;
public status : string;
public idSaved : string;

constructor(
  private _chocolateService : ChocolateService,
  private _cargarService : CargarService,
  private _router:Router,
  private _route:ActivatedRoute
){
  this.titulo="Editar Chocolate";
  this.url = Global.url;
  this.chocolate = new Chocolate("","","",0,"","","",0,0,"");
  this.chocolateSaved = new Chocolate("","","",0,"","","",0,0,"");
  this.archivoSaved = [];
  this.status = '';
  this.idSaved = '';
}
ngOnInit(): void {
    this._route.params.subscribe(params=>{
      let id=params['id'];
      console.log("estoy en el init editar")
      this.getChocolate(id);
    })
}
getChocolate( id:String ){
  console.log("getChocolate");
  this._chocolateService.getChocolate(id).subscribe(
    response => {
      this.chocolate = response.chocolateG;
      console.log(response);
    },
    error=>{
      console.log(<any>error);
    }
  )
}
guardarChocolate(form : NgForm){
  this._chocolateService.updateChocolate(this.chocolate).subscribe(
    response => {
      if(this.archivoSaved){
        this._cargarService.peticionRequest(Global.url+"subir-imagen/"+this.chocolate._id,[], this.archivoSaved, 'imagen')
        .then((result:any)=>{
          this.chocolateSaved = result.response.chocolateU;
          this.status = 'success';
          this.idSaved = response.response.chocolateU._id;
          console.log(result.response.chocolateU);
          form.reset();
        });
      }else{
        this.chocolateSaved= response.chocolateU
        this.status='success';
        console.log("medio");
        
      }
    }
  );
}
imagenChangeEvent(archivoSeleccionado: any){
  this.archivoSaved = <Array<File>> archivoSeleccionado.target.files;
}
}

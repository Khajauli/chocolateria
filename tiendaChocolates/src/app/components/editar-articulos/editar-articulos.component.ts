import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { CargarService } from '../../services/cargar.service';
import { Articulo } from '../../models/articulo';
import { ArticuloService } from '../../services/articulo.service';
import { Global } from 'src/app/services/global';
@Component({
  selector: 'app-editar-articulos',
  templateUrl: '../nuevo-articulo/nuevo-articulo.component.html',
  styleUrls: ['./editar-articulos.component.css'], 
  providers : [ArticuloService, CargarService]
})
export class EditarArticulosComponent implements OnInit{
public titulo : string;
public articulo : Articulo;
public articuloSaved : Articulo;
public url : string;
public archivoSaved : Array <File>;
public status : string;
public idSaved : string;
constructor (
  private _articuloService : ArticuloService,
  private _cargarService : CargarService,
  private _route : ActivatedRoute
){
  this.titulo = "Editar Articulos";
  this.url = Global.url;
  this.articulo = new Articulo ("",0,"","","","");
  this.articuloSaved = new Articulo ("",0,"","","","");
  this.archivoSaved = [];
  this.status = '';
  this.idSaved = '';
}
ngOnInit(): void {
  this._route.params.subscribe(params=>{
    let id=params['id'];
    console.log("estoy en el init editar")
    this.getArticulo(id);
  })
}
getArticulo( id: string){
  this._articuloService.getArticulo(id).subscribe(
    response=>{
      this.articulo = response.articulo;
      console.log(response);
    },
    error=>{
      console.log(<any>error);
    }
  )
}
guardarArticulo( form : NgForm){
  this._articuloService.updateArticulo(this.articulo).subscribe(
    response=>{
      if(this.archivoSaved){
        this._cargarService.peticionRequest(Global.url+"subir-imagen/"+this.articulo._id,[],this.archivoSaved, 'imagen')
        .then((result:any)=>{
          this.articuloSaved = result.response.articulo;
          this.status = 'success';
          this.idSaved = response.response.articulo._id;
          form.reset();
        })
      }else{
        this.status = 'success';
        console.log(this.archivoSaved);
      }
    }
  )
}
imagenChangeEvent(archivoSaved : any){
  this.archivoSaved = <Array<File>> archivoSaved.target.files;
}

}

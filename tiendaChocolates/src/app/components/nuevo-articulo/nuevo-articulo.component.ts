import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Articulo } from 'src/app/models/articulo';
import { ArticuloService } from 'src/app/services/articulo.service';
import { CargarService } from 'src/app/services/cargar.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-nuevo-articulo',
  templateUrl: './nuevo-articulo.component.html',
  styleUrls: ['./nuevo-articulo.component.css'],
  providers: [ArticuloService, CargarService]
})
export class NuevoArticuloComponent implements OnInit{
  public articulo:Articulo;
  public articuloGuardar:Articulo;
  public url:string;
  public status:string;
  public idGuardado:string;
  public archivosParaCargar:Array<File>;
  public titulo : string;
  @ViewChild('archivoImagen') fileInput:any;

  constructor(
    private _articuloService:ArticuloService,
    private _cargarService:CargarService
  ){
    this.url=Global.url;
    this.articulo= new Articulo('',0,'','','','');
    this.articuloGuardar= new Articulo('',0,'','','','');
    this.status="";
    this.idGuardado="";
    this.archivosParaCargar=[];
    this.titulo="GUARDAR ARTICULO";
  }

  ngOnInit(): void {
  }
  guardarArticulo(form:NgForm) {
    this._articuloService.guardarArticulo(this.articulo).subscribe(
      response => {
        if(response.articulo) {
          if(this.archivosParaCargar){
            this._cargarService.peticionRequest(Global.url+"subirImagen/"+response.articulo._id,[],this.archivosParaCargar,'imagen')
            .then((result:any)=>{
              this.status = 'success';
              this.idGuardado = result.response._id;
              this.articuloGuardar = result.response;
              form.reset();
              this.fileInput.nativeElement.value='';
            });
          }else{
            this.status='failed';
          }
          
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
  imagenChangeEvent(archivoSeleccionado:any){
    this.archivosParaCargar=<Array<File>>archivoSeleccionado.target.files;
  }
}

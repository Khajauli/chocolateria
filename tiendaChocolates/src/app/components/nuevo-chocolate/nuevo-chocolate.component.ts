import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Chocolate } from 'src/app/models/chocolate';
import { CargarService } from 'src/app/services/cargar.service';
import { ChocolateService } from 'src/app/services/chocolate.service';
import { Global } from 'src/app/services/global';



@Component({
  selector: 'app-nuevo-chocolate',
  templateUrl: './nuevo-chocolate.component.html',
  styleUrls: ['./nuevo-chocolate.component.css'],
  providers: [ChocolateService,CargarService]
})
export class NuevoChocolateComponent implements OnInit{
  public titulo:string;
  public chocolate:Chocolate;
  public chocolateGuardar:Chocolate;
  public url:string;
  public status:string;
  public idGuardado:string;
  public archivosParaCargar:Array<File>;
  @ViewChild('archivoImagen') fileInput:any;


  constructor(
    private _chocolateService:ChocolateService,
    private _cargarService:CargarService
  ){
    this.url=Global.url;
    this.chocolate= new Chocolate('','','',0,'Activo','','',0,0,'');
    this.chocolateGuardar= new Chocolate('','','',0,'','Activo','',0,0,'');
    this.status="";
    this.idGuardado="";
    this.archivosParaCargar=[];
    this.titulo="";
  }

  ngOnInit(): void {
    this.titulo = "Nuevo Chocolate";
  }

  guardarChocolate(form:NgForm){
    this._chocolateService.guardarChocolate(this.chocolate).subscribe(
      response=>{
        if(response.chocolate){
          if(this.archivosParaCargar){
            this._cargarService.peticionRequest(Global.url+"subir-imagen/"+response.chocolate._id,[],this.archivosParaCargar,'imagen')
            .then((result:any)=>{
              this.chocolateGuardar=result.response;
              this.idGuardado = result.response._id;
              this.status = 'success';
              form.reset();
              this.fileInput.nativeElement.value='';
            });
          }else{
            this.status='failed';
          }
          
        }else{
          console.log("medio");
          this.status = 'failed';
        }
      },
      error => {
        console.log("fuera de todo");
        console.log(<any>error);
        this.status = 'failed';
      }
    )
  }
  imagenChangeEvent(archivoSeleccionado:any){
    this.archivosParaCargar=<Array<File>>archivoSeleccionado.target.files;
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Comentario } from 'src/app/models/comentario';
import { ComentarioService } from 'src/app/services/comentario.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-nuevo-comentario',
  templateUrl: './nuevo-comentario.component.html',
  styleUrls: ['./nuevo-comentario.component.css'],
  providers: [ComentarioService]
})
export class NuevoComentarioComponent implements OnInit{
  public comentario:Comentario;
  public comentarioGuardar:Comentario;
  public url:string;
  public status:string;
  public idGuardado:string;

  constructor(
    private _comentarioService:ComentarioService
  ){
    this.url=Global.url;
    this.comentario= new Comentario('','','','','',false,0);
    this.comentarioGuardar= new Comentario('','','','','',false,0);
    this.status="";
    this.idGuardado="";
    
  }

  ngOnInit(): void {
  }
  guardarComentario(form:NgForm) {
    this._comentarioService.guardarComentario(this.comentario).subscribe(
      response => {
        if(response.comentario) {
          this.status = 'success';
          this.idGuardado = response.id;
          this.comentarioGuardar = response.comentario;
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

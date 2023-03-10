import { Component, OnInit } from '@angular/core';
import { Chocolate } from '../../models/chocolate';
import { ChocolateService } from '../../services/chocolate.service';
import { Global } from '../../services/global';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Comentario } from '../../models/comentario';
import { ComentarioService } from '../../services/comentario.service';

@Component({
  selector: 'app-detalleproducto',
  templateUrl: './detalleproducto.component.html',
  styleUrls: ['./detalleproducto.component.css'], 
  providers : [ChocolateService, ComentarioService]
})
export class DetalleproductoComponent implements OnInit {
  public url : string;
  public chocolate : Chocolate;
  public confirm : boolean;
  public comentario : Comentario;
  public producto : Chocolate;
  public comentarios : Comentario [];
  public cod : string;
  public status:string;
  
  constructor(
    private _chocolateService : ChocolateService,
    private _router : Router,
    private _route : ActivatedRoute,
    private _comentarioService : ComentarioService,
  ){
    this.url = Global.url;
    this.chocolate = new Chocolate ("","","",0,"","","",0,0,"");
    this.confirm = false;
    this.comentario = new Comentario ("","","","","",true,0);
    this.producto = new Chocolate ("","","",0,"","","",0,0,"");
    this.comentarios = [];
    this.cod = "";
    this.status="";
  }
  ngOnInit(): void {
      this._route.params.subscribe(params=>{
        let id = params['id'];
        this.getProducto(id);
         this.getComentarios();
        //this.getComentariosP();
      })
  }
  getProducto(id : String){
    this._chocolateService.getChocolate(id).subscribe(
      response => {
        console.log(response.chocolateG);
        this.chocolate = response.chocolateG;
        this.cod = this.chocolate.codigo;
      },
      error => {
        console.log(<any> error);
      }
    )
  }
  setConfirm(confirm : boolean){
    this.confirm = confirm;
  }
  guardarComentario( form: NgForm){
    this.comentario.producto =this.chocolate.codigo;
    this._comentarioService.guardarComentario(this.comentario).subscribe(
      response=>{
        console.log("Se ha ingresado con exito el comentario");
        form.reset();
        this.status = 'success';
      },error=>{
        console.log(<any>error);
        this.status = 'failed';
      }
    )
  }
  getComentarios(){
    this._comentarioService.getComentarios().subscribe(
      response=> {
        this.comentarios = response.comentarios;
      },error=>{
        console.log(<any> error);
      }
    )
  }
  

}

import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../models/articulo';
import { ArticuloService } from '../../services/articulo.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-aboutus-a',
  templateUrl: './aboutus-a.component.html',
  styleUrls: ['./aboutus-a.component.css'],
  providers: [ArticuloService]
})
export class AboutusAComponent implements OnInit {
public articulos : Articulo [ ];
public url : string;
public selectArticulo : Articulo;
public confirmArt : boolean;

constructor(
  private _articuloService : ArticuloService,
){
  this.url = Global.url;
  this.articulos = [];
  this.confirmArt = false;
  this.selectArticulo = new Articulo("",0,"","","","","");
}
ngOnInit(): void {
    this.getArticulos();
}
getArticulos(){
  this._articuloService.getArticulos().subscribe(
    response => {
      console.log(response.articulos);
      if(response.articulos){
        this.articulos = response.articulos;
      }
    },
    error => {
      console.log(<any>error);
    }
  )
}
}

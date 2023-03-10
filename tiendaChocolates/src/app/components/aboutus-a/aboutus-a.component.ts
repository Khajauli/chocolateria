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
public confirmArt : boolean;
public selectedArticulo : Articulo;
public agregarVisible = false;
public addButton = false;

constructor(
  private _articuloService : ArticuloService,
){
  this.url = Global.url;
  this.articulos = [];
  this.confirmArt = false;
  this.selectedArticulo = new Articulo("",0,"","","","","");
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
        console.log(this.articulos);
      }
    },
    error => {
      console.log(<any>error);
    }
  )
}
setConfirmArt(confirm: boolean, articulo: Articulo) {
  this.confirmArt = confirm;
  this.selectedArticulo=articulo;
}
toggleAgregar() {
  this.agregarVisible = !this.agregarVisible;
}
borrarArticulo(articulo: Articulo){
  articulo.tipo = "Inactivo";
  this._articuloService.updateArticulo(articulo).subscribe(
    response=> {
      console.log("Eliminacion exitosa");
    }, error => {
      console.log("No se ha eliminado")
    }
  )
}
verify() {
  this.addButton = !this.addButton;
}

}

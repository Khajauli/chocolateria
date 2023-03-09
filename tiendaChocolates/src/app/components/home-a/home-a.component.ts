import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../models/articulo';
import { ArticuloService } from '../../services/articulo.service';
import { Chocolate } from '../../models/chocolate';
import { ChocolateService } from '../../services/chocolate.service';
import { Global } from '../../services/global';
import { Imagen } from '../../models/imagen';
import { ImagenService } from '../../services/imagen.service';

@Component({
  selector: 'app-home-a',
  templateUrl: './home-a.component.html',
  styleUrls: ['./home-a.component.css'],
  providers: [ArticuloService,ChocolateService, ImagenService]
})
export class HomeAComponent implements OnInit {
public articulos: Articulo [ ];
public url : string;
public productos:Chocolate [ ];
public confirm : boolean;
public  sortedChocolates: Chocolate[];
public index=1;
public agregarVisible = false;
public selectedProduct: Chocolate;
public imagen : Imagen;
public anadir: boolean;

constructor(
  private _articuloService: ArticuloService,
  private _chocolateService:ChocolateService,
  private _imagenService : ImagenService
  
){
  this.url = Global.url;
  this.articulos = [];
  this.productos = [];
  this.sortedChocolates = [];
  this.confirm = false;
  this.selectedProduct = new Chocolate ("","","",0,"","","",0,0,"");
  this.imagen = new Imagen ("",0,"","","");
  this.anadir = false;
}
ngOnInit(): void {
    this.getArticulos();
    this.getChocolates();
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
getChocolates() {
  this._chocolateService.getChocolates().subscribe(
    response => {
      if (response.chocolatesG) {
        this.productos = response.chocolatesG;
      }
    },
    error => {
      console.log(<any>error);
    }
  );
}
setConfirm(confirm: boolean, producto: Chocolate) {
  this.confirm = confirm;
  this.selectedProduct = producto;
}
AgregarChocolate(producto: Chocolate) {
  producto.estado = "Activo";
  this._chocolateService.updateChocolate(producto).subscribe(
    response => {
      console.log("Agregacion exitosa");
    },
    error => {
      console.log("No se agrego ");
    }
  )
}
borrarChocolate(producto: Chocolate) {
  producto.estado = "Inactivo";
  this._chocolateService.updateChocolate(producto).subscribe(
    response => {
      console.log("Eliminacion  exitosa");
    },
    error => {
      console.log("No se realizo la eliminacion ");
    }
  )
}

toggleAgregar() {
  this.agregarVisible = !this.agregarVisible;
}

setAdd(anadir: boolean) {
  this.anadir = anadir;
}

}
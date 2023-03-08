import { Component, OnInit  } from '@angular/core';
import { Chocolate } from '../../models/chocolate';
import { ChocolateService } from '../../services/chocolate.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [ChocolateService]
})
export class ProductosComponent implements OnInit {
public productos:Chocolate [ ];
public url : string ;
public confirm : boolean;
constructor(
  private _chocolateService:ChocolateService
){
  this.url = Global.url;
  this.productos = [];
  this.confirm = false;
}
ngOnInit(): void {
  console.log("oninti");
  this.getChocolates();
}
getChocolates(){
  console.log("choco");
  this._chocolateService.getChocolates().subscribe(
    response=>{
      console.log(response.chocolatesG);
      if(response.chocolatesG){
        console.log("paso");
        this.productos = response.chocolatesG;
        console.log(this.productos);
      }
    },
    error=>{
      console.log(<any>error);
    }
  );
}

obtenerCategorias(): string[] {
  let categorias = <any> [];

  for (let producto of this.productos) {
    if (!categorias.includes(producto.categoria)) {
      categorias.push(producto.categoria);
    }
  }

  return categorias;
}

setConfirm(confirm:boolean){
  this.confirm=confirm;
}
borrarChocolate(producto : Chocolate){
  //console.log(producto);
  producto.estado = "Inactivo";
  this._chocolateService.updateChocolate(producto).subscribe(
    response=>{
      console.log("Eliminacion  exitosa");
    },
    error=>{
      console.log("No se realizo la eliminacion ");
    }
    
    
  )
}

}

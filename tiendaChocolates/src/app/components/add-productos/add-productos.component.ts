import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chocolate } from '../../models/chocolate';
import { ChocolateService } from '../../services/chocolate.service';
import { Global } from '../../services/global';
import { Articulo } from '../../models/articulo';
import { ArticuloService } from '../../services/articulo.service';

@Component({
  selector: 'app-add-productos',
  templateUrl: './add-productos.component.html',
  styleUrls: ['./add-productos.component.css'],
  providers: [ChocolateService, ArticuloService]
})
export class AddProductosComponent implements OnInit{
  public productos:Chocolate [ ];
  public url : string ;
  public confirm : boolean;
  public articulos : Articulo [ ];
  public isChocolate : boolean;
  public isArticulos : boolean;
  constructor(
    private _chocolateService:ChocolateService,
    private _route:ActivatedRoute, 
    private _articuloService:ArticuloService
  ){
    this.url = Global.url;
    this.productos = [];
    this.confirm = false;
    this.articulos = [];
    this.isChocolate = false;
    this.isArticulos = false;
  }
  ngOnInit(): void {
    console.log("oninit");
    this._route.params.subscribe(params => {
      if (params && params['categoria']) {
        let categoria = params['categoria'];
        if (categoria === 'articulos') {
          this.getArticulos();
          this.isArticulos = true;
          console.log("Estoy en articulos y su valor es", this.isArticulos);
        } else {
          this.getChocolates(categoria);
          this.isChocolate = true;
        }
      } else {
        this.getChoco();
        this.isChocolate = true;
      }
    });
  }
  getArticulos(){
    this._articuloService.getArticulos().subscribe(
      response=>{
        this.articulos = response.articulos;
      }, error=>{
        console.log(<any>error);
      }
    )
  }
  getChoco(){
    this._chocolateService.getChocolates().subscribe( 
      response=>{
        console.log(response.chocolatesG);
        if(response.chocolatesG){
          this.productos = response.chocolatesG;
          console.log("paso por aqui");
        }
      },
      error=>{
        console.log(<any>error);
      }
    );
  }
  getChocolates(categoria:string){
    this._chocolateService.getChocolatesC(categoria).subscribe(
      response=>{
        console.log(response.chocolates);
        if(response.chocolates){
          this.productos = response.chocolates;
          console.log(this.productos);
        }
      },
      error=>{
        console.log(<any>error);
      }
    );
  }
  setConfirm(confirm:boolean){
    this.confirm=confirm;
  }
  agregarChocolate(producto: Chocolate) {
    producto.estado = "Activo";
    this._chocolateService.updateChocolate(producto).subscribe(
      response => {
        console.log("Agregar exitoso");
      },
      error => {
        console.log("No se agrego ");
      }
    )
  }
}

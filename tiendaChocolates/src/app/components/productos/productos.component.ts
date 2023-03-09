import { Component, OnInit } from '@angular/core';
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
  public productos: Chocolate[];
  public url: string;
  public confirm: boolean;
  public isFour: number;
  public categorias: string[]; // added this property to hold categories
  public selectedProduct: Chocolate;


  constructor(private _chocolateService: ChocolateService) {
    this.url = Global.url;
    this.productos = [];
    this.confirm = false;
    this.isFour = 0;
    this.categorias = []; // initialize categories array
    this.selectedProduct = new Chocolate ("","","",0,"","","",0,0,"");
  }

  ngOnInit(): void {
    this.getChocolates();
  }

  getChocolates() {
    this._chocolateService.getChocolates().subscribe(
      response => {
        if (response.chocolatesG) {
          this.productos = response.chocolatesG;
          this.obtenerCategorias(); // call obtenerCategorias() once after products are loaded
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  obtenerCategorias() {
    let categorias: string[] = [];
    let contador: number;

    for (let categoria of this.productos) {
      contador = 0;
      for (let producto of this.productos) {
        if (producto.categoria === categoria.categoria && producto.estado === 'Activo') {
          contador++;
        }
      }
      if (!categorias.includes(categoria.categoria)) {
        categorias.push(categoria.categoria);
        console.log(categoria.categoria + ': ' + contador);
      }
    }

    this.categorias = categorias; // assign categories array to class property
  }

  setConfirm(confirm: boolean, producto: Chocolate) {
    this.confirm = confirm;
    this.selectedProduct = producto;
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
}

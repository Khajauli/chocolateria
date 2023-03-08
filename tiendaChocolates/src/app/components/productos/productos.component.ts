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
  public categorias: string[];
  public showButtons: boolean; // added this property
  public showButtonsForCategory: { [key: string]: boolean };

  constructor(private _chocolateService: ChocolateService) {
    this.url = Global.url;
    this.productos = [];
    this.confirm = false;
    this.isFour = 0;
    this.categorias = [];
    this.showButtons = false; // initialize showButtons to false
    this.showButtonsForCategory = {};

    this.categorias.forEach((categoria) => {
      this.showButtonsForCategory[categoria] = false;
    });

  }

  ngOnInit(): void {
    this.getChocolates();
  }

  getChocolates() {
    this._chocolateService.getChocolates().subscribe(
      response => {
        if (response.chocolatesG) {
          this.productos = response.chocolatesG;
          this.obtenerCategorias();
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

    this.categorias = categorias;
  }

  setConfirm(confirm: boolean) {
    this.confirm = confirm;
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

   showAddButtons(categoria: string) { // modified this method to take a category argument
    this.showButtonsForCategory[categoria] = true;
  }

}

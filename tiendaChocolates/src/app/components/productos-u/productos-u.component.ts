import { Component, OnInit } from '@angular/core';
import { Chocolate } from '../../models/chocolate';
import { ChocolateService } from '../../services/chocolate.service';
import { Global } from '../../services/global';


@Component({
  selector: 'app-productos-u',
  templateUrl: './productos-u.component.html',
  styleUrls: ['./productos-u.component.css'],
  providers: [ChocolateService]
})
export class ProductosUComponent implements OnInit {
  public productos: Chocolate[];
  public url: string;
  public categorias: string[];
  constructor(private _chocolateService: ChocolateService) {
    this.url = Global.url;
    this.productos = [];
    this.categorias = []; // initialize categories array
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
}

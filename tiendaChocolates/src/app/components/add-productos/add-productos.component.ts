import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chocolate } from '../../models/chocolate';
import { ChocolateService } from '../../services/chocolate.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-add-productos',
  templateUrl: './add-productos.component.html',
  styleUrls: ['./add-productos.component.css'],
  providers: [ChocolateService]
})
export class AddProductosComponent implements OnInit{
  public productos:Chocolate [ ];
  public url : string ;
  public confirm : boolean;
  constructor(
    private _chocolateService:ChocolateService,
    private _route:ActivatedRoute
  ){
    this.url = Global.url;
    this.productos = [];
    this.confirm = false;
  }
  ngOnInit(): void {
    console.log("oninti");
    this._route.params.subscribe(params=>{
      let categoria=params['categoria'];
      this.getChocolates(categoria);
    })
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
}

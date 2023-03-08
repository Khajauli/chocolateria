import { Component, OnInit  } from '@angular/core';
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
    this._chocolateService.getChocolates().subscribe(
      response=>{
        console.log(response.chocolatesG);
        if(response.chocolatesG){
          this.productos = response.chocolatesG;
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

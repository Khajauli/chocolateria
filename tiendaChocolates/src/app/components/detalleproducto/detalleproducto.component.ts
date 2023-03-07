import { Component, OnInit } from '@angular/core';
import { Chocolate } from '../../models/chocolate';
import { ChocolateService } from '../../services/chocolate.service';
import { Global } from '../../services/global';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalleproducto',
  templateUrl: './detalleproducto.component.html',
  styleUrls: ['./detalleproducto.component.css'], 
  providers : [ChocolateService]
})
export class DetalleproductoComponent implements OnInit {
  public url : string;
  public chocolate : Chocolate;
  public confirm : boolean;
  
  constructor(
    private _chocolateService : ChocolateService,
    private _router : Router,
    private _route : ActivatedRoute
  ){
    this.url = Global.url;
    this.chocolate = new Chocolate ("","","",0,"","","",0,0,"");
    this.confirm = false;
  }
  ngOnInit(): void {
      this._route.params.subscribe(params=>{
        let id = params['id'];
        this.getProducto(id);
      })
  }
  getProducto(id : String){
    this._chocolateService.getChocolate(id).subscribe(
      
      response => {
        console.log(response.chocolateG);
        this.chocolate = response.chocolateG;
      },
      error => {
        console.log(<any> error);
      }
    )
  }
  setConfirm(confirm : boolean){
    this.confirm = confirm;
  }

}

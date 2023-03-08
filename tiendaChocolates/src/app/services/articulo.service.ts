import {Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Articulo } from "../models/articulo";
import { Global } from "./global";
import { Observable } from 'rxjs';

@Injectable()
export class ArticuloService{
    public url:string;
    constructor(
        private _http:HttpClient
    ){
        this.url=Global.url;
    }

    getArticulos():Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'articulos',{headers:headers});
    }

    guardarArticulo(articulo:Articulo):Observable<any>{
        let params=JSON.stringify(articulo);
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'guardarArticulo',params,{headers:headers});
    }

    getArticuloP(producto:string):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'articuloP/'+producto,{headers:headers});
    }

    getArticulo(id:string):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'articulo/'+id,{headers:headers});
    }

    updateArticulo(articulo:Articulo):Observable<any>{
        let params=JSON.stringify(articulo);
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.put(this.url+'articulo/'+articulo._id,params,{headers:headers});
    }

    deleteArticulo(id:string):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.delete(this.url+'articulo/'+id,{headers:headers});
    }


}
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Imagen } from "../models/imagen";
import { Global } from "./global";
import { Observable } from "rxjs";


@Injectable()
export class ImagenService{
    public url:string;
    constructor(
        private _http:HttpClient
    ){
        this.url=Global.url;
    }

    getImagenes():Observable<any>{
        let headers=new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'imagenes',{headers:headers});
    }

    getChocolatesC(tipo:String):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'imagenesT/'+tipo,{headers:headers});
    }

    guardarChocolate(imagen:Imagen):Observable<any>{
        let params=JSON.stringify(imagen);
        let headers=new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url+'guardarImgen',params,{headers:headers});
    }

    getChocolate(id:String):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'imagen/'+id,{headers:headers});
    }

    updateChocolate(imagen:Imagen):Observable<any>{
        let params=JSON.stringify(imagen);
        let headers=new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+'editarImagen/'+imagen._id,params,{headers:headers});
    }

    deleteChocolate(id:string):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url+'borrarImagen/'+id,{headers:headers});
    }
}
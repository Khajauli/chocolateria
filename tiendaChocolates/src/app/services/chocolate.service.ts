import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Chocolate } from "../models/chocolate";
import { Global } from "./global";
import { Observable } from "rxjs";


@Injectable()
export class ChocolateService{
    public url:string;
    constructor(
        private _http:HttpClient
    ){
        this.url=Global.url;
    }

    getChocolates():Observable<any>{
        let headers=new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'chocolates',{headers:headers});
    }

    guardarChocolate(chocolate:Chocolate):Observable<any>{
        let params=JSON.stringify(chocolate);
        let headers=new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url+'guardar-chocolate',params,{headers:headers});
    }

    getChocolate(id:String):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'chocolate/'+id,{headers:headers});
    }

    updateChocolate(chocolate:Chocolate):Observable<any>{
        let params=JSON.stringify(chocolate);
        let headers=new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+'editar-chocolate/'+chocolate._id,params,{headers:headers});
    }

    deleteChocolate(id:string):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url+'borrar-chocolate/'+id,{headers:headers});
    }
}

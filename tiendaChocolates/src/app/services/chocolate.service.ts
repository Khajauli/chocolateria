import {Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Comentario } from "../models/comentario";
import { Global } from "./global";
import { Observable } from 'rxjs';

@Injectable()
export class ComentarioService{
    public url:string;
    constructor(
        private _http:HttpClient
    ){
        this.url=Global.url;
    }

    getComentarios():Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'/comentarios',{headers:headers});
    }

    guardarComentario(comentario:Comentario):Observable<any>{
        let params=JSON.stringify(comentario);
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'/guardarComentario',params,{headers:headers});
    }

    getComentarioP(producto:string):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'/encontrarCliente/'+producto,{headers:headers});
    }

    getComentario(id:string):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'/comentario/'+id,{headers:headers});
    }

    updateCliente(comentario:Comentario):Observable<any>{
        let params=JSON.stringify(comentario);
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.put(this.url+'/comentario/'+comentario._id,params,{headers:headers});
    }

    deleteComentario(id:string):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.delete(this.url+'/comentario/'+id,{headers:headers});
    }




}
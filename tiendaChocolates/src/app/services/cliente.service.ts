import {Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Cliente } from "../models/cliente";
import { Global } from "./global";
import { Observable } from 'rxjs';

@Injectable()
export class ClienteService{
    public url:string;
    constructor(
        private _http:HttpClient
    ){
        this.url=Global.url;
    }

    getClientes():Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'/clientes',{headers:headers});
    }

    guardarCliente(cliente:Cliente):Observable<any>{
        let params=JSON.stringify(cliente);
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'/guardarCliente',params,{headers:headers});
    }

    getClienteN(cedula:string):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'/encontrarCliente/'+cedula,{headers:headers});
    }

    getCliente(id:string):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'/cliente/'+id,{headers:headers});
    }

    updateCliente(cliente:Cliente):Observable<any>{
        let params=JSON.stringify(cliente);
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.put(this.url+'/cliente/'+cliente._id,params,{headers:headers});
    }

    deleteCliente(id:string):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.delete(this.url+'/cliente/'+id,{headers:headers});
    }

    login(usuario: string, contrasenia: string):Observable<any>{
        let data = JSON.stringify({ usuario:usuario, contrasenia:contrasenia });
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'login', data,{headers:headers});
      }
    
      logout():Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'logout',{headers:headers});
      }


}
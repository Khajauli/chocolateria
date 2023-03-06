import {Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Administrador } from "../models/administrador";
import { Global } from "./global";
import { Observable } from 'rxjs';

@Injectable()
export class AdministradorService{
    public url:string;
    constructor(
        private _http:HttpClient
    ){
        this.url=Global.url;
    }

    getAdmins():Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'/administradores',{headers:headers});
    }

    guardarAdmin(administrador:Administrador):Observable<any>{
        let params=JSON.stringify(administrador);
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'/guardarAdmin',params,{headers:headers});
    }

    getAdminN(cedula:string):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'/administradorC/'+cedula,{headers:headers});
    }

    getAdmin(id:string):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'/administrador/'+id,{headers:headers});
    }

    updateAdmin(administrador:Administrador):Observable<any>{
        let params=JSON.stringify(administrador);
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.put(this.url+'/administrador/'+administrador._id,params,{headers:headers});
    }

    deleteAdmin(id:string):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.delete(this.url+'/administrador/'+id,{headers:headers});
    }

    login(usuario: string, contrasenia: string):Observable<any>{
        let data = JSON.stringify({ usuario:usuario, contrasenia:contrasenia });
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'loginAdmin', data,{headers:headers});
      }
    
      logout():Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'logoutAdmin',{headers:headers});
      }


}
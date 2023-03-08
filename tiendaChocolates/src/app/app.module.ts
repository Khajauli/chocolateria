import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PieComponent } from './components/pie/pie.component';
import { EncabezadoComponent } from './components/encabezado/encabezado.component';
import { ProductosComponent } from './components/productos/productos.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactosComponent } from './components/contactos/contactos.component';
import { EncabezadoAComponent } from './components/encabezado-a/encabezado-a.component';
import { NuevoChocolateComponent } from './components/nuevo-chocolate/nuevo-chocolate.component';
import { NuevoClienteComponent } from './components/nuevo-cliente/nuevo-cliente.component';
import { NuevoAdministradorComponent } from './components/nuevo-administrador/nuevo-administrador.component';
import { LoginClientesComponent } from './components/login-clientes/login-clientes.component';
import { LoginAdministradoresComponent } from './components/login-administradores/login-administradores.component';
import { DetalleproductoComponent } from './components/detalleproducto/detalleproducto.component';
import { EditarProductosComponent } from './components/editar-productos/editar-productos.component';
import { NuevoComentarioComponent } from './components/nuevo-comentario/nuevo-comentario.component';
import { NuevoArticuloComponent } from './components/nuevo-articulo/nuevo-articulo.component';
import { AddProductosComponent } from './components/add-productos/add-productos.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PieComponent,
    EncabezadoComponent,
    ProductosComponent,
    AboutUsComponent,
    ContactosComponent,
    EncabezadoAComponent,
    NuevoChocolateComponent,
    NuevoClienteComponent,
    NuevoAdministradorComponent,
    LoginClientesComponent,
    LoginAdministradoresComponent,
    DetalleproductoComponent,
    EditarProductosComponent,
    NuevoComentarioComponent,
    NuevoArticuloComponent,
    AddProductosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

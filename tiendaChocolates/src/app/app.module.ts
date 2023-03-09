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
import { NuevoAdministradorComponent } from './components/nuevo-administrador/nuevo-administrador.component';
import { LoginClientesComponent } from './components/login-clientes/login-clientes.component';
import { LoginAdministradoresComponent } from './components/login-administradores/login-administradores.component';
import { DetalleproductoComponent } from './components/detalleproducto/detalleproducto.component';
import { EditarProductosComponent } from './components/editar-productos/editar-productos.component';
import { NuevoComentarioComponent } from './components/nuevo-comentario/nuevo-comentario.component';
import { NuevoArticuloComponent } from './components/nuevo-articulo/nuevo-articulo.component';
import { AddProductosComponent } from './components/add-productos/add-productos.component';
import { ProductosUComponent } from './components/productos-u/productos-u.component';
import { AboutusAComponent } from './components/aboutus-a/aboutus-a.component';
import { PieRComponent } from './components/pie-r/pie-r.component';
import { HomeAComponent } from './components/home-a/home-a.component';
import { InventarioTotalComponent } from './components/inventario-total/inventario-total.component';
import { EditarArticulosComponent } from './components/editar-articulos/editar-articulos.component';

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
    NuevoAdministradorComponent,
    LoginClientesComponent,
    LoginAdministradoresComponent,
    DetalleproductoComponent,
    EditarProductosComponent,
    NuevoComentarioComponent,
    NuevoArticuloComponent,
    AddProductosComponent,
    HomeAComponent,
    ProductosUComponent,
    AboutusAComponent,
    PieRComponent,
    InventarioTotalComponent,
    EditarArticulosComponent,
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

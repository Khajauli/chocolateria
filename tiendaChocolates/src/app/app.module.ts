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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PieComponent,
    EncabezadoComponent,
    ProductosComponent,
    AboutUsComponent,
    ContactosComponent,
    EncabezadoAComponent
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactosComponent } from './components/contactos/contactos.component';

import { HomeComponent } from './components/home/home.component';
import { ProductosComponent } from './components/productos/productos.component';

const routes: Routes = [
  {path: 'inicio', component: HomeComponent},
  {path: 'productos', component: ProductosComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'contactos', component: ContactosComponent},
  {path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactosComponent } from './components/contactos/contactos.component';

import { HomeComponent } from './components/home/home.component';
import { NuevoAdministradorComponent } from './components/nuevo-administrador/nuevo-administrador.component';
import { NuevoChocolateComponent } from './components/nuevo-chocolate/nuevo-chocolate.component';
import { NuevoClienteComponent } from './components/nuevo-cliente/nuevo-cliente.component';
import { ProductosComponent } from './components/productos/productos.component';

const routes: Routes = [
  {path: 'inicio', component: HomeComponent},
  {path: 'productos', component: ProductosComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'contactos', component: ContactosComponent},
  {path: 'nuevoChocolate', component: NuevoChocolateComponent},
  {path: 'nuevoCliente', component: NuevoClienteComponent},
  {path: 'nuevoAdministrador', component:NuevoAdministradorComponent},
  {path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

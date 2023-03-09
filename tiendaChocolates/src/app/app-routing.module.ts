import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AddProductosComponent } from './components/add-productos/add-productos.component';
import { ContactosComponent } from './components/contactos/contactos.component';
import { DetalleproductoComponent } from './components/detalleproducto/detalleproducto.component';
import { EditarProductosComponent } from './components/editar-productos/editar-productos.component';

import { HomeComponent } from './components/home/home.component';
import { LoginAdministradoresComponent } from './components/login-administradores/login-administradores.component';
import { LoginClientesComponent } from './components/login-clientes/login-clientes.component';
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
  {path: 'chocolate/:id', component:DetalleproductoComponent},
  {path: 'editar-producto/:id' , component:EditarProductosComponent},
  {path: 'loginCliente' , component:LoginClientesComponent},  
  {path: 'loginAdministrador' , component:LoginAdministradoresComponent},  
  {path: 'inventario/:categoria',component:AddProductosComponent},
  {path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

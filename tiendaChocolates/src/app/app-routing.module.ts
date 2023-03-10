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
import { ProductosComponent } from './components/productos/productos.component';
import { ProductosUComponent } from './components/productos-u/productos-u.component';
import { HomeAComponent } from './components/home-a/home-a.component';
import { InventarioTotalComponent } from './components/inventario-total/inventario-total.component';
import { NuevoArticuloComponent } from './components/nuevo-articulo/nuevo-articulo.component';
import { EditarArticulosComponent } from './components/editar-articulos/editar-articulos.component';
import { AuthAGuard } from './authA.guard';
import { AboutusAComponent } from './components/aboutus-a/aboutus-a.component';

const routes: Routes = [
  {path: 'inicio', component: HomeComponent},
  {path: 'productos', component: ProductosComponent,canActivate:[AuthAGuard]},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'contactos', component: ContactosComponent},
  {path: 'nuevoChocolate', component: NuevoChocolateComponent,canActivate:[AuthAGuard]},
  {path: 'nuevoAdministrador', component:NuevoAdministradorComponent,canActivate:[AuthAGuard]},
  {path: 'chocolate/:id', component:DetalleproductoComponent},
  {path: 'editar-producto/:id' , component:EditarProductosComponent,canActivate:[AuthAGuard]},
  {path: 'loginCliente' , component:LoginClientesComponent},  
  {path: 'loginAdministrador' , component:LoginAdministradoresComponent},  
  {path: 'inventario/:categoria',component:AddProductosComponent,canActivate:[AuthAGuard]},
  {path: 'inventario',component:AddProductosComponent,canActivate:[AuthAGuard]},
  {path: 'nuestrosChocolates',component:ProductosUComponent},
  {path: 'inicioAdmin', component:HomeAComponent},
  {path: 'inventario', component:InventarioTotalComponent,canActivate:[AuthAGuard]},
  {path: 'nuevoArticulo', component:NuevoArticuloComponent,canActivate:[AuthAGuard]},
  {path: 'editar-articulo/:id', component:EditarArticulosComponent,canActivate:[AuthAGuard]},
  {path: 'aboutus-a', component:AboutusAComponent,canActivate:[AuthAGuard]},
  {path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

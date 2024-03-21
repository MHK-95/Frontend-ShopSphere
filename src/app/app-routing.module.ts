import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './security/registration/registration.component';
import { AuthenticationComponent } from './security/authentication/authentication.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProfileComponent } from './profile/profile.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
{
  path: 'authentication',
  component: AuthenticationComponent
},
{
  path: 'registration',
  component: RegistrationComponent
},
{
  path: 'home',
  component: HomeComponent
},
{
  path: '#',
  component: HomeComponent
},
{
  path: '',
  component: HomeComponent
},
{
  path: 'card',
  component: ProductCardComponent
},
{
  path: 'cart',
  component: CartComponent
},
{
  path: 'order',
  component: OrderComponent
},
{
  path: 'profile/:jwt',
  component: ProfileComponent
},
{
  path: 'logout',
  component: ProfileComponent
},
{
  path: 'products/:category',
  component: ProductsComponent
},
{
  path: 'products/:order',
  component: OrderComponent
},
{
  path: 'product-details/:productId',
  component: ProductDetailsComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

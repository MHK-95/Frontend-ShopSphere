import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './security/authentication/authentication.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './security/registration/registration.component';
import { NavBarComponent } from './nav-bar/nav-bar.component'
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { createPopper } from '@popperjs/core';
import { FooterComponent } from './footer/footer.component';
import { ProductsComponent } from './products/products.component';
import { HeaderComponent } from './header/header.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    RegistrationComponent,
    NavBarComponent,
    HomeComponent,
    FooterComponent,
    ProductsComponent,
    HeaderComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    ProfileComponent,
    CartComponent,
    OrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    CommonModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule { }

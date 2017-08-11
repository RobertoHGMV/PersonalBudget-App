import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//Services
import { AccountService } from './services/account.service';
import { AuthService } from './services/auth.service';

//Rotas
import { Routing, RoutingProviders } from './app.routing';

//Root
import { AppComponent } from './app.component';

//Shared
import { HeadbarComponent } from './components/shared/headbar/headbar.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { SubMenuComponent } from './components/shared/sub-menu/sub-menu.component';
import { FooterComponent } from './components/shared/footer/footer.component';

//Pages
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { ToggleMenuComponent } from './components/shared/toggle-menu/toggle-menu.component';

//Formulários
import { AccountsComponent } from './components/forms/accounts/accounts.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadbarComponent,
    SubMenuComponent,
    SidebarComponent,
    FooterComponent,
    HomePageComponent,
    LoginPageComponent,
    SignupPageComponent,
    ToggleMenuComponent,
    AccountsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    Routing
  ],
  providers: [AccountService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; //para evitar erro SimpleNotification

//Packages
import { SimpleNotificationsModule } from 'angular2-notifications';

//Services
import { AccountService } from './services/account.service';
import { AuthService } from './services/auth.service';

//Rotas
import { Routing, RoutingProviders } from './app.routing';

//Root
import { AppComponent } from './app.component';

//Shared
import { FormDebugComponent } from './components/shared/form-debug/form-debug.component';
import { HeadbarComponent } from './components/shared/headbar/headbar.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { SubMenuComponent } from './components/shared/sub-menu/sub-menu.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ToggleMenuComponent } from './components/shared/toggle-menu/toggle-menu.component';
import { IconErrorComponent } from './components/shared/errors/icon-error/icon-error.component';
import { MessageErrorComponent } from './components/shared/errors/message-error/message-error.component';

//Pages
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';

//Modais
import { BusinessModalComponent } from './components/modals/business-modal/business-modal.component';


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
    AccountPageComponent,
    IconErrorComponent,
    MessageErrorComponent,
    FormDebugComponent,
    BusinessModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    Routing,
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [AccountService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

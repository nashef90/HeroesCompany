import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
const MatModules = [MatToolbarModule, MatIconModule, MatButtonModule, MatInputModule, MatCardModule,
  MatFormFieldModule, MatProgressSpinnerModule, MatTooltipModule, MatSelectModule];

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { NavMenuComponent } from './components/layout-area/nav-menu/nav-menu.component';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { EditHeroComponent } from './components/heroes-area/edit-hero/edit-hero.component';
import { NewHeroComponent } from './components/heroes-area/new-hero/new-hero.component';
import { HeroCardComponent } from './components/heroes-area/hero-card/hero-card.component';
import { HeroesComponent } from './components/heroes-area/heroes/heroes.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { SpinnerOverlayComponent } from './components/layout-area/spinner-overlay/spinner-overlay.component';
import { SpinnerComponent } from './components/layout-area/spinner/spinner.component';
import { LoadingInterceptor } from './interceptors/loading-interceptor';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { ErrorInterceptor } from './interceptors/error-interceptor';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { SignUpComponent } from './components/auth-area/sign-up/sign-up.component';
import { HeroDetailsComponent } from './components/heroes-area/hero-details/hero-details.component';
import { HeroInfoItemComponent } from './components/heroes-area/hero-info-item/hero-info-item.component';


@NgModule({
  declarations: [
    LayoutComponent,
    NavMenuComponent,
    PageNotFoundComponent,
    LoginComponent,
    LogoutComponent,
    EditHeroComponent,
    NewHeroComponent,
    HeroCardComponent,
    HeroesComponent,
    SpinnerOverlayComponent,
    SpinnerComponent,
    SignUpComponent,
    HeroDetailsComponent,
    HeroInfoItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ...MatModules,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: false,
      enableHtml: true,
      closeButton: false,
      autoDismiss: false,
      tapToDismiss: false,
    }),
    HttpClientModule,
    PortalModule,
    OverlayModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  }],
  entryComponents: [SpinnerOverlayComponent],
  bootstrap: [LayoutComponent]
})
export class AppModule { }

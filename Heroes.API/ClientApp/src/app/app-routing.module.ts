import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth-area/login/login.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { SignUpComponent } from './components/auth-area/sign-up/sign-up.component';
import { EditHeroComponent } from './components/heroes-area/edit-hero/edit-hero.component';
import { HeroDetailsComponent } from './components/heroes-area/hero-details/hero-details.component';
import { HeroesComponent } from './components/heroes-area/heroes/heroes.component';
import { NewHeroComponent } from './components/heroes-area/new-hero/new-hero.component';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';
import { AnonymousGuard } from './guards/anonymous.guard';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AnonymousGuard]
  }, {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'signup',
    component: SignUpComponent,
    canActivate: [AnonymousGuard]
  },
  {
    path: 'heroes',
    component: HeroesComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'heroes/edit/:id',
    component: EditHeroComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'heroes/details/:id',
    component: HeroDetailsComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'heroes/new',
    component: NewHeroComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '404',
    component: PageNotFoundComponent
  }, {
    path: '',
    redirectTo: '/heroes',
    pathMatch: 'full'
  }, {
    path: '**',
    redirectTo: '/404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

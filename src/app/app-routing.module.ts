import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuardService} from "./shared/services/auth/auth-guard.service";
import {AuthenticPreventService} from "./shared/services/auth/authentic-prevent.service";
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
const routes: Routes = [
  {path:'auth', loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule), canActivate:[AuthenticPreventService]},
  {path:'404', component:NotFoundComponent},
  {path:"**", redirectTo:"404", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

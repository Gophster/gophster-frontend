import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./partials/auth/auth.component";
import { RegistrationComponent } from "./partials/registration/registration.component";
import { ResetpwdComponent } from "./partials/resetpwd/resetpwd.component";
const routes: Routes = [
  { path: "", redirectTo: "/auth", pathMatch: "full" },
  { path: "register", component: RegistrationComponent },
  { path: "auth", component: AuthComponent },
  { path: "resetpwd", component: ResetpwdComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

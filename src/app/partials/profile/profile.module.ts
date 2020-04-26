import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { routes } from "./profile.routes";
import { AuthGuard, NonAuthGuard } from "../../guards";
import { ProfileComponent } from "./profile.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ProfileComponent],
  exports: [ProfileComponent],
  providers: [AuthGuard],
})
export class MainModule {}

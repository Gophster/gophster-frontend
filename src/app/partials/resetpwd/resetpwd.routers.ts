import { ResetpwdComponent } from "./resetpwd.component";
import { NonAuthGuard } from "../../guards";

export const routes: any = [
  {
    path: "",
    children: [
      { path: "", component: ResetpwdComponent, canActivate: [NonAuthGuard] }
    ]
  }
];

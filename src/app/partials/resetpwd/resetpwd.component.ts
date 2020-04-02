import { Component, OnInit } from "@angular/core";
import { ICONS, IMAGES } from "../../utils";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
@Component({
  selector: "app-resetpwd",
  templateUrl: "./resetpwd.component.html",
  styleUrls: ["./resetpwd.component.scss"]
})
export class ResetpwdComponent implements OnInit {
  public imagePath: string = IMAGES;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  public onSubmit() {
    Swal.fire({
      title: "",
      text: "Reset Password Instruction was sent to your email",
      icon: "success",
      confirmButtonColor: "rgb(171, 119, 75)",
      timer: 2000
    });
    this.router.navigate(["/auth"]);
  }
}

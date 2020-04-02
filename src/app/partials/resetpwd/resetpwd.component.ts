import { Component, OnInit } from "@angular/core";
import { ICONS, IMAGES } from "../../utils";
import { Router } from "@angular/router";
@Component({
  selector: "app-resetpwd",
  templateUrl: "./resetpwd.component.html",
  styleUrls: ["./resetpwd.component.scss"]
})
export class ResetpwdComponent implements OnInit {
  public imagePath: string = IMAGES;
  showEmailInput = true;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  public onSubmit() {
    this.router.navigate(["/auth"]);
  }

  submitForm() {
    this.showEmailInput = !this.showEmailInput;
    console.log(this.showEmailInput);
  }
}

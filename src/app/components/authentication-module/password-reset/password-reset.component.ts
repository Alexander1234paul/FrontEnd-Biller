import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupName } from '@angular/forms';
import { from } from 'rxjs';
import { LoginService } from 'src/app/services/authentication/login.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  estado: boolean = false;
  resp: string = '';

  constructor(private loginService: LoginService) { }

  ngOnInit(): void { }

  formEmail = new FormGroup({
    email: new FormControl(''),
    code: new FormControl('')
  });

  public verifyEmailRegistered(form: any) {
    this.loginService.verifyEmailRegistered(form.email).subscribe(
      (data: any) => {
        console.log(data);
        if (!data.registrado) {
          this.estado = true;
          this.resp = "Correo Incorrecto";
        } else {
          this.estado = false;
          this.resp = "Correo Correcto";
          this.sendVerificationCode(form);
        }
      });
  }

  sendVerificationCode(form: any) {
    this.loginService.sendVerificationCode(form).subscribe(
      (data: any) => {
        console.log(data);
        // if (!data.registrado) {
        //   this.estado = true;
        //   this.resp = "Correo Incorrecto";
        // } else {
        //   this.estado = true;
        //   this.resp = "Correo Correcto";
        // }
      });
  }

  verifyCode(form: any) {
    console.log(form);
    
    this.loginService.verifyCode(form).subscribe((data: any) => {
      console.log(data);
      // if (!data.registrado) {
      //   this.estado = true;
      //   this.resp = "Correo Incorrecto";
      // } else {
      //   this.estado = true;
      //   this.resp = "Correo Correcto";
      // }
    });
  }
}

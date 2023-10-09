import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/authentication/login.service';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  estado: boolean = false;
  resp: string = '';

  constructor(private loginServices: LoginService, private router: Router) { }

  ngOnInit(): void { }

  formRegisterUser = new FormGroup({
    ci_ruc: new FormControl(''),
    nombres: new FormControl(''),
    apellidos: new FormControl(''),
    telefono: new FormControl(''),
    email: new FormControl(''),
    direccion: new FormControl(''),
  });

  public registerUser(form: any) {
    this.getPersonByCIOrEmail(form.ci_ruc);
    // this.loginServices.sendVerificationEmail(form).subscribe(
    //   (response: any) => {
    //     if (response.status == 'Error') {
    //       this.estado = true;
    //       this.resp = response.resp;
    //     } else {
    //       this.estado = false;
    //       this.router.navigate(['signup/mail-verification']);
    //     }
    //   },
    //   (error) => {
    //     console.error('Error en la solicitud POST', error);
    //   }
    // );
  }

  public getPersonByCIOrEmail(data: string) {
    this.loginServices.getPersonByCIOrEmail(data).subscribe(
      (response: any) => {
        console.log(response);

        // if (response.status == 'Error') {
        //   this.estado = true;
        //   this.resp = response.resp;
        // } else {
        //   this.estado = false;
        //   this.router.navigate(['signup/mail-verification']);
        // }
      },
      (error) => {
        console.error('Error en la solicitud POST', error);
      }
    );
  }


}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/authentication/login.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  token: any;
  constructor(private route: ActivatedRoute, private loginService: LoginService) { };

  ngOnInit(): void {
    const tokenId = '?(t+ERL5l9!=';
    this.token = localStorage.getItem(tokenId);
  }

  formUpdatePassword = new FormGroup({
    newPassword: new FormControl(''),
    confirmPassword: new FormControl('')
  });

  updatePassword(form: any) {
    this.loginService.updatePassword(this.token, form.newPassword).subscribe(
      (response: any) => {
        console.log(response);
        // this.email = response.email;
        // this.verificationMessage = response.resp; // Mensaje de éxito
      },
      (error: any) => {
        console.log(error);

        // this.verificationMessage = 'Error al verificar el correo electrónico.'; // Mensaje de error
      }
    );
  }
}

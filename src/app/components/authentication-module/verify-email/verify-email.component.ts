import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/authentication/login.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  verificationMessage: string = "";
  email: string = "";

  constructor(private route: ActivatedRoute, private loginService: LoginService) { }
  ngOnInit(): void {
    const token = this.route.snapshot.params['token'];
    this.verifyToken(token);
  }

  verifyToken(token: string): void {
    this.loginService.verifyToken(token).subscribe(
      (response: any) => {
        console.log(response);
        this.email = response.email;
        this.verificationMessage = response.resp; // Mensaje de éxito
      },
      (error: any) => {
        console.log(error);
        this.verificationMessage = 'Error al verificar el correo electrónico.'; // Mensaje de error
      }
    );
  }
}

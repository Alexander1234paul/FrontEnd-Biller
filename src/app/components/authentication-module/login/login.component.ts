import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/authentication/login.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  estado: boolean = false;
  resp: string = '';
  @Input() progressBar: boolean = false;
  constructor(
    private loginServices: LoginService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}
  ngOnNavigationStart() {
    this.progressBar = true;
  }

  ngOnNavigationEnd() {
    this.progressBar = false;
  }

  formLogin = new FormGroup({
    user: new FormControl(''),
    password: new FormControl(''),
  });

  login(form: any) {
    this.loginServices.Login(form).subscribe(
      (data: any) => {
        if (data.status == 'Error') {
          this.estado = true;
          this.resp = data.resp;
        } else {
          this.estado = false;
          const token = '?(t+ERL5l9!=';
          localStorage.setItem(token, data.token);
          localStorage.setItem('username', data.username);
          this.router.navigate(['/dashboard/home']);
        }
      },
      (error) => {
        console.error('Error en la solicitud POST', error);
      }
    );
  }

  viewPassword() {
    var tipo: HTMLInputElement = <HTMLInputElement>(
      document.getElementById('password')!
    );
    let iconView = document.getElementById('viewP')!;
    if (tipo.type == 'password') {
      tipo.type = 'text';
      iconView.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
      tipo.type = 'password';
      iconView.innerHTML = '<i class="fas fa-eye"></i>';
    }
  }
}

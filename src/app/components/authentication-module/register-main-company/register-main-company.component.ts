import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/authentication/login.service';

@Component({
  selector: 'app-register-main-company',
  templateUrl: './register-main-company.component.html',
  styleUrls: ['./register-main-company.component.css']
})
export class RegisterMainCompanyComponent implements OnInit {
  estado: boolean = false;
  resp: string = '';
  username: string = 'Nombre de Usuario';

  constructor(private loginServices: LoginService) { }

  ngOnInit(): void { }

  tokenId = '?(t+ERL5l9!=';
  formCompany = new FormGroup({
    token: new FormControl(localStorage.getItem(this.tokenId)),
    ruc: new FormControl(''),
    razon: new FormControl(''),
    eslogan: new FormControl(''),
    logo: new FormControl(''),
    direccion: new FormControl(''),
    email: new FormControl(''),
    telefono: new FormControl('')
  });

  public registerCompany(form: any) {
    this.loginServices.updateCompany(form).subscribe(
      (response: any) => {
        console.log(response);
        if (response.status == 'Error') {
          this.estado = true;
          this.resp = response.resp;
        } else {
          this.estado = false;
        }
      }
    );
  }

}

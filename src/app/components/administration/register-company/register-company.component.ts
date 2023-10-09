import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CompanyModel } from 'src/app/model/company.model';
import { PersonModel } from 'src/app/model/person.model';
import { StoreModel } from 'src/app/model/store.model';
import { UserModel } from 'src/app/model/user.model';
import { RegisterCompanyService } from 'src/app/services/administration/register-company/register-company.service';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css'],
})
export class RegisterCompanyComponent {
  id_rol:number = 2;
  person: PersonModel = {
    id_persona: 0,
    ci_ruc: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    email: '',
    direccion: '',
  };
  company: CompanyModel = {
    id_empresa: 0,
    id_persona: 0,
    ruc: '',
    razon: '',
    slogan: '',
    logo: '',
  };
  store: StoreModel = {
    id_almacen: 0,
    id_empresa: 0,
    nombre: '',
    direccion: '',
    telefono: '',
  };
  user: UserModel = {
    id_usuario: 0,
    id_almacen: 0,
    id_persona: 0,
    id_rol: 0,
    usuario: '',
    password: ''
  }
  constructor(private registerCompanyService: RegisterCompanyService) { }

  ngOnInit(): void { }

  public postCreateCompany() {
    this.registerCompanyService
      .postCreateCompany({
        CI_RUC: this.person.ci_ruc,
        NOMBRES: this.person.nombres,
        APELLIDOS: this.person.apellidos,
        TELEFONO: this.person.telefono,
        EMAIL: this.person.email,
        DIRECCION: this.person.direccion,
        RUC: this.company.ruc,
        RAZON: this.company.razon,
        SLOGAN: this.company.slogan,
        LOGO: this.company.logo,
        NOMBREA: this.company.razon,
        DIRECCIONA: this.store.direccion,
        TELEFONOA: this.store.telefono,
        ID_ROL: this.id_rol,
        USUARIO: this.user.usuario,
        PASSWORD: this.user.password
      })
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error('Error en la solicitud POST', error);
        }
      );
  }
}

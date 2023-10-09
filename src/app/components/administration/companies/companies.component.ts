import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/authentication/login.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  // datos = [
  //   { id: 1, nombre: 'Juan', edad: 30 },
  //   { id: 2, nombre: 'Ana', edad: 25 },
  //   { id: 3, nombre: 'Pedro', edad: 35 },
  //   // ...
  // ];
  empresas: any = [];

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.getCompanies(22);
  }

  getCompanies(id_usuario: number) {
    this.loginService.getCompaniesByUser(id_usuario).subscribe(
      (response: any) => {
        this.empresas = response;
        console.log(response);
      },
      (error) => {
        console.error('Error en la solicitud POST', error);
      });
  }

  // sortData(sort: Sort) {
  //   const data = this.datos.slice(); // Clona el arreglo de datos
  //   if (!sort.active || sort.direction === '') {
  //     this.datos = data;
  //     return;
  //   }

  //   this.datos = data.sort((a, b) => {
  //     const isAsc = sort.direction === 'asc';
  //     switch (sort.active) {
  //       case 'id':
  //         return this.compare(a.id, b.id, isAsc);
  //       case 'nombre':
  //         return this.compare(a.nombre, b.nombre, isAsc);
  //       case 'edad':
  //         return this.compare(a.edad, b.edad, isAsc);
  //       default:
  //         return 0;
  //     }
  //   });
  // }

  // private compare(a: number | string, b: number | string, isAsc: boolean) {
  //   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  // }
}

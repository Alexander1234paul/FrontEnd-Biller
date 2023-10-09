import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModelClientsI } from 'src/app/models/clients/clients.model';
import { ClientsService } from 'src/app/services/clients/clients.service';
import Swal from 'sweetalert2';
import { AlertService } from 'src/app/services/alert/alert.service';
import { SuppliersService } from 'src/app/services/suppliers/suppliers.service';
import { MainSuppliersComponent } from '../main-suppliers/main-suppliers.component';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css'],
})
export class SuppliersComponent {
  ngOnInit(): void {}
  constructor(
    private supplierServis: SuppliersService,
    private router: Router,
    private mainSupplier: MainSuppliersComponent,
    private alertServices: AlertService
  ) {}
  formSupplier = new FormGroup({
    ruc: new FormControl(''),
    razon_social: new FormControl(''),
    telefono: new FormControl(''),
    email: new FormControl(''), // Corregido el nombre
    direccion: new FormControl(''),
    idEmpresa: new FormControl(1),
  });

  createSupplier(form: any) {
    this.supplierServis.createSupplier(form).subscribe(
      (data: any) => {
        if (data.status == 'ok') {
          this.alertServices.showAlertOk(data.message);

          this.router.navigateByUrl('dashboard/mainSuppliers');
          this.mainSupplier.getAllSuppliers();
        } else if (data.status == 'info') {
          this.alertServices.showAlertInfo(data.message);
        } else if (data.status == 'error') {
          this.alertServices.showAlertError(data.message);
        }
      },
      (error) => {
        this.alertServices.showAlertError(error);
      }
    );

    console.log(form);
  }

  filtrarClientsExist(event: any) {
    const ci_ruc = (event.target as HTMLInputElement).value;
    console.log(ci_ruc.length);
    // if (ci_ruc.length == 10 || ci_ruc.length == 13) {
    //   this.clientsService.verifyClient(ci_ruc).subscribe(
    //     (data: any) => {
    //       if (data.status == 'info') {
    //         this.alertServices.showAlertInfo(data.message);
    //       } else if (data.status == 'ok') {
    //         console.log(data.persona.nombres);
    //         this.formClient.setValue({
    //           ci_ruc: data.persona.ci_ruc,
    //           nombres: data.persona.nombres,
    //           apellidos: data.persona.apellidos,
    //           telefono: data.persona.telefono,
    //           email: data.persona.email, // Corregido el nombre
    //           direccion: data.persona.direccion,
    //           idEmpresa: 1,
    //         });
    //       }
    //     },
    //     (error) => {
    //       console.error('Error al verificar el cliente:', error);
    //     }
    //   );
    // } else if (ci_ruc.length == 0) {
    //   this.formClient.reset();
    // }
  }
}

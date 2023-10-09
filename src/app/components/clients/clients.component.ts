import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModelClientsI } from 'src/app/models/clients/clients.model';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { MainClientsComponent } from './main-clients/main-clients.component';
import Swal from 'sweetalert2';
import { AlertService } from 'src/app/services/alert/alert.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent {
  constructor(
    private clientsService: ClientsService,
    private router: Router,
    private mainClients: MainClientsComponent,
    private alertServices: AlertService
  ) {}

  ngOnInit(): void {}

  formClient = new FormGroup({
    ci_ruc: new FormControl(''),
    nombres: new FormControl(''),
    apellidos: new FormControl(''),
    telefono: new FormControl(''),
    email: new FormControl(''), // Corregido el nombre
    direccion: new FormControl(''),
    id_persona: new FormControl(null),
  });

  // Método para crear un nuevo cliente
  createClient(form: any) {
    this.clientsService
      .createClient(
        this.formClient.value,
        localStorage.getItem(environment.token)
      )
      .subscribe(
        (data: any) => {
          if (data.status == 'ok') {
            this.alertServices.showAlertOk(data.message);

            this.router.navigateByUrl('dashboard/mainClients');
            this.mainClients.getAllClients();
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
    if (ci_ruc.length == 10 || ci_ruc.length == 13) {
      this.clientsService
        .verifyClient(ci_ruc, localStorage.getItem(environment.token))
        .subscribe(
          (data: any) => {
            if (data.status == 'info') {
              this.alertServices.showAlertInfo(data.message);
            } else if (data.status == 'ok') {
              this.formClient.setValue({
                ci_ruc: data.persona.ci_ruc,
                nombres: data.persona.nombres,
                apellidos: data.persona.apellidos,
                telefono: data.persona.telefono,
                email: data.persona.email, // Corregido el nombre
                direccion: data.persona.direccion,
                id_persona: data.persona.id_persona,
              });
            } else if (data.status == 'error') {
              this.formClient.reset();
            }
          },
          (error) => {
            console.error('Error al verificar el cliente:', error);
          }
        );
    } else if (ci_ruc.length == 0) {
      this.formClient.reset();
    }
  }
}

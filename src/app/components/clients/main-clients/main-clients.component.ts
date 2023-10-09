import { TemplateLiteral } from '@angular/compiler';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ModelClientsI } from 'src/app/models/clients/clients.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-clients',
  templateUrl: './main-clients.component.html',
  styleUrls: ['./main-clients.component.css'],
})
export class MainClientsComponent {
  listClients: ModelClientsI[] = [];
  private matDialogRef!: MatDialogRef<any>;

  constructor(
    private clientsService: ClientsService,
    private alertServices: AlertService,
    private modalService: ModalService,
    private router: Router
  ) {}
  formClient = new FormGroup({
    ci_ruc: new FormControl('', Validators.required),
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    telefono: new FormControl(''),
    email: new FormControl(''), // Corregido el nombre
    direccion: new FormControl(''),
    id_persona: new FormControl(null),
  });
  formClientedit = new FormGroup({
    id_persona: new FormControl(''),
    ci_ruc: new FormControl('', Validators.required),
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    telefono: new FormControl(''),
    email: new FormControl(''), // Corregido el nombre
    direccion: new FormControl(''),
    idEmpresa: new FormControl(1),
  });

  // Start of application
  ngOnInit(): void {
    this.getAllClients();
  }

  getAllClients() {
    this.clientsService
      .getAllClients(localStorage.getItem(environment.token))
      .subscribe(
        (listClients: any) => {
          this.listClients = listClients;
        }
        // (error) => console.log(error)
      );
  }
  createClient(form: any) {
    if (!this.formClient.valid) {
      this.alertServices.showAlertInfo('Llene todos los campos obligatorios');
    } else {
      this.clientsService
        .createClient(
          this.formClient.value,
          localStorage.getItem(environment.token)
        )
        .subscribe(
          (data: any) => {
            if (data.status == 'ok') {
              this.alertServices.showAlertOk(data.message);
              this.getAllClients();
              this.formClient.reset();
            } else if (data.status == 'info') {
              this.alertServices.showAlertInfo(data.message);
            } else if (data.status == 'error') {
              this.alertServices.showAlertError(data.message);
              this.formClient.reset();
            }
          },
          (error) => {
            this.alertServices.showAlertError(error);
          }
        );
    }
  }

  filtrarclients(event: any) {
    const texto = (event.target as HTMLInputElement).value;

    this.clientsService
      .getClientByQuery(localStorage.getItem(environment.token), texto)
      .subscribe((respClients: any) => {
        if (respClients.status == 'ok') {
          this.listClients = respClients.message;
          console.log(this.listClients);
        } else if (respClients.status == 'error') {
          this.getAllClients();
        }
      });
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
              this.formClient.reset();
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
              this.formClient.patchValue({
                apellidos: '',
                direccion: '',
                email: '',
                id_persona: null,
                nombres: '',
                telefono: '',
              });
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
  deleteClient(id_cliente: any) {
    console.log(id_cliente);
    this.alertServices
      .showConfirmationDialog('¿Está seguro que desea eliminar el cliente?')
      .then((confirmed) => {
        if (confirmed) {
          this.clientsService
            .deleteClient(id_cliente)
            .subscribe((data: any) => {
              if (data.status == 'ok') {
                this.alertServices.showAlertOk(data.message);
                this.getAllClients();
              } else if (data.status == 'error') {
                this.alertServices.showAlertError(data.message);
              }
            });
        }
      });
  }

  getDataCitByIdPersona(id_persona: any) {
    this.clientsService.getClientById(id_persona).subscribe((data: any) => {
      console.log(data);
      // this.getAllClients();
      this.formClientedit.setValue({
        id_persona: data.id_persona,
        ci_ruc: data.ci_ruc,
        nombres: data.nombres,
        apellidos: data.apellidos,
        telefono: data.telefono,
        email: data.email,
        direccion: data.direccion,
        idEmpresa: 1,
      });
    });
  }

  updateClient(form: any) {
    this.clientsService
      .updateClient(this.formClientedit.value)
      .subscribe((data: any) => {
        if (data.status == 'ok') {
          this.alertServices.showAlertOk(data.message);

          this.getAllClients();
        } else if (data.status == 'info') {
          this.alertServices.showAlertInfo(data.message);
        } else if (data.status == 'error') {
          this.alertServices.showAlertError(data.message);
        }
      });
  }
}

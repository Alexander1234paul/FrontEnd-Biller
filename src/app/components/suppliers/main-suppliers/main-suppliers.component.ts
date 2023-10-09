import { Component } from '@angular/core';
import { ModelSupplierI } from 'src/app/models/suppliers/suppliers.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { SuppliersService } from 'src/app/services/suppliers/suppliers.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-main-suppliers',
  templateUrl: './main-suppliers.component.html',
  styleUrls: ['./main-suppliers.component.css'],
})
export class MainSuppliersComponent {
  listSuppliers: ModelSupplierI[] = [];
  constructor(
    private supplierService: SuppliersService,
    private alertServices: AlertService
  ) {}

  ngOnInit(): void {
    this.getAllSuppliers();
  }

  getAllSuppliers() {
    this.supplierService
      .getAllSuppliers(localStorage.getItem(environment.token))
      .subscribe((listSuppliers: any) => {
        this.listSuppliers = listSuppliers;
        console.log(this.listSuppliers);
      });
  }
  deleteSupplier(id_supplier: any) {
    this.alertServices
      .showConfirmationDialog('¿Está seguro que desea eliminar el proveedor?')
      .then((confirmed) => {
        if (confirmed) {
          this.supplierService
            .deleteSupplier(id_supplier)
            .subscribe((data: any) => {
              if (data.status == 'ok') {
                this.alertServices.showAlertOk(data.message);
                this.getAllSuppliers();
              } else if (data.status == 'error') {
                this.alertServices.showAlertError(data.message);
              }
            });
        }
      });
  }
  filtrarSupplier(event: any) {
    const texto = (event.target as HTMLInputElement).value;
    console.log(texto);

    this.supplierService
      .getSupplierByQuery(localStorage.getItem(environment.token), texto)
      .subscribe(
        (listSuppliers: any) => {
          this.listSuppliers = listSuppliers;
          console.log(this.listSuppliers);
        }
        // (error) => console.log(error)
      );
  }
}

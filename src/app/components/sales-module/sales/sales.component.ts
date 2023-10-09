import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SaleModel } from 'src/app/model/sale.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { SaleService } from 'src/app/services/sale/sale.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
})
export class SalesComponent implements OnInit {
  listSales: SaleModel[] = [];

  constructor(
    private saleService: SaleService,
    private alertServices: AlertService
  ) {}

  ngOnInit(): void {
    this.getAllSales();
  }

  getAllSales() {
    this.saleService
      .getAllSales(localStorage.getItem('?(t+ERL5l9!='))
      .subscribe(
        (categories: any) => {
          this.listSales = categories;
          console.log(this.listSales);
        },
        (error) => {
          // console.error('Error en la solicitud POST', error);
          this.alertServices.showAlertError(error);
        }
      );
  }
  deleteSale(id_venta: any) {
    this.alertServices
      .showConfirmationDialog('¿Está seguro que desea eliminar esta venta?')
      .then((confirmed) => {
        if (confirmed) {
          this.saleService
            .deleteSale(localStorage.getItem('?(t+ERL5l9!='), id_venta)
            .subscribe(
              (data: any) => {
                if (data.status == 'ok') {
                  this.alertServices.showAlertOk(data.message);
                  this.getAllSales();
                } else if (data.status == 'error') {
                  this.alertServices.showAlertError(data.message);
                }
              },
              (error) => {
                this.alertServices.showAlertError(error);
              }
            );
        }
      });
  }

  filterSales(event: any) {
    const texto = (event.target as HTMLInputElement).value;

    this.saleService
      .getSaleByQuery(localStorage.getItem('?(t+ERL5l9!='), texto)
      .subscribe(
        (sales: any) => {
          this.listSales = sales;
          console.log(this.listSales);
        },
        (error) => {
          console.error('Error en la solicitud POST', error);
          this.alertServices.showAlertError(error.message);
        }
      );
  }
}

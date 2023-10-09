import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { InventoryService } from 'src/app/services/inventory/inventory.service';
import { CategoryModel } from 'src/app/model/category.model';
import { ModelSupplierI } from 'src/app/models/suppliers/suppliers.model';
import { UnitMeasurement } from 'src/app/model/unitmeasurement.model';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.css'],
})
export class RegisterProductComponent implements OnInit {
  listCategories: CategoryModel[] = [];
  mostrarDiv: boolean = false;
  listUnitsMeasure: UnitMeasurement[] = [];
  listUnitConversions: ModelSupplierI[] = [];

  constructor(
    private productService: InventoryService,
    private alertServices: AlertService
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllUnitsMeasurement();
  }

  onSupplierEvent(event: any) {
    const searchText = event.target.value;
    // Puedes agregar aquí cualquier otra lógica que necesites
  }

  formProduct = new FormGroup({
    id_categoria: new FormControl(0),
    id_unidad_medida: new FormControl(''), // <--- Este atributo se agrego solo para evitar problemas
    codigo: new FormControl(''),
    barras: new FormControl(''),
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    id_conversion: new FormControl(0),
    precio1: new FormControl(),
    precio2: new FormControl(),
    precio3: new FormControl(),
  });

  formCategory = new FormGroup({
    tbl_id_categoria: new FormControl(''),
    descripcion: new FormControl(''),
  });

  getAllCategories() {
    this.productService.getAllUnitsMeasurement().subscribe(
      (unitsMeasurements: any) => {
        this.listUnitsMeasure = unitsMeasurements;
        console.log(this.listUnitsMeasure);
      },
      (error) => {
        // console.error('Error en la solicitud POST', error);
        this.alertServices.showAlertError(error);
      }
    );
  }

  selectedUnitMeasurement: any;
  getConversions(event: any) {
    this.productService
      .getConversionsByIdUnitMeasurement(this.selectedUnitMeasurement)
      .subscribe(
        (unitsMeasurements: any) => {
          this.listUnitConversions = unitsMeasurements;
          console.log(this.listUnitConversions);
        },
        (error) => {
          // console.error('Error en la solicitud POST', error);
          this.alertServices.showAlertError(error);
        }
      );
  }

  selectedConversion: any;

  selectedCategory: undefined;
  onCategorySearch(event: any) {
    const searchText = event.target.value;
    console.log('Texto de búsqueda:', searchText, this.selectedCategory);
    // Puedes agregar aquí cualquier otra lógica que necesites
  }

  getAllUnitsMeasurement() {
    this.productService
      .getAllCategories(localStorage.getItem('?(t+ERL5l9!='))
      .subscribe(
        (categories: any) => {
          this.listCategories = categories;
          console.log(this.listCategories);
        },
        (error) => {
          // console.error('Error en la solicitud POST', error);
          this.alertServices.showAlertError(error);
        }
      );
  }

  registerProduct(form: any) {
    this.productService
      .registerProduct(localStorage.getItem('?(t+ERL5l9!='), form)
      .subscribe(
        (data: any) => {
          if (data.status == 'ok') {
            this.alertServices.showAlertOk(data.message);
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
  }

  registerCategory(form: any) {
    this.productService
      .registerCategory(localStorage.getItem('?(t+ERL5l9!='), form)
      .subscribe(
        (data: any) => {
          if (data.status == 'ok') {
            this.alertServices.showAlertOk(data.message);
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
  }

  filterProducts(event: any) {
    const codigo = (event.target as HTMLInputElement).value;
    this.productService
      .getProductByCode(localStorage.getItem('?(t+ERL5l9!='), codigo)
      .subscribe(
        (data: any) => {
          if (data.status == 'info') {
            this.alertServices.showAlertInfo(data.message);
          } else if (data.status == 'ok') {
            console.log(data.persona.nombres);
            this.formProduct.setValue({
              id_categoria: data.product.id_producto,
              id_conversion: data.product.id_conversion,
              id_unidad_medida: '',
              codigo: data.product.codigo,
              barras: data.product.barras,
              nombre: data.product.nombre,
              descripcion: data.product.descripcion,
              precio1: data.product.precio1,
              precio2: data.product.precio2,
              precio3: data.product.precio3,
            });
          }
        },
        (error) => {
          console.error('Error al verificar el cliente:', error);
        }
      );
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryModel } from 'src/app/model/category.model';
import { ProductModel } from 'src/app/model/product.model';
import { UnitMeasurement } from 'src/app/model/unitmeasurement.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { InventoryService } from 'src/app/services/inventory/inventory.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  listProducts: ProductModel[] = [];
  listCategories: CategoryModel[] = [];
  listUnitsMeasure: UnitMeasurement[] = [];
  listUnitConversions: UnitMeasurement[] = [];

  selectedCategory: any;
  selectedConversion: any;
  mostrarDiv: boolean = false;

  constructor(
    private productService: InventoryService,
    private alertServices: AlertService
  ) {}

  formProduct = new FormGroup({
    id_producto: new FormControl(''),
    id_categoria: new FormControl(''),
    id_unidad_medida: new FormControl(''), // <--- Este atributo se agrego solo para evitar problemas
    codigo: new FormControl(''),
    barras: new FormControl(''),
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    id_conversion: new FormControl(''),
    precio1: new FormControl(''),
    precio2: new FormControl(''),
    precio3: new FormControl(''),
  });

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategoriesByCompany();
    this.getAllUnitsMeasurement();
  }

  getAllProducts() {
    this.productService
      .getAllProducts(localStorage.getItem('?(t+ERL5l9!='))
      .subscribe(
        (products: any) => {
          this.listProducts = products;
        },
        (error) => {
          // console.error('Error en la solicitud POST', error);
          this.alertServices.showAlertError(error);
        }
      );
  }

  getAllCategoriesByCompany() {
    this.productService
      .getAllCategories(localStorage.getItem(environment.token))
      .subscribe(
        (categories: any) => {
          this.listCategories = categories;
        },
        (error) => {
          // console.error('Error en la solicitud POST', error);
          this.alertServices.showAlertError(error);
        }
      );
  }

  getAllUnitsMeasurement() {
    this.productService.getAllUnitsMeasurement().subscribe(
      (unitsMeasurements: any) => {
        this.listUnitsMeasure = unitsMeasurements;
      },
      (error) => {
        // console.error('Error en la solicitud POST', error);
        this.alertServices.showAlertError(error);
      }
    );
  }

  deleteProduct(id_producto: any) {
    this.alertServices
      .showConfirmationDialog('¿Está seguro que desea eliminar este producto?')
      .then((confirmed) => {
        if (confirmed) {
          this.productService.deleteProduct(id_producto).subscribe(
            (data: any) => {
              if (data.status == 'ok') {
                this.alertServices.showAlertOk(data.message);
                this.getAllProducts();
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

  filterProducts(event: any) {
    const texto = (event.target as HTMLInputElement).value;

    this.productService
      .getProductByQuery(localStorage.getItem('?(t+ERL5l9!='), texto)
      .subscribe(
        (products: any) => {
          this.listProducts = products;
          console.log(this.listProducts);
        },
        (error) => {
          console.error('Error en la solicitud POST', error);
          this.alertServices.showAlertError(error.message);
        }
      );
  }

  getProductById(id_producto: number) {
    this.productService.getProductById(id_producto).subscribe((data: any) => {
      console.log(data);
      // this.getAllClients();
      this.formProduct.setValue({
        id_producto: data[0].id_producto,
        id_categoria: data[0].id_categoria,
        id_conversion: data[0].id_conversion,
        id_unidad_medida: data[0].id_unidad_medida,
        codigo: data[0].codigo,
        barras: data[0].barras,
        nombre: data[0].nombre,
        descripcion: data[0].descripcion,
        precio1: data[0].precio_1,
        precio2: data[0].precio_2,
        precio3: data[0].precio_3,
      });
    });
  }

  onCategorySearch(event: any) {
    const searchText = event.target.value;
    console.log('Texto de búsqueda:', searchText, this.selectedCategory);
    // Puedes agregar aquí cualquier otra lógica que necesites
  }

  onSupplierEvent(event: any) {
    const searchText = event.target.value;
    // Puedes agregar aquí cualquier otra lógica que necesites
  }

  getConversions(event: any) {
    this.productService
      .getConversionsByIdUnitMeasurement(event.value)
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

  updateProduct(form: any) {
    this.productService.updateProduct(form).subscribe((data: any) => {
      if (data.status == 'ok') {
        this.alertServices.showAlertOk(data.message);
        this.getAllProducts();
      } else if (data.status == 'info') {
        this.alertServices.showAlertInfo(data.message);
      } else if (data.status == 'error') {
        this.alertServices.showAlertError(data.message);
      }
    });
  }
}

import { Component, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModelSupplierI } from 'src/app/models/suppliers/suppliers.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { SuppliersService } from 'src/app/services/suppliers/suppliers.service';
import { SuppliersComponent } from '../../suppliers/suppliers/suppliers.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductModel } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product/product.service';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import { InventoryService } from 'src/app/services/inventory/inventory.service';
import { CategoryModel } from 'src/app/model/category.model';
import { ModelAuxProductI } from 'src/app/models/shopping/shopping.mode';
import { ShoppingService } from 'src/app/services/shopping/shopping.service';
import { ModelTaxesI } from 'src/app/models/freeTables/freeTables.model';
import { FreeTablesService } from 'src/app/services/freeTables/free-tables.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css'],
})
export class ShoppingComponent {
  listSuppliers: ModelSupplierI[] = [];
  listProducts: ProductModel[] = [];
  listCategories: CategoryModel[] = [];
  listAuxProduct: ModelAuxProductI[] = [];
  listTaxes: ModelTaxesI[] = [];

  selectedCity: undefined;
  selectedCategory: undefined;
  mostrarDiv: boolean = false;
  codigoAux: any;
  nombreAux: any;
  auxIva: any;
  auxValorIva: number | undefined;

  formSupplier = new FormGroup({
    ruc: new FormControl(''),
    razon_social: new FormControl(''),
    telefono: new FormControl(''),
    email: new FormControl(''), // Corregido el nombre
    direccion: new FormControl(''),
  });

  formProduct = new FormGroup({
    id_categoria: new FormControl(''),
    codigo: new FormControl(''),
    barras: new FormControl(''),
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
  });

  formCompra = new FormGroup({
    //CABECERA DE LA COMPRA
    id_proveedor: new FormControl(Validators.required),
    num_factura: new FormControl('', Validators.required),
    fecha: new FormControl(''),
    totalAll: new FormControl(0, Validators.required),
    subTotal: new FormControl(0, Validators.required),
    descuento: new FormControl(0, Validators.required),
    iva: new FormControl(0, Validators.required),
    // __________________
    listaProductos: new FormControl(),
  });

  formAuxProduct = new FormGroup({
    id_producto: new FormControl(0, Validators.required),
    codigo: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    cantidad: new FormControl(0, Validators.required),
    precio: new FormControl(0, Validators.required),
    total: new FormControl(),
  });

  constructor(
    private supplierService: SuppliersService,
    private router: Router,
    private alertServices: AlertService,
    private modalService: ModalService,
    private supplierServis: SuppliersService,
    private productService: InventoryService,
    private shoppingService: ShoppingService,
    private freeTablesService: FreeTablesService
  ) {}

  ngOnInit(): void {
    this.getAllSuppliers();
    this.getAllProducts();
    this.getAllCategories();
    this.getAllTaxes();
    this.auxValorIva = 0;
  }

  getAllSuppliers() {
    this.supplierService
      .getAllSuppliers(localStorage.getItem(environment.token))
      .subscribe((listSuppliers: any) => {
        this.listSuppliers = listSuppliers;
      });
  }

  getAllProducts() {
    this.productService
      .getAllProducts(localStorage.getItem(environment.token))
      .subscribe((listProducts: any) => {
        this.listProducts = listProducts;
      });
  }
  getAllTaxes() {
    this.freeTablesService.getAllTaxes().subscribe((listTaxes: any) => {
      this.listTaxes = listTaxes;
    });
  }

  onSupplierEvent(event: any) {
    const searchText = event.target.value;
    // Puedes agregar aquí cualquier otra lógica que necesites
  }

  onProductEvent(event: any) {
    const searchText = event.target.value;
    // Puedes agregar aquí cualquier otra lógica que necesites
  }

  createSupplier(form: any) {
    this.supplierServis.createSupplier(form).subscribe(
      (data: any) => {
        if (data.status == 'ok') {
          this.alertServices.showAlertOk(data.message);
          this.getAllSuppliers();
          this.formSupplier.reset();
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

  createCompra(form: any) {
    if (!this.formCompra.valid) {
      this.alertServices.showAlertInfo('LLene todos campos obligatorios');
    } else {
      this.shoppingService
        .createShopping(form.value, localStorage.getItem(environment.token))
        .subscribe((data: any) => {
          if (data.status == 'ok') {
            this.alertServices.showAlertOk(data.message);
            this.formCompra.reset();
            this.router.navigateByUrl('dashboard/mainShopping');
          } else if (data.status == 'info') {
            this.alertServices.showAlertInfo(data.message);
          } else if (data.status == 'error') {
            this.alertServices.showAlertError(data.message);
          }
        });
    }
  }

  getAllCategories() {
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

  onCategorySearch(event: any) {
    const searchText = event.target.value;
    // Puedes agregar aquí cualquier otra lógica que necesites
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
  selectProduct(formProduct: any) {
    this.formAuxProduct.patchValue({
      id_producto: formProduct.id_producto,
      codigo: formProduct.codigo,
      nombre: formProduct.nombre,
    });
    this.codigoAux = formProduct.codigo;
    this.nombreAux = formProduct.nombre;
  }

  sumaDetalleProducts() {
    console.log('haciedno suma detallae');

    let totalSum = 0;
    this.listAuxProduct.forEach((producto: any) => {
      totalSum += producto.total;
    });
    this.formCompra.patchValue({ subTotal: totalSum });
  }

  addProduct(formProduct: any) {
    if (!this.formAuxProduct.valid) {
      this.alertServices.showAlertError(
        'Para agregar debe seleccionar un producto'
      );
    } else {
      const productToAdd = formProduct.value; // Obtener el producto del formulario
      const productIndex = this.listAuxProduct.findIndex(
        (product) => product.id_producto === productToAdd.id_producto
      );
      console.log('productIndex:', productIndex);

      if (productIndex !== -1) {
        this.listAuxProduct[productIndex].precio = productToAdd.precio;
        this.listAuxProduct[productIndex].cantidad = productToAdd.cantidad;

        this.listAuxProduct[productIndex].total =
          productToAdd.precio * productToAdd.cantidad;
        this.formAuxProduct.reset();
        this.codigoAux = '';
        this.nombreAux = '';
      } else {
        // Si el producto no existe en la lista, calcula el total y agrégalo
        productToAdd.total = productToAdd.cantidad * productToAdd.precio;
        this.listAuxProduct.push(productToAdd);
        this.formAuxProduct.reset();
        this.codigoAux = '';
        this.nombreAux = '';
      }

      this.formCompra.patchValue({ listaProductos: this.listAuxProduct });
      this.sumaDetalleProducts(); // Calcular y mostrar la suma de los totales
      this.sumaTotal();
    }
  }
  onChangeIva(event: any) {
    const subTotalValue = this.formCompra.controls.subTotal.value;
    this.auxIva = event.value;
    if (subTotalValue !== null && event.value !== null) {
      // Convert event.value to a number and calculate 14% of it as the IVA
      let ivaS = (parseFloat(event.value) / 100) * subTotalValue;

      // Round the IVA value to two decimal places
      ivaS = parseFloat(ivaS.toFixed(2));
      this.auxValorIva = ivaS;
      this.formCompra.patchValue({
        iva: event.value,
      });
      this.sumaTotal();
      // Hacer algo con el valor del subtotal aquí
    } else {
      // Handle the case where subTotalValue or event.value is null
      console.error('subTotalValue or event.value is null');
    }
  }
  sumaTotal() {
    const subTotalValue = this.formCompra.controls.subTotal.value;
    const ivaValue = this.auxValorIva;
    const descuentoValue = this.formCompra.controls.descuento.value;

    let total = subTotalValue! + ivaValue!;
    total -= descuentoValue!;

    // Round the total value to two decimal places
    total = parseFloat(total.toFixed(2));
    this.formCompra.patchValue({
      totalAll: total,
    });
  }

  removeProduct(index: number) {
    if (index >= 0 && index < this.listAuxProduct.length) {
      this.listAuxProduct.splice(index, 1);
      this.sumaDetalleProducts(); // Elimina el elemento en el índice dado
      this.sumaTotal();
    }
  }
  keyupDescuento(event: any) {
    this.sumaTotal();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryModel } from 'src/app/model/category.model';
import { ProductModel } from 'src/app/model/product.model';
import { SaleDetailsDTOModel } from 'src/app/model/productdto.model';
import { ModelClientsI } from 'src/app/models/clients/clients.model';
import {
  ModelDocumentsI,
  ModelPaymentsI,
  ModelTaxesI,
} from 'src/app/models/freeTables/freeTables.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { FreeTablesService } from 'src/app/services/freeTables/free-tables.service';
import { InventoryService } from 'src/app/services/inventory/inventory.service';
import { SaleService } from 'src/app/services/sale/sale.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-register-sale',
  templateUrl: './register-sale.component.html',
  styleUrls: ['./register-sale.component.css'],
})
export class RegisterSaleComponent implements OnInit {
  listCategories: CategoryModel[] = [];
  listProducts: ProductModel[] = [];
  listClients: ModelClientsI[] = [];
  listTypesDocuments: ModelDocumentsI[] = [];
  listTypesPayments: ModelPaymentsI[] = [];
  listTaxes: ModelTaxesI[] = [];

  listSaleDetailsDTO: SaleDetailsDTOModel[] = [];

  client: ModelClientsI = {
    id_empresa: 0,
    id_cliente: 1,
    ci_ruc: '9999999999',
    nombres: 'Consumidor',
    apellidos: 'Final',
    telefono: '9999999999',
    email: '',
    direccion: '',
  };

  saleDetailDTO: SaleDetailsDTOModel = {
    id_producto: 0,
    codigo: '',
    nombre: '',
    cantidad: 0,
    precio_unitario: 0.0,
    precio_total: 0.0,
  };

  productSelected = {
    id_producto: 0,
    codigo: '',
    nombre: '',
    stock: 0,
    abreviatura: 'uni',
    precios: [
      {
        nombre: 'Precio 1: 0',
        valor: 0,
      },
      {
        nombre: 'Precio 2: 0',
        valor: 0,
      },
      {
        nombre: 'Precio 3: 0',
        valor: 0,
      },
    ],
  };

  //

  currentDate: string = '';
  selectedCategory: any;
  selectedTypeDocument: any;
  selectedTypePayment: any;
  selectedPrice: number = 0.0;

  query: string = '';
  auxIva: number = 0;
  auxValorIva: number = 0;
  suggestions: string[] = [];
  allSuggestions: string[] = [
    'Manzana',
    'Banana',
    'Cereza',
    'Durazno',
    'Kiwi',
    'Naranja',
  ];

  onCategorySearch(event: any) {
    const searchText = event.target.value;
    // Puedes agregar aquí cualquier otra lógica que necesites
  }

  search() {
    this.suggestions = this.allSuggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(this.query.toLowerCase())
    );
  }

  selectSuggestion(selectedSuggestion: any) {
    this.client = selectedSuggestion;
    this.suggestions = [];
  }

  constructor(
    private alertServices: AlertService,
    private productService: InventoryService,
    private clientService: ClientsService,
    private saleService: SaleService,
    private freeTablesService: FreeTablesService
  ) {}

  ngOnInit(): void {
    this.getSerieAndSequence();
    this.getAllTypesDocuments();
    this.getAllTypesPayments();
    this.getAllCategoriesByCompany();
    this.getAllProducts();
    this.getAllTaxes();

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    this.currentDate = `${year}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`;
  }

  formClient = new FormGroup({
    id_persona: new FormControl(0),
    ci_ruc: new FormControl(''),
    nombres: new FormControl(''),
    apellidos: new FormControl(''),
    telefono: new FormControl(''),
    email: new FormControl(''),
    direccion: new FormControl(''),
  });

  formProduct = new FormGroup({
    id_categoria: new FormControl(0),
    id_unidad_medida: new FormControl(0), // <--- Este atributo se agrego solo para evitar problemas
    codigo: new FormControl(''),
    barras: new FormControl(''),
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    id_conversion: new FormControl(0),
    precio1: new FormControl(),
    precio2: new FormControl(),
    precio3: new FormControl(),
  });

  formSale = new FormGroup({
    id_cliente: new FormControl(0),
    serie: new FormControl(''),
    secuencia: new FormControl(''),
    subtotal: new FormControl(0),
    total: new FormControl(0),
    iva: new FormControl(''),
    tipo_documento: new FormControl(''),
    tipo_pago: new FormControl(''),
    listaDetalleVenta: new FormControl(),
  });

  cantidadControl: FormControl = new FormControl(0);

  getSerieAndSequence() {
    this.saleService
      .getSerieAndSequenceOfCompany(localStorage.getItem(environment.token))
      .subscribe((serieandsequence: any) => {
        const serie = serieandsequence[0].nuevo_serie
          .toString()
          .padStart(3, '0');
        const secuencia = serieandsequence[0].nuevo_secuencia
          .toString()
          .padStart(8, '0');
        this.formSale.patchValue({ serie: serie });
        this.formSale.patchValue({ secuencia: secuencia });
      });
  }

  getAllTypesDocuments() {
    this.freeTablesService.getAllDocuments().subscribe((documents: any) => {
      this.listTypesDocuments = documents;
    });
  }

  getAllTypesPayments() {
    this.freeTablesService.getAllPayments().subscribe((payments: any) => {
      this.listTypesPayments = payments;
    });
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

  getAllProducts() {
    this.productService
      .getAllProducts(localStorage.getItem(environment.token))
      .subscribe((products: any) => {
        this.listProducts = products;
      });
  }

  getAllTaxes() {
    this.freeTablesService.getAllTaxes().subscribe((taxes: any) => {
      this.listTaxes = taxes;
    });
  }

  getClientByQuery(event: any) {
    const query = (event.target as HTMLInputElement).value;
    this.clientService
      .getClientByQuery(localStorage.getItem(environment.token), query)
      .subscribe((result: any) => {
        this.listClients = result.message;
      });
  }

  selectedCity: undefined;
  onProductEvent(event: any) {
    const searchText = event.target.value;
    console.log('Texto de búsqueda:', searchText, this.selectedCity);
    // Puedes agregar aquí cualquier otra lógica que necesites
  }

  onChangeIva(event: any) {
    // const subTotalValue = this.formSale.controls.subtotal.value;
    this.auxValorIva = Number(event.value);
    this.auxIva = event.value;
    this.sumaTotal();
    // if (subTotalValue !== null && event.value !== null) {
    //   // Convert event.value to a number and calculate 14% of it as the IVA
    //   let ivaS = (parseFloat(event.value) / 100) * subTotalValue;
    //   // Round the IVA value to two decimal places
    //   ivaS = parseFloat(ivaS.toFixed(2));
    //   this.auxValorIva = ivaS;
    //   this.formSale.patchValue({
    //     iva: event.value,
    //   });
    //   this.sumaTotal();
    //   // Hacer algo con el valor del subtotal aquí
    // } else {
    //   // Handle the case where subTotalValue or event.value is null
    //   console.error('subTotalValue or event.value is null');
    // }
  }

  selectProduct(formProduct: any) {
    this.productSelected = {
      id_producto: formProduct.id_producto,
      codigo: formProduct.codigo,
      nombre: formProduct.nombre,
      stock: formProduct.stock,
      abreviatura: formProduct.abreviatura,
      precios: [
        {
          nombre: 'Precio 1: ' + formProduct.precio_1,
          valor: formProduct.precio_1,
        },
        {
          nombre: 'Precio 2: ' + formProduct.precio_2,
          valor: formProduct.precio_2,
        },
        {
          nombre: 'Precio 3: ' + formProduct.precio_3,
          valor: formProduct.precio_3,
        },
      ],
    };
    this.selectedPrice = formProduct.precio_1;
  }

  selectPrice(event: any) {
    this.selectedPrice = event.value;
  }

  addProduct() {
    if (this.productSelected.id_producto === 0) {
      this.alertServices.showAlertError(
        'Para agregar debe seleccionar un producto'
      );
    } else {
      const saleDetailIndex = this.listSaleDetailsDTO.findIndex(
        (saleDetail) =>
          saleDetail.id_producto === this.productSelected.id_producto
      );
      if (saleDetailIndex !== -1) {
        this.listSaleDetailsDTO[saleDetailIndex].nombre =
          this.productSelected.nombre;
        this.listSaleDetailsDTO[saleDetailIndex].codigo =
          this.productSelected.codigo;
        this.listSaleDetailsDTO[saleDetailIndex].cantidad =
          this.cantidadControl.value;
        this.listSaleDetailsDTO[saleDetailIndex].precio_unitario = Number(
          this.selectedPrice
        );
        this.listSaleDetailsDTO[saleDetailIndex].precio_total =
          this.cantidadControl.value * Number(this.selectedPrice);
      } else {
        // Si el producto no existe en la lista, calcula el total y agrégalo
        this.saleDetailDTO.id_producto = this.productSelected.id_producto;
        this.saleDetailDTO.nombre = this.productSelected.nombre;
        this.saleDetailDTO.codigo = this.productSelected.codigo;
        this.saleDetailDTO.cantidad = this.cantidadControl.value;
        this.saleDetailDTO.precio_unitario = Number(this.selectedPrice);
        this.saleDetailDTO.precio_total =
          this.saleDetailDTO.cantidad * this.saleDetailDTO.precio_unitario;
        this.listSaleDetailsDTO.push(this.saleDetailDTO);
      }
      this.saleDetailDTO = {
        id_producto: 0,
        codigo: '',
        nombre: '',
        cantidad: 0,
        precio_unitario: 0.0,
        precio_total: 0.0,
      };
      this.productSelected = {
        id_producto: 0,
        codigo: '',
        nombre: '',
        stock: 0,
        abreviatura: 'uni',
        precios: [
          {
            nombre: 'Precio 1: 0',
            valor: 0,
          },
          {
            nombre: 'Precio 2: 0',
            valor: 0,
          },
          {
            nombre: 'Precio 3: 0',
            valor: 0,
          },
        ],
      };

      this.formSale.patchValue({ listaDetalleVenta: this.listSaleDetailsDTO });
      this.sumaDetalleProducts(); // Calcular y mostrar la suma de los totales
      this.sumaTotal();
    }
  }

  sumaDetalleProducts() {
    let totalSum = 0;
    this.listSaleDetailsDTO.forEach((producto: any) => {
      totalSum += producto.precio_total;
    });
    this.formSale.patchValue({ subtotal: totalSum });
  }

  sumaTotal() {
    const subTotalValue = this.formSale.controls.subtotal.value;
    const ivaValue = (Number(subTotalValue) * Number(this.auxIva)) / 100;

    this.auxValorIva = ivaValue;
    let total = subTotalValue! + ivaValue!;

    // Round the total value to two decimal places
    total = parseFloat(total.toFixed(2));
    this.formSale.patchValue({
      total: total,
    });
  }

  removeProduct(index: number) {
    if (index >= 0 && index < this.listSaleDetailsDTO.length) {
      this.listSaleDetailsDTO.splice(index, 1);
      this.sumaDetalleProducts(); // Elimina el elemento en el índice dado
      this.sumaTotal();
    }
  }

  mostrarDiv: boolean = false;
  registerSale(form: any) {
    form.id_cliente = this.client.id_cliente;
    // console.log('Valor de mostrarDiv:', form);
    this.saleService
      .registerSale(localStorage.getItem(environment.token), form)
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

  registerClient(form: any) {
    this.clientService
      .createClient(form, localStorage.getItem(environment.token))
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

  filtrarClientsExist(event: any) {
    const ci_ruc = (event.target as HTMLInputElement).value;
    if (ci_ruc.length == 10 || ci_ruc.length == 13) {
      this.clientService
        .verifyClient(ci_ruc, localStorage.getItem(environment.token))
        .subscribe(
          (data: any) => {
            if (data.status == 'info') {
              console.log('asdasd');

              console.log(this.formClient.value);
              console.log('asdasd');
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
              console.log('asdasdeee');

              console.log(this.formClient.value);
              console.log('asdasdeee');
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

  filterProducts(event: any) {
    const codigo = (event.target as HTMLInputElement).value;
    this.productService
      .getProductByCode(localStorage.getItem(environment.token), codigo)
      .subscribe(
        (data: any) => {
          if (data.status == 'info') {
            this.alertServices.showAlertInfo(data.message);
          } else if (data.status == 'ok') {
            this.formProduct.setValue({
              id_categoria: data.product.id_producto,
              id_conversion: data.product.id_conversion,
              id_unidad_medida: 0,
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
}

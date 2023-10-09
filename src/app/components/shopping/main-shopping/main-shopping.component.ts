import { Component, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogWithTemplateData } from 'src/app/models/modal/clients.model';
import { ModelShoppingI } from 'src/app/models/shopping/shopping.mode';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ShoppingService } from 'src/app/services/shopping/shopping.service';
import { environment } from 'src/environments/environment.prod';
// compra.model.ts

export interface DetalleCompra {
  cantidad: number;
  nombre: string;
  precioUnitario: number;
  sub_total: number;
  id_producto: number;
}

export interface Compra {
  id_compra: number;
  fecha: string;
  razon: string;
  num_factura: string;
  total: number;
  sub_total: string;
  descuento: string;
  iva: string;

  detalles: DetalleCompra[];
}

@Component({
  selector: 'app-main-shopping',
  templateUrl: './main-shopping.component.html',
  styleUrls: ['./main-shopping.component.css'],
})
export class MainShoppingComponent {
  listShops: ModelShoppingI[] = [];

  constructor(private shoppingService: ShoppingService) {}
  compra: Compra | null = null; // Utiliza el modelo 'Compra'

  ngOnInit(): void {
    this.getAllShops();
  }
  getAllShops() {
    this.shoppingService
      .getAllShops(localStorage.getItem(environment.token))
      .subscribe((listShops: any) => {
        this.listShops = listShops;
      });
  }
  getDetailShop(idCompra: any) {
    this.shoppingService
      .getAllShopsByIdShop(idCompra)
      .subscribe((data: any) => {
        // Asigna la respuesta de la API a la propiedad 'compra'
        this.compra = data;
      });
  }
}

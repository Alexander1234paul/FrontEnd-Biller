import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ShoppingComponent } from '../../shopping/shopping/shopping.component';
import { DialogWithTemplateData } from 'src/app/models/modal/clients.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogWithTemplateData) {}
}

import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/components/modal/modal/modal.component';
import { DialogWithTemplateData } from 'src/app/models/modal/clients.model';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private matDialog: MatDialog) {}

  openDialogCustom(): MatDialogRef<ModalComponent> {
    return this.matDialog.open(ModalComponent);
  }

  dialogWithTemplate(data: DialogWithTemplateData) {
    return this.matDialog.open(ModalComponent, { data });
  }
}

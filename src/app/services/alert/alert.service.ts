import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  showAlertOk(message: string) {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      // background: 'rgba(0, 0, 0, 0)', // Hacer el fondo transparente
      toast: true, // Mostrar como una notificación toast
      position: 'top-end', // Posición en la parte superior derecha
      timer: 2000,
    });
  }
  showAlertInfo(message: string) {
    Swal.fire({
      icon: 'info',
      title: 'Información',
      text: message,
    });
  }
  showAlertError(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
    });
  }
  async showConfirmationDialog(message: string): Promise<boolean> {
    const result = await Swal.fire({
      title: 'Confirmación',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
    });

    return result.isConfirmed;
  }
}

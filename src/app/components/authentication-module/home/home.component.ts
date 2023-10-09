import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  today: any;
  user: string = localStorage.getItem('username') ?? 'Nombre de Usuario';

  ngOnInit(): void {
    const date = new Date();

    this.today = date.toLocaleString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
}

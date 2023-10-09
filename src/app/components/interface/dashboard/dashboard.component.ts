import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  sideLinks = document.querySelectorAll('.sidebar .side-menu li a');
  menuBar = document.querySelector<HTMLElement>('.sidebar i .bx.bx-menu');
  sideBar = document.querySelector<HTMLElement>('.sidebar');
  searchBtn = document.querySelector<HTMLButtonElement>(
    '.content nav form .form-input button'
  );
  searchBtnIcon = document.querySelector<HTMLElement>(
    '.content nav form .form-input button .bx'
  );
  searchForm = document.querySelector<HTMLElement>('.content nav form');
  toggler = document.getElementById('theme-toggle') as HTMLInputElement;
  today: any;

  user: string = localStorage.getItem('username') ?? 'Nombre Usuario';

  constructor() {}

  ngOnInit(): void {
    const date = new Date();

    this.today = date.toLocaleString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  ngAfterViewInit(): void {
    this.sideLinks = document.querySelectorAll('.sidebar .side-menu li a');
    this.menuBar = document.querySelector<HTMLElement>('.sidebar .bx.bx-menu');
    this.sideBar = document.querySelector<HTMLElement>('.sidebar');
    this.searchBtn = document.querySelector<HTMLButtonElement>(
      '.content nav form .form-input button'
    );
    this.searchBtnIcon = document.querySelector<HTMLElement>(
      '.content nav form .form-input button .bx'
    );
    this.searchForm = document.querySelector<HTMLElement>('.content nav form');
    this.toggler = document.getElementById('theme-toggle') as HTMLInputElement;

    // console.log(this.menuBar);
    this.addEventListeners();
  }

  addEventListeners() {
    this.sideLinks.forEach((item) => {
      const li = item.parentElement as HTMLLIElement;
      item.addEventListener('click', () => {
        this.sideLinks.forEach((i) => {
          i.parentElement?.classList.remove('active');
        });
        li.classList.add('active');
      });
    });

    this.menuBar?.addEventListener('click', () => {
      this.sideBar?.classList.toggle('close');
    });

    this.searchBtn?.addEventListener('click', (e) => {
      if (window.innerWidth < 576) {
        e.preventDefault();
        this.searchForm?.classList.toggle('show');
        if (this.searchForm?.classList.contains('show')) {
          this.searchBtnIcon?.classList.replace('bx-search', 'bx-x');
        } else {
          this.searchBtnIcon?.classList.replace('bx-x', 'bx-search');
        }
      }
    });
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth < 768) {
      this.sideBar?.classList.add('close');
    } else {
      this.sideBar?.classList.remove('close');
    }
    if (window.innerWidth > 576) {
      this.searchBtnIcon?.classList.replace('bx-x', 'bx-search');
      this.searchForm?.classList.remove('show');
    }
  }

  onToggleTheme() {
    if (this.toggler.checked) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/node/services/usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  // @ViewChild('menu_items', { static: false }) menuMobile: ElementRef;

  toggle:boolean =true

  constructor(private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logOut() {
    this.usuarioService.logOut();
  }

  darkMode() {
    console.log('click');

    this.toggle=!this.toggle
    // this.menuMobile.nativeElement.classList.add('show');
    // const themeClass = document.querySelector('menu_items');
    // themeClass?.classList.toggle('show');
 }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/node/services/usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logOut() {
    this.usuarioService.logOut();
  }


}

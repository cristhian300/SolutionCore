import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-product-home',
  templateUrl: './list-product-home.component.html',
  styleUrls: ['./list-product-home.component.css']
})
export class ListProductHomeComponent implements OnInit {

  telefono:number = 961757466

  texto:string = "Hola me intereza este producto 🤩"
  url = encodeURI(`https://wa.me/${this.telefono}?text=${this.texto}`)

  constructor() { }

  ngOnInit(): void {
  }

}

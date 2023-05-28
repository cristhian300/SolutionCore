import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portada-motion',
  templateUrl: './portada-motion.component.html',
  styleUrls: ['./portada-motion.component.css']
})
export class PortadaMotionComponent implements OnInit {
  imagenes = [
    'assets/imagesMain/portada/oficina1.jpg',
    'assets/imagesMain/portada/oficina2.jpg',
    'assets/imagesMain/portada/oficina3.jpg',
    'assets/imagesMain/portada/oficina4.jpg',
    'assets/imagesMain/portada/programa8.jpg',
  ]
  constructor() { }

  ngOnInit(): void {
  }

}

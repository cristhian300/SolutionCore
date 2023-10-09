
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home-portada',


  templateUrl: './home-portada.component.html',
  styleUrls: ['./home-portada.component.css']
})
export class HomePortadaComponent implements OnInit {

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor( ) {
    console.log(this.images);

  }

  ngOnInit(): void {
  }


}

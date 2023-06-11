import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-carousel-portada',
  templateUrl: './carousel-portada.component.html',
  styleUrls: ['./carousel-portada.component.scss']
})
export class CarouselPortadaComponent implements OnInit, AfterViewInit {

  @ViewChild('carousel') carouselMain: ElementRef
  @ViewChildren('sliderSection') slideItems: QueryList<ElementRef>
  @ViewChildren('quadrate') quadrate: QueryList<ElementRef>


  imagenes = [
    'assets/imagesMain/portada/oficina1.jpg',
    'assets/imagesMain/portada/oficina2.jpg',
    'assets/imagesMain/portada/oficina3.jpg',
    'assets/imagesMain/portada/oficina4.jpg',
    'assets/imagesMain/portada/programa8.jpg',
  ]
  carousel: HTMLElement;
  posInitial: number = 100
  censor: boolean;
  index: number = 0;
  slidesLenght: number = 0;
  slideSize: number;
  itemPerPertage: number
  carouselChildCount: number;
  constructor() { }

  ngAfterViewInit(): void {


    this.carousel = this.carouselMain.nativeElement
    this.carousel.style.left = - this.posInitial + "%"
    this.slidesLenght = this.slideItems.length
    this.slideSize = (this.slideItems.first.nativeElement as HTMLElement).offsetWidth

    const cloneFirst = (this.slideItems.first.nativeElement as HTMLElement).cloneNode(true)
    const clonelast = (this.slideItems.last.nativeElement as HTMLElement).cloneNode(true)

    this.carousel.appendChild(cloneFirst)
    this.carousel.insertBefore(clonelast, this.slideItems.first.nativeElement)

    this.carouselChildCount = this.carousel.childElementCount

    // make responsive to viewport changes
    // window.addEventListener('resize', this.setPositionByIndex)
  }

  ngOnInit(): void {

  }


  moveRight(action =null) {
    this.carousel.classList.add('shifting');
    //condicion para touch
    if (!action) {
      this.posInitial = this.carousel.offsetLeft;
    }

    this.index++;
    if (this.index == this.slidesLenght) {
      // this.carousel.style.left = -(1 * this.slideSize) + "px";
      this.carousel.style.left = (-100) + "%";
      this.index = 0;
    }
    else {
      // this.carousel.style.left = (this.posInitial - this.slideSize) + "px";
      this.carousel.style.left = (this.converPerPercentaje(this.posInitial) - (100 )) + "%";

      console.log('');

    }
    this.carousel.classList.remove('shifting');
    this.censor = true;
  }


  converPerPercentaje(slideAdvanced: number) {
    // slideAdvanced : this.carousel.offsetLeft
    return (slideAdvanced / this.carousel.offsetWidth) * 100 * this.carouselChildCount
  }

}

import { AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';

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
  posInitial: number
  censor: boolean = true;
  index: number = 0;
  slidesLenght: number = 0;
  slideSize: number;
  itemPerPertage: number
  carouselChildCount: number;

  posX1 = 0
  dragging: boolean;
  pointElement: Element;
  posX2: number;
  posFinal: number;
  operacion: number;
  constructor(private renderer: Renderer2) { }

  ngAfterViewInit(): void {


    this.carousel = this.carouselMain.nativeElement
    this.carousel.style.left = -100 + "%"
    this.posInitial = this.carousel.offsetLeft
    this.slidesLenght = this.slideItems.length
    this.slideSize = (this.slideItems.first.nativeElement as HTMLElement).offsetWidth

    const cloneFirst = (this.slideItems.first.nativeElement as HTMLElement).cloneNode(true)
    const clonelast = (this.slideItems.last.nativeElement as HTMLElement).cloneNode(true)

    this.carousel.appendChild(cloneFirst)
    this.carousel.insertBefore(clonelast, this.slideItems.first.nativeElement)

    this.carouselChildCount = this.carousel.childElementCount


    this.renderer.listen(this.carousel, 'mousedown', this.dragStart)
    this.renderer.listen(this.carousel, 'mousemove', this.dragAction)
    this.renderer.listen(this.carousel, 'mouseup', this.dragEnd)
    this.renderer.listen(this.carousel, 'mouseleave', this.dragLeave)


    // Touch events
    this.carousel.addEventListener('touchstart', this.dragStart);
    this.carousel.addEventListener('touchmove', this.dragAction);
    this.carousel.addEventListener('touchend', this.dragEnd);
    this.sliderSelected()
  }

  ngOnInit(): void {

  }

  sliderSelected() {

    this.quadrate.forEach((item, index) => {
      this.renderer.listen(item.nativeElement, 'click', () => {
        this.operacion = (index + 1) * 100


        this.carousel.style.left = -this.operacion + "%";
        this.index = index

        this.quadrate.forEach((item, index) => {
          this.renderer.removeClass(item.nativeElement, 'active')
        })

        this.renderer.addClass(item.nativeElement, 'active')

      })
    })
  }


  dragStart = (e) => {
    e.preventDefault();
    this.posInitial = this.carousel.offsetLeft;
    this.posX1 = this.getPosicionX(e)
    this.dragging = true
    this.pointElement = document.elementFromPoint(this.getPosicionX(e),
      this.getPosicionY(e));
  }

  getPosicionX = (e: any) => {
    return e.type.includes('mouse') ? e.clientX : e.touches[0].clientX
  }
  getPosicionY = (e: any) => {
    return e.type.includes('mouse') ? e.clientY : e.touches[0].clientY
  }

  dragAction = (e) => {
    if (this.dragging) {
      this.censor = false
      // e = e || window.event;
      this.posX2 = this.posX1 - this.getPosicionX(e)
      this.posX1 = this.getPosicionX(e)
      // this.carousel.style.left =
      //   (this.carousel.offsetLeft - this.posX2) + "px";
      this.carousel.style.left =
        this.converPerPercentage(this.carousel.offsetLeft - this.posX2) + "%";

    }

    if (this.pointElement !== document.elementFromPoint(this.getPosicionX(e), this.getPosicionY(e))) {
      console.log('salio del bloque');
      if (e.type.includes('touch')) {
        // this.carousel.style.left = (this.posInitial) + "px";
        this.carousel.style.left = this.converPerPercentage(this.posInitial) + "%";
      }
    }
  }

  dragEnd = (e) => {
    // e = e || window.event;
    this.dragging = false
    this.posFinal = this.carousel.offsetLeft;

    // if (this.posFinal - this.posInitial < -100)
    if (this.touchMovePerPercetage(this.posFinal - this.posInitial)< -5)
     {
      // console.log('advance', this.touchMovePerPercetage(this.posFinal - this.posInitial));

      this.moveRight('drag')
    // } else if (this.posFinal - this.posInitial > 100) {
    } else if (this.touchMovePerPercetage(this.posFinal - this.posInitial)> 5) {
    //  console.log('preview', this.touchMovePerPercetage(this.posFinal - this.posInitial));


      this.moveLeft('drag')
    } else {
      // this.carousel.style.left = (this.posInitial) + "px";
      this.carousel.style.left = this.converPerPercentage(this.posInitial) + "%";
    }
  }


  moveRight(action = null) {
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
      this.focusQuadrate(this.index)
    }
    else {
      // this.carousel.style.left = (this.posInitial - this.slideSize) + "px";
      this.carousel.style.left = (this.converPerPercentage(this.posInitial) - (100)) + "%";
      this.focusQuadrate(this.index)
    }
    this.carousel.classList.remove('shifting');
    this.censor = true;
  }

  dragLeave = () => {

    if (!this.censor) {
      // this.carousel.style.left = (this.posInitial) + "px";
      this.carousel.style.left = this.converPerPercentage(this.posInitial) + "%";
    }
    this.dragging = false
  }


  moveLeft(action = null) {
    this.carousel.classList.add('shifting');
    if (!action) {
      this.posInitial = this.carousel.offsetLeft;
    }
    this.index--;
    if (this.index == -1) {
      // this.carousel.style.left = -(this.slidesLenght * this.slideSize) + "px";
      this.carousel.style.left = -(this.slidesLenght * 100) + "%";
      this.index = this.slidesLenght - 1;
      this.focusQuadrate(this.index)
    }
    else {
      // this.carousel.style.left = (this.posInitial + this.slideSize) + "px";
      this.carousel.style.left = (this.converPerPercentage(this.posInitial) + 100) + "%";
      this.focusQuadrate(this.index)
    }
    this.carousel.classList.remove('shifting');
    this.censor = true;
  }

  converPerPercentage(slideAdvanced: number) {
    // slideAdvanced : this.carousel.offsetLeft
    return (slideAdvanced / this.carousel.offsetWidth) * 100 * this.carouselChildCount
  }

  focusQuadrate(counter: number) {
    this.quadrate.forEach((item, index) => {
      this.renderer.removeClass(item.nativeElement, 'active')
    })
    this.renderer.addClass(this.quadrate.get(counter).nativeElement, 'active')
  }


  touchMovePerPercetage(touchMove: number) {
    return (touchMove / this.slideSize) * 100
  }
}

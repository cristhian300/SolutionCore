import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Console } from 'console';

@Component({
  selector: 'app-carousel-portada',
  templateUrl: './carousel-portada.component.html',
  styleUrls: ['./carousel-portada.component.scss']
})
export class CarouselPortadaComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('carousel') carouselMain: ElementRef
  @ViewChildren('sliderSection') slideItems: QueryList<ElementRef>
  @ViewChildren('quadrate') quadrate: QueryList<ElementRef>
  @ViewChild('btnLeft') btnLeft: ElementRef
  @ViewChild('containerCarousel') containerCarousel: ElementRef

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
  constainerMain: HTMLElement
  interval: NodeJS.Timeout;


  listenerFnTouchStart = () => { };
  listenerFnTouchMove = () => { };
  listenerFnTouchEnd = () => { };

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
    this.constainerMain = this.containerCarousel.nativeElement

    // this.renderer.listen(this.carousel, 'mousedown', this.dragStart)
    this.renderer.listen(this.constainerMain, 'mousedown', this.dragStart)
    this.renderer.listen(this.constainerMain, 'mousemove', this.dragAction)
    this.renderer.listen(this.constainerMain, 'mouseup', this.dragEnd)
    this.renderer.listen(this.constainerMain, 'mouseleave', this.dragLeave)
    this.renderer.listen(this.constainerMain, 'mouseenter', this.deleteInterval)

    // Touch events
    this.listenerFnTouchStart = this.renderer.listen(this.constainerMain, 'touchstart', this.dragStart)
    this.listenerFnTouchMove = this.renderer.listen(this.constainerMain, 'touchmove', this.dragAction)
    this.listenerFnTouchEnd = this.renderer.listen(this.constainerMain, 'touchend', this.dragEnd)
    this.sliderSelected()
  }


  // @HostListener('touchstart', ['$event.taget'])
  // onTouchStart(event: HTMLElement) {
  //   // if (event.classList.contains('container-carousel')) {
  //       // }
  // }



  // @HostListener('mousedown', ['$event']) onMouseDown(e: any) {
  //   this.dragStart(e)
  //   if ($event.classList.contains('quadrate')) {

  //     console.log('cuadrate');

  //     // this.cerrarSideBar()
  //   }
  // }

  // @HostListener('mousemove', ['$event']) onMouseMove(e: any) {
  //   this.dragAction(e)
  // }

  // @HostListener('touchstart', ['$event']) onTouchStart(e: any) {
  //   this.dragStart(e)
  // }

  ngOnInit(): void {
    this.startInterval()
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval)
    }

    this.listenerFnTouchStart()
    this.listenerFnTouchMove()
    this.listenerFnTouchEnd()
  }



  dragStart = (e) => {

    if (this.constainerMain.contains(e.target)) {
      this.deleteInterval()
      if (e.type.includes('mouse')) {
        e.preventDefault();
      }
      this.posInitial = this.carousel.offsetLeft;
      this.posX1 = this.getPosicionX(e)
      this.dragging = true
    }
    else {
      if (e.type.includes('touch')) {
        this.startInterval()
      }
    }
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
      this.posX2 = this.posX1 - this.getPosicionX(e)
      this.posX1 = this.getPosicionX(e)
      this.carousel.style.left =
        this.converPerPercentage(this.carousel.offsetLeft - this.posX2) + "%";
    }

  }

  dragEnd = (e) => {
    this.dragging = false
    this.posFinal = this.carousel.offsetLeft;
    if (this.touchMovePerPercetage(this.posFinal - this.posInitial) < -5) {
      this.moveRight('drag')

    } else if (this.touchMovePerPercetage(this.posFinal - this.posInitial) > 5) {
      this.moveLeft('drag')
    } else {
      this.carousel.style.left = this.converPerPercentage(this.posInitial) + "%";
    }
  }


  public moveRight(action = null) {
    // console.log('click')
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

  dragLeave = (e) => {
    if (!this.censor) {
      // this.carousel.style.left = (this.posInitial) + "px";
      this.carousel.style.left = this.converPerPercentage(this.posInitial) + "%";
    }
    this.dragging = false
    this.startInterval()
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

  sliderSelected() {

    this.quadrate.forEach((item, index) => {
      this.renderer.listen(item.nativeElement, 'click', (e) => {
        this.operacion = (index + 1) * 100

        this.carousel.style.left = -this.operacion + "%";
        this.index = index
        this.censor = true;
        this.quadrate.forEach((item, index) => {
          this.renderer.removeClass(item.nativeElement, 'active')
        })

        this.renderer.addClass(item.nativeElement, 'active')

      })
    })
  }

  touchMovePerPercetage(touchMove: number) {
    return (touchMove / this.slideSize) * 100
  }


  startInterval = () => {
    this.interval = setInterval(() => { this.moveRight() }, 5000)
  }

  deleteInterval = () => {
    console.log('enter');

    if (this.interval) {
      clearInterval(this.interval)
    }
  }
}

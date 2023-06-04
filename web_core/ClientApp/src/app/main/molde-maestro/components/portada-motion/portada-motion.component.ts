import { AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Collection } from 'typescript';

@Component({
  selector: 'app-portada-motion',
  templateUrl: './portada-motion.component.html',
  styleUrls: ['./portada-motion.component.css']
})
export class PortadaMotionComponent implements OnInit, AfterViewInit {







  @ViewChild('portada') portada: ElementRef


  @ViewChild('carousel') carousel: ElementRef
  @ViewChildren('sliderSection') sliderSection: QueryList<ElementRef>
  @ViewChildren('quadrate') quadrate: QueryList<ElementRef>
  @ViewChildren('moveDirection') moveDirection: QueryList<ElementRef>
  @ViewChild('containerCarousel') wrapper: ElementRef


  operacion = 0
  withImg: number
  carruselMove: HTMLElement
  moveCarousel: HTMLElement
  withSlider: HTMLElement
  i = 0
  imagenes = [
    'assets/imagesMain/portada/oficina1.jpg',
    'assets/imagesMain/portada/oficina2.jpg',
    'assets/imagesMain/portada/oficina3.jpg',
    'assets/imagesMain/portada/oficina4.jpg',
    'assets/imagesMain/portada/programa8.jpg',
  ]

  interval;


  private unListenerMouseDown: () => void;
  private unListenerMouseMove: () => void;
  private unListenerMouseUp: () => void;

  constructor(private renderer: Renderer2) { }
  ngAfterViewInit(): void {


    this.withSlider = this.sliderSection.first.nativeElement;
    this.carruselMove = this.carousel.nativeElement
    this.withImg = 100 / this.sliderSection.length



    const widthPerSlider: HTMLElement = this.sliderSection.first.nativeElement
    const sliderPerView = Math.round(this.carruselMove.offsetWidth / widthPerSlider.offsetWidth)

    // const carouselChildrens = [this.carruselMove.children]
    // carouselChildrens.slice(-sliderPerView).forEach((slider:any) => {

    this.carruselMove.insertAdjacentHTML('afterbegin', this.carruselMove.children[this.sliderSection.length - 1].outerHTML)
    // })
    this.carruselMove.insertAdjacentHTML('beforeend', this.carruselMove.children[1].outerHTML)

    // this.sliderSection.forEach(x => {
    //   console.log(x.nativeElement);

    // })
    // this.sliderSelected()
    this.sliderMarked()
    let isDragging = false, startX, startScrollLeft;

    this.moveCarousel = this.carousel.nativeElement

    this.unListenerMouseDown = this.renderer.listen(this.moveCarousel, 'mousedown', (e: MouseEvent) => {
      isDragging = true
      this.moveCarousel.classList.add('dragging')
      startX = e.pageX
      startScrollLeft = this.moveCarousel.scrollLeft

      this.unListenerMouseMove = this.renderer.listen(this.moveCarousel, 'mousemove', (e: MouseEvent) => {

        if (!isDragging) return;
        this.moveCarousel.scrollLeft = startScrollLeft - (e.pageX - startX)
        const numTouch = Math.round(this.moveCarousel.scrollLeft / widthPerSlider.offsetWidth) -1
        this.focusQuadrate(numTouch)

        this.unListenerMouseUp = this.renderer.listen(document, 'mouseup', (e: MouseEvent) => {
          isDragging = false
          this.moveCarousel.classList.remove('dragging')
        })

      })

    })



    this.renderer.listen(this.moveCarousel, 'scroll', (e => {

      if (this.moveCarousel.scrollLeft == 0) {
        console.log('scroll');

        this.renderer.addClass(this.moveCarousel, "no-transition")
        this.moveCarousel.scrollLeft = this.moveCarousel.scrollWidth - (2 * this.moveCarousel.offsetWidth)

        this.renderer.removeClass(this.moveCarousel, "no-transition")
      }

      else if (Math.ceil(this.moveCarousel.scrollLeft) === this.moveCarousel.scrollWidth - this.moveCarousel.offsetWidth) {
        this.moveCarousel.classList.add("no-transition");
        this.moveCarousel.scrollLeft = this.moveCarousel.offsetWidth;
        this.moveCarousel.classList.remove("no-transition");
      }
      clearTimeout(this.interval);
      if (!this.moveCarousel.matches(":hover")) this.autoPlay();
    }
    )
    )



    this.renderer.listen(this.moveCarousel, 'mouseleave', (e) => {
      this.autoPlay()

    })

    this.autoPlay()

    this.renderer.listen(this.moveCarousel, 'mouseenter', (e) => {
      clearTimeout(this.interval)

    })
  }

  ngOnInit(): void {
    this.startInterval()

    // console.log('torta', this.imagenes);
    // console.log('rebanada', this.imagenes.slice(-3).reverse());

  }


  startInterval() {
    // this.interval = setInterval(() => { this.moveToRight() }, 5000)
  }


  onMouseEnterCarousel(hoverName: HTMLElement) {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }


  onMouseLeaveCarousel(hoverName: HTMLElement) {
    this.startInterval()
  }

  slideShow = () => {


    this.portada.nativeElement.src = this.imagenes[this.i]
    this.i = (this.i < this.imagenes.length - 1) ? this.i + 1 : 0
  }



  ngOnDestroy() {
    console.log('destroy');

    if (this.interval) {
      clearInterval(this.interval)
    }


    this.unListenerMouseDown()
  }




  counter = 0
  moveToRight() {

    if (this.counter >= this.sliderSection.length - 1) {
      this.operacion = 0
      this.counter = 0
      this.renderer.setStyle(this.carruselMove,
        'transform', `translate(-${this.operacion}%)`)
      this.focusQuadrate(this.counter)

      return null
    }
    this.counter++

    this.operacion = this.operacion + this.withImg
    this.renderer.setStyle(this.carruselMove,
      'transform', `translate(-${this.operacion}%)`)
    this.renderer.setStyle(this.carruselMove,
      'transition', `all ease .6s`)

    this.focusQuadrate(this.counter)


  }

  moveToLeft() {
    --this.counter
    if (this.counter < 0) {
      this.counter = this.sliderSection.length - 1
      this.operacion = (this.sliderSection.length - 1) * this.withImg
      // carruselMove.style.transform=`translate(-${this.operacion}%)`
      this.renderer.setStyle(this.carruselMove, 'transform', `translate(-${this.operacion}%)`)
      this.focusQuadrate(this.counter)
      return null
    }
    this.operacion = this.operacion - this.withImg
    this.renderer.setStyle(this.carruselMove, 'transform', `translate(-${this.operacion}%)`)
    this.renderer.setStyle(this.carruselMove, 'transition', `all ease .6s`)
    this.focusQuadrate(this.counter)
  }





  sliderSelected() {

    this.quadrate.forEach((item, index) => {

      this.renderer.listen(item.nativeElement, 'click', () => {
        this.operacion = index * this.withImg
        this.renderer.setStyle(this.carruselMove, 'transform', `translate(-${this.operacion}%)`)
        this.counter = index

        this.quadrate.forEach((item, index) => {
          this.renderer.removeClass(item.nativeElement, 'active')
        })

        this.renderer.addClass(item.nativeElement, 'active')

      })
    })
  }


  focusQuadrate(counter: number) {
    this.quadrate.forEach((item, index) => {
      this.renderer.removeClass(item.nativeElement, 'active')
    })
    this.renderer.addClass(this.quadrate.get(counter).nativeElement, 'active')
  }



  positionCarousel(e: HTMLElement) {
    this.moveCarousel.scrollLeft += e.className == "btn-left" ?
      this.previous() : this.next()
  }

  next() {
    this.counter = (this.counter >= this.sliderSection.length - 1) ?
      0 : this.counter + 1
    this.focusQuadrate(this.counter)
    return this.withSlider.offsetWidth
  }

  previous() {
    --this.counter
    this.counter = (this.counter < 0) ? this.sliderSection.length - 1 : this.counter
    this.focusQuadrate(this.counter)
    return - this.withSlider.offsetWidth
  }


  autoPlay() {
    this.interval = setTimeout(() => {
      this.moveCarousel.classList.remove('dragging')
      this.carruselMove.scrollLeft += this.next()
    }, 2500);
  }

  sliderMarked() {

    this.quadrate.forEach((item, index) => {

      this.renderer.listen(item.nativeElement, 'click', () => {
        this.moveCarousel.scrollLeft = index * this.withSlider.offsetWidth + this.withSlider.offsetWidth
        // this.renderer.setStyle(this.carruselMove, 'transform', `translate(-${this.operacion}%)`)
        // this.counter = index

        this.quadrate.forEach((item, index) => {
          this.renderer.removeClass(item.nativeElement, 'active')
        })

        this.renderer.addClass(item.nativeElement, 'active')

      })
    })
  }

}

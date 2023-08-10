import {
  AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild,
  ViewChildren
} from '@angular/core';

@Component({
  selector: 'app-acordion-motion',
  templateUrl: './acordion-motion.component.html',
  styleUrls: ['./acordion-motion.component.css']
})
export class AcordionMotionComponent implements OnInit, AfterViewInit {
  @ViewChild('carousel') carousel: ElementRef
  ngAfterViewInit(): void {

    this.carousel.nativeElement.addEventListener('mousemove', (e: MouseEvent) => {
      console.log(e.pageX);

      this.carousel.nativeElement.scrollLeft = e.pageX
    })

  }
  ngOnInit(): void {

  }

  // @ViewChild('portada') portada: ElementRef



  // @ViewChildren('sliderSection') sliderSection: QueryList<ElementRef>
  // @ViewChildren('quadrate') quadrate: QueryList<ElementRef>

  // operacion = 0
  // withImg: number
  // carruselMove: HTMLElement

  // i = 0
  imagenes = [
    'assets/imagesMain/portada/oficina1.jpg',
    'assets/imagesMain/portada/oficina2.jpg',
    'assets/imagesMain/portada/oficina3.jpg',
    'assets/imagesMain/portada/oficina4.jpg',
    'assets/imagesMain/portada/programa8.jpg',
  ]

  // interval;

  // constructor(private renderer: Renderer2) { }


  // ngAfterViewInit(): void {
  //   this.carruselMove = this.carousel.nativeElement

  //   this.withImg = 100 / this.sliderSection.length

  //   this.sliderSelected()

  //   // this.renderer.listen(this.carruselMove, 'mousemove', (e: MouseEvent) => {
  //   //   this.carruselMove.scrollLeft += this.withImg
  //   // })

  //   this.carruselMove.addEventListener('mousemove', (e: MouseEvent) => {
  //     this.carruselMove.scrollLeft  = e.pageX
  //   })

  // }

  // ngOnInit(): void {
  //   this.startInterval()
  // }


  // startInterval() {
  //   // this.interval = setInterval(() => { this.moveToRight() }, 5000)
  // }


  // onMouseEnterCarousel(hoverName: HTMLElement) {
  //   if (this.interval) {
  //     clearInterval(this.interval)
  //   }
  // }


  // onMouseLeaveCarousel(hoverName: HTMLElement) {
  //   this.startInterval()
  // }

  // slideShow = () => {


  //   this.portada.nativeElement.src = this.imagenes[this.i]
  //   this.i = (this.i < this.imagenes.length - 1) ? this.i + 1 : 0
  // }



  // ngOnDestroy() {
  //   console.log('destroy');

  //   if (this.interval) {
  //     clearInterval(this.interval)
  //   }
  // }




  // counter = 0
  // moveToRight() {

  //   if (this.counter >= this.sliderSection.length - 1) {
  //     this.operacion = 0
  //     this.counter = 0
  //     this.renderer.setStyle(this.carruselMove,
  //       'transform', `translate(-${this.operacion}%)`)
  //     this.focusQuadrate(this.counter)

  //     return null
  //   }
  //   this.counter++

  //   this.operacion = this.operacion + this.withImg
  //   // console.log('moveToRight', this.operacion);
  //   // carruselMove.style.transform=`translate(-${this.operacion}%)`
  //   this.renderer.setStyle(this.carruselMove,
  //     'transform', `translate(-${this.operacion}%)`)
  //   this.renderer.setStyle(this.carruselMove,
  //     'transition', `all ease .6s`)

  //   this.focusQuadrate(this.counter)


  // }

  // moveToLeft() {
  //   --this.counter
  //   if (this.counter < 0) {
  //     this.counter = this.sliderSection.length - 1
  //     this.operacion = (this.sliderSection.length - 1) * this.withImg
  //     // carruselMove.style.transform=`translate(-${this.operacion}%)`
  //     this.renderer.setStyle(this.carruselMove, 'transform', `translate(-${this.operacion}%)`)
  //     this.focusQuadrate(this.counter)
  //     return null
  //   }
  //   this.operacion = this.operacion - this.withImg
  //   this.renderer.setStyle(this.carruselMove, 'transform', `translate(-${this.operacion}%)`)
  //   this.renderer.setStyle(this.carruselMove, 'transition', `all ease .6s`)
  //   this.focusQuadrate(this.counter)
  // }


  // sliderSelected() {

  //   this.quadrate.forEach((item, index) => {

  //     this.renderer.listen(item.nativeElement, 'click', () => {
  //       this.operacion = index * this.withImg
  //       this.renderer.setStyle(this.carruselMove, 'transform', `translate(-${this.operacion}%)`)
  //       this.counter = index

  //       this.quadrate.forEach((item, index) => {
  //         this.renderer.removeClass(item.nativeElement, 'active')
  //       })

  //       this.renderer.addClass(item.nativeElement, 'active')

  //     })
  //   })
  // }

  // focusQuadrate(counter: number) {
  //   this.quadrate.forEach((item, index) => {
  //     this.renderer.removeClass(item.nativeElement, 'active')
  //   })
  //   this.renderer.addClass(this.quadrate.get(counter).nativeElement, 'active')

  // }
}

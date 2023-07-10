import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Event } from '@angular/router';

@Component({
  selector: 'app-portada-beta-motion',
  templateUrl: './portada-beta-motion.component.html',
  styleUrls: ['./portada-beta-motion.component.css']
})
export class PortadaBetaMotionComponent implements OnInit, AfterViewInit {

  @ViewChild('sliderContainer') sliderContainer: ElementRef
  @ViewChildren('slide') slides: QueryList<ElementRef>
  dragging: boolean = false
  currentIndex: number = 0
  startPos: number = 0
  animationId
  currentTranslate: number = 0
  slider: HTMLElement
  imagenes = [
    'assets/imagesMain/portada/oficina1.jpg',
    'assets/imagesMain/portada/oficina2.jpg',
    'assets/imagesMain/portada/oficina3.jpg',
    'assets/imagesMain/portada/oficina4.jpg',
    'assets/imagesMain/portada/programa8.jpg',
  ]
  prevTranslate: number = 0;

  widthSlide: HTMLElement
  constructor(private render: Renderer2) { }

  ngAfterViewInit(): void {


    this.slider = this.sliderContainer.nativeElement;

    console.log('initial slider ', this.slider);


    // window.oncontextmenu = function (event) {
    //   event.preventDefault()
    //   event.stopPropagation()
    //   return false
    // }

    this.widthSlide = this.slides.first.nativeElement;


    this.slides.forEach((slide, index) => {

      const slideIn: HTMLElement = slide.nativeElement
      const slideImage = slideIn.querySelector('img')
      slideImage.addEventListener('dragstart', (e: DragEvent) =>
        e.preventDefault()
      )


      this.render.listen(slideIn, 'touchstart', this.touchstart(index))
      this.render.listen(slideIn, 'touchend', this.touchEnd)
      this.render.listen(slideIn, 'touchmove', this.touchMove)



      this.render.listen(slideIn, 'mousedown', this.touchstart(index))
      this.render.listen(slideIn, 'mouseup', this.touchEnd)
      this.render.listen(slideIn, 'mouseleave', this.touchEnd2)
      this.render.listen(slideIn, 'mousemove', this.touchMove)

      window.addEventListener('resize', this.setPositionByIndex)
    })



  }

  ngOnInit(): void {

  }



  touchstart = (index: number) => {
    return (e: any) => {
      this.currentIndex = index
      this.dragging = true
      this.startPos = this.getPosicionX(e)
      this.animationId = requestAnimationFrame(this.animation)
      this.render.addClass(this.sliderContainer.nativeElement, 'grabbing')
      console.log('%ctouchstart this.startPos','color:green', this.startPos );

    }

  }

  touchMove = (e: any) => {

    if (this.dragging) {
      const currentPosition = this.getPosicionX(e)

      console.log('%ctouchMove this.startPos','color:red', currentPosition );

      this.currentTranslate = this.prevTranslate + currentPosition - this.startPos
     console.log('move currentPosition ' , currentPosition);
     console.log('move this.startPos ' , this.startPos);

    }

  }

  touchEnd = () => {
    this.dragging = false
    cancelAnimationFrame(this.animationId)

    const moveBy = this.currentTranslate - this.prevTranslate

    if (moveBy < -100 && this.currentIndex < this.slides.length - 1) {
      this.currentIndex += 1

    }

    if (moveBy > 100 && this.currentIndex > 0) {
      this.currentIndex -= 1

    }
    this.setPositionByIndex()
    this.render.removeClass(this.sliderContainer.nativeElement, 'grabbing')
  }

  touchEnd2 = () => {
    console.log('entro leave');

    this.touchEnd()
  }

  getPosicionX = (e: any) => {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].pageX

  }


  animation = () => {
    this.setSliderPosicion()
    if (this.dragging) requestAnimationFrame(this.animation)

  }

  setPositionByIndex = () => {

    //  this.currentTranslate = this.currentIndex * -window.innerWidth

    this.currentTranslate = this.currentIndex * -     this.widthSlide.offsetWidth
    // this.currentTranslate = this.currentIndex * -  this.widthSlide.offsetWidth

    // console.log('window.innerWidth', window.innerWidth);


    //aqui se guarda el prevTranslate
    this.prevTranslate = this.currentTranslate
    this.setSliderPosicion()

  }

  setSliderPosicion() {
    this.slider.style.transform = `translateX(${this.currentTranslate}px)`
  }


}

import { AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-portada-alfa',
  templateUrl: './portada-alfa.component.html',
  styleUrls: ['./portada-alfa.component.scss']
})
export class PortadaAlfaComponent implements OnInit, AfterViewInit {


  @ViewChild('slides') slides: ElementRef
  @ViewChildren('slide') slide: QueryList<ElementRef>
  @ViewChild('prev') prev: ElementRef
  @ViewChild('next') next: ElementRef



  posX1 = 0
  posX2 = 0
  posInitial
  posFinal
  threshold = 100

  slidesLenght: number
  slideSize: number


  index: number = 0
  allowShift: boolean = true;

  slidesItems: HTMLElement
  pointElement: any
  dragging: boolean = false
  censor: boolean = false

  imagenes = [
    'assets/imagesMain/portada/oficina1.jpg',
    'assets/imagesMain/portada/oficina2.jpg',
    'assets/imagesMain/portada/oficina3.jpg',
    'assets/imagesMain/portada/oficina4.jpg',
    'assets/imagesMain/portada/programa8.jpg',
  ]
  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }


  ngAfterViewInit(): void {
    this.slidesLenght = this.slide.length
    this.slideSize = (this.slide.first.nativeElement as HTMLElement).offsetWidth

    this.slidesItems = this.slides.nativeElement

    const firstSlide: HTMLElement = this.slide.first.nativeElement
    const lastSlide: HTMLElement = this.slide.last.nativeElement

    const cloneFirst = firstSlide.cloneNode(true)
    const clonelast = lastSlide.cloneNode(true)

    this.slidesItems.appendChild(cloneFirst)
    this.slidesItems.insertBefore(clonelast, firstSlide)

    // Mouse events
    // items.onmousedown = dragStart;
    // this.slidesItems.onmousedown = this.dragStart


    this.renderer.listen(this.slidesItems, 'mousedown', this.dragStart)
    this.renderer.listen(this.slidesItems, 'mousemove', this.dragAction)
    this.renderer.listen(this.slidesItems, 'mouseup', this.dragEnd)
    this.renderer.listen(this.slidesItems, 'mouseleave', this.dragLeave)

    // Touch events
    this.slidesItems.addEventListener('touchstart', this.dragStart);
    this.slidesItems.addEventListener('touchmove', this.dragAction);
    this.slidesItems.addEventListener('touchend', this.dragEnd);


    // this.slidesItems.addEventListener('transitionend', this.checkIndex);

    // Click events
    this.prev.nativeElement.addEventListener('click', () => { this.moveLeft() });
    this.next.nativeElement.addEventListener('click', () => { this.moveRight() });
  }


  dragLeave = () => {

    if (!this.censor) {
      this.slidesItems.style.left = (this.posInitial) + "px";
    }
    this.dragging = false
  }


  dragStart = (e) => {
    //navegador compatibiliad
    // e = e || window.event;
    e.preventDefault();
    this.posInitial = this.slidesItems.offsetLeft;
    this.posX1 = this.getPosicionX(e)
    this.dragging = true
    this.pointElement = document.elementFromPoint(this.getPosicionX(e), this.getPosicionY(e));
  }
  dragAction = (e) => {
    if (this.dragging) {
      this.censor = false
      // e = e || window.event;
      this.posX2 = this.posX1 - this.getPosicionX(e)
      this.posX1 = this.getPosicionX(e)
      this.slidesItems.style.left =
        (this.slidesItems.offsetLeft - this.posX2) + "px";
    }

    if (this.pointElement !== document.elementFromPoint(this.getPosicionX(e), this.getPosicionY(e))) {
      console.log('salio del bloque');
      if (e.type.includes('touch')) {
        this.slidesItems.style.left = (this.posInitial) + "px";
      }
    }
  }
  dragEnd = (e) => {
    // e = e || window.event;
    this.dragging = false
    this.posFinal = this.slidesItems.offsetLeft;
    if (this.posFinal - this.posInitial < -100) {
      this.moveRight('drag')
    } else if (this.posFinal - this.posInitial > 100) {
      this.moveLeft('drag')
    } else {
      this.slidesItems.style.left = (this.posInitial) + "px";
    }
  }




  moveRight(action = null) {
    this.slidesItems.classList.add('shifting');
    //condicion para click
    if (!action) {
      'entro al alfa'
      this.posInitial = this.slidesItems.offsetLeft;
    }

    this.index++;
    if (this.index == this.slidesLenght) {
      this.slidesItems.style.left = -(1 * this.slideSize) + "px";
      this.index = 0;
    }
    else {
      this.slidesItems.style.left = (this.posInitial - this.slideSize) + "px";
    }
    this.slidesItems.classList.remove('shifting');
    this.censor = true;
  }



  moveLeft(action = null) {
    if (!action) {
      this.posInitial = this.slidesItems.offsetLeft;
    }
    this.index--;
    if (this.index == -1) {
      this.slidesItems.style.left = -(this.slidesLenght * this.slideSize) + "px";
      this.index = this.slidesLenght - 1;
    }
    else {
      this.slidesItems.style.left = (this.posInitial + this.slideSize) + "px";
    }
    this.slidesItems.classList.remove('shifting');
    this.censor = true;
  }


  getPosicionY = (e: any) => {
    return e.type.includes('mouse') ? e.clientY : e.touches[0].clientY
  }

  getPosicionX = (e: any) => {
    return e.type.includes('mouse') ? e.clientX : e.touches[0].clientX
  }

  checkIndex = () => {
    // this.slidesItems.classList.remove('shifting');

    // if (this.index == -1) {
    //   console.log('this.slidesLenght', this.slidesLenght);

    //   this.slidesItems.style.left = -(this.slidesLenght * this.slideSize) + "px";
    //   this.index = this.slidesLenght - 1;
    // }

    // if (this.index == this.slidesLenght) {

    //   this.slidesItems.style.left = -(1 * this.slideSize) + "px";
    //   this.index = 0;
    // }

    // this.allowShift = true;
  }

  // shiftSlide(dir, action = null) {
  //   this.slidesItems.classList.add('shifting');

  //   // if (this.allowShift) {
  //   if (!action) {
  //     this.posInitial = this.slidesItems.offsetLeft;
  //   }

  //   if (dir == 1) {
  //     this.index++;
  //     if (this.index == this.slidesLenght) {
  //       this.slidesItems.style.left = -(1 * this.slideSize) + "px";
  //       this.index = 0;
  //       this.slidesItems.classList.remove('shifting');
  //       return
  //     }
  //     this.slidesItems.style.left = (this.posInitial - this.slideSize) + "px";


  //   } else if (dir == -1) {
  //     this.index--;
  //     if (this.index == -1) {
  //       this.slidesItems.style.left = -(this.slidesLenght * this.slideSize) + "px";
  //       this.index = this.slidesLenght - 1;
  //       this.slidesItems.classList.remove('shifting');
  //       return;
  //     }

  //     this.slidesItems.style.left = (this.posInitial + this.slideSize) + "px";


  //   }
  //   // };

  //   // this.allowShift = false;
  //   this.slidesItems.classList.remove('shifting');
  // }

}



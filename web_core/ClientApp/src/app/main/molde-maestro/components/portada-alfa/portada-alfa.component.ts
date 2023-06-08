import { AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-portada-alfa',
  templateUrl: './portada-alfa.component.html',
  styleUrls: ['./portada-alfa.component.scss']
})
export class PortadaAlfaComponent implements OnInit, AfterViewInit {

  @ViewChild('slider') slider: ElementRef
  @ViewChild('slides') slides: ElementRef
  @ViewChild('prev') prev: ElementRef
  @ViewChild('next') next: ElementRef

  @ViewChildren('slide') slide: QueryList<ElementRef>

  public posX1 = 0
  posX2 = 0
  posInitial
  posFinal
  threshold = 100

  slidesLenght: number
  slideSize: number


  index: number = 0
  allowShift: boolean = true;

  slidesItems: HTMLElement

  dragging: boolean = false
  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }


  ngAfterViewInit(): void {
    this.slidesLenght = this.slide.length
    this.slideSize = (<HTMLElement>this.slide.first.nativeElement).offsetWidth

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
    this.renderer.listen(this.slidesItems, 'mouseleave', this.dragEnd)

    // Touch events
    this.slidesItems.addEventListener('touchstart', this.dragStart);
    this.slidesItems.addEventListener('touchmove', this.dragAction);
    this.slidesItems.addEventListener('touchend', this.dragEnd);


    this.slidesItems.addEventListener('transitionend', this.checkIndex);

    // Click events
    this.prev.nativeElement.addEventListener('click', () => { this.shiftSlide(-1) });
    this.next.nativeElement.addEventListener('click', () => { this.shiftSlide(1) });
  }


  dragStart = (e) => {
    e = e || window.event;
    e.preventDefault();
    this.posInitial = this.slidesItems.offsetLeft;
    this.posX1 = this.getPosicionX(e)
    this.dragging = true
  }


  dragAction = (e) => {
    if (this.dragging) {
      e = e || window.event;
      this.posX2 = this.posX1 - this.getPosicionX(e)
      this.posX1 = this.getPosicionX(e)
      this.slidesItems.style.left =
        (this.slidesItems.offsetLeft - this.posX2) + "px";
    }

  }

  getPosicionX = (e: any) => {
    return e.type.includes('mouse') ? e.clientX : e.touches[0].clientX
  }

  dragEnd = (e) => {
    this.posFinal = this.slidesItems.offsetLeft;

    if (this.posFinal - this.posInitial < -this.threshold) {
      this.shiftSlide(1, 'drag');
    } else if (this.posFinal - this.posInitial > this.threshold) {
      this.shiftSlide(-1, 'drag');
    } else {
      this.slidesItems.style.left = (this.posInitial) + "px";
    }

    // document.onmouseup = null;
    // document.onmousemove = null;

    this.dragging=false
  }

  shiftSlide(dir, action = null) {
    this.slidesItems.classList.add('shifting');

    if (this.allowShift) {
      if (!action) { this.posInitial = this.slidesItems.offsetLeft; }

      if (dir == 1) {
        this.slidesItems.style.left = (this.posInitial - this.slideSize) + "px";
        this.index++;
      } else if (dir == -1) {
        this.slidesItems.style.left = (this.posInitial + this.slideSize) + "px";
        this.index--;
      }
    };

    this.allowShift = false;
  }

  checkIndex = () => {
    this.slidesItems.classList.remove('shifting');

    if (this.index == -1) {
      console.log('this.slidesLenght', this.slidesLenght);

      this.slidesItems.style.left = -(this.slidesLenght * this.slideSize) + "px";
      this.index = this.slidesLenght - 1;
    }

    if (this.index == this.slidesLenght) {

      this.slidesItems.style.left = -(1 * this.slideSize) + "px";
      this.index = 0;
    }

    this.allowShift = true;
  }

}

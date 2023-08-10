import {
  Component, ElementRef, HostListener, OnDestroy, OnInit,
  QueryList, Renderer2, ViewChild, ViewChildren
} from '@angular/core';

@Component({
  selector: 'app-menu-side',
  templateUrl: './menu-side.component.html',
  styleUrls: ['./menu-side.component.css']
})
export class MenuSideComponent implements OnInit, OnDestroy {

  @ViewChild('nav') nav: ElementRef;
  @ViewChildren('active') active: QueryList<ElementRef>



  constructor(private renderer: Renderer2) { }


  ngOnInit(): void {

  }


  ngAfterViewInit() {
  }


  openSideBar() {
    const nav: HTMLElement = this.nav.nativeElement
    //  nav2.classList.toggle('visible');
    this.renderer.addClass(nav, 'visible')

  }

  cerrarSideBar() {
    this.renderer.removeClass(this.nav.nativeElement, 'visible')
  }

  @HostListener('document:click', ['$event.target'])
  handleClick($event: HTMLElement): void {
    if ($event.id != 'toogle' && $event.id != "navMain"
      && $event.id != 'ulMain'
    ) {
      this.cerrarSideBar()
    }
  }

  ngOnDestroy(): void {

    // console.log('destroy');

    // document.getElementsByClassName('logo')[0].removeEventListener('click', this.print)
  }

}

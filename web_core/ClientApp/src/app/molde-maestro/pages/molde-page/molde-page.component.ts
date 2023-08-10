import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-molde-page',
  templateUrl: './molde-page.component.html',
  styleUrls: ['./molde-page.component.css']
})
export class MoldePageComponent implements OnInit {

  constructor(private router: Router, private activateReoute : ActivatedRoute ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe((x) => {

        // console.log(x)
        // console.log(this.activateReoute.children)

        // const root = this.router.routerState.snapshot.root;
        // console.log(root)
        // let parentUrl: string[]
        // const routeUrl = parentUrl.concat(root.url.map(url => url.path));
        // console.log(routeUrl)
      });

  }

  ngOnInit(): void {
  }


  // private createBreadcrumbs(route: ActivatedRoute, url: string = '#', breadcrumbs: MenuItem[] = []): MenuItem[] {
  //   const children: ActivatedRoute[] = route.children;

  //   if (children.length === 0) {
  //     return breadcrumbs;
  //   }

  //   for (const child of children) {
  //     const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
  //     if (routeURL !== '') {
  //       url += `/${routeURL}`;
  //     }

  //     const label = child.snapshot.data[ 'breadcrumb'];
  //     if (!isNullOrUndefined(label)) {
  //       breadcrumbs.push({label, url});
  //     }

  //     return this.createBreadcrumbs(child, url, breadcrumbs);
  //   }
  // }

}


export interface MenuItem {
  label?: string;
  url?: string;
}

/**
 * List breadcrum
 */
export type IBreadcrums = Array<MenuItem>;

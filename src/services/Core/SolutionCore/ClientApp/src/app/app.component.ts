import { Component } from '@angular/core';
import { SPINNER } from 'ngx-ui-loader';
import { SystemStyleSheet } from './modules/enum/system-style-sheet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';

  public SystemStyleSheet = SystemStyleSheet;
  public SPINNER = SPINNER;
}

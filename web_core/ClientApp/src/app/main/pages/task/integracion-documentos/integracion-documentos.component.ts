import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-integracion-documentos',
  templateUrl: './integracion-documentos.component.html',
  styleUrls: ['./integracion-documentos.component.css']
})
export class IntegracionDocumentosComponent implements OnInit {
  selected = 'option2';
  constructor() { }

  ngOnInit(): void {
  }

}

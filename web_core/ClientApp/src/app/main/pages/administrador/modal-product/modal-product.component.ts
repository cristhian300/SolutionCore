import { stringify } from '@angular/compiler/src/util';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, AbstractControlDirective, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddProductRequest, EditProductRequest, ListProductEntity } from 'src/app/main/providers/services/Product/product.interface';
import { ProductService } from 'src/app/main/providers/services/Product/product.service';


@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.css']
})
export class ModalProductComponent implements OnInit {
  @ViewChild("foto") foto: ElementRef;
  @ViewChild("image") image: ElementRef;
  @ViewChild("imgProduct") imgProduct: ElementRef;
  @ViewChild("nameFile", { static: true }) nameFileLoad: ElementRef;


  formParent: FormGroup;
  title: string;
  messageError: string = 'existe un error'
  currentControl: AbstractControlDirective | AbstractControl;
  isSummit: boolean = false
  constructor(private formbuilder: FormBuilder,
    private productService: ProductService,
    private modalProduct: MatDialogRef<ModalProductComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: ListProductEntity

  ) {

  }

  ngOnInit() {
    this.CreateForm()
    this.loadForm()
  }


  loadForm() {
    if (this.data) {
      this.title = "Editar Productos"
      this.formParent.get('name').setValue(this.data.name)
      this.formParent.get('precio').setValue(this.data.price);
      this.formParent.get('detalle').setValue(this.data.description);
      this.imagen = this.data.pathUrlImage;
    }
    else {
      this.title = "Registrar Productos"
    }
  }


  fileName: any = '';

  CreateForm() {

    this.formParent = this.formbuilder.group({
      name: ["",
        [Validators.required, Validators.minLength(0), Validators.maxLength(10),
        Validators.pattern(`^[a-zA-Z'ñÑáéíóúÁÉÍÓÚ][a-zA-Z 'ñÑáéíóúÁÉÍÓÚ]*$`),]
      ],
      precio: ["", [Validators.required, Validators.min(0), Validators.max(100)]],
      detalle: ["", [Validators.required]],
      imageLoad: ["", [Validators.required]]
    })

  }

  validationErrores(nameControl: string): boolean {


    this.currentControl = this.formParent.get(nameControl)

    return (this.currentControl.errors
      &&
      (
        this.currentControl.touched
        ||
        this.currentControl.dirty
      )
    )

      || (this.isSummit && this.currentControl.invalid)


  }


  listOfErrors(nameControl: string): Array<string> {
    let errors: Array<string> = [];
    const control = this.formParent.get(nameControl).errors
    if (control) {
      errors = Object.keys(control).map(
        (typeError) =>
          this.getMessage(typeError, control[typeError])
      )
    }
    return errors;
  }

  protected getMessage(type: string, params: any): string {

    return this.errorMessages[type](params);
  }

  readonly errorMessages = {
    required: () => 'Este campo es obligatorio',
    requiredFn: () => 'Este campo es obligatorio',
    invalidNumber: () => 'Solo se admiten números',
    invalidDecimal: () => 'Solo se admiten números decimales con coma (,)',
    invalidEmail: () => 'El correo electrónico es incorrecto',
    isValid: () => 'El formato no es valido',
    isEmailValid: () => 'Este correo no es valido',
    email: () => 'El formato del correo no es valido',
    messageEvent: () => 'Este correo ya existe en el sistema',
    emailExistSystem: () => 'Este correo ya existe en el sistema',
    invalidCalendarValidRange: () => 'Seleccione un rango de fecha',
    invalidRut: () => 'El RUT ingresado no es valido',
    minlength: (params) => `EL número mínimo de caracteres es ${params.requiredLength}`,
    maxlength: (params) => `EL número máximo de caracteres es ${params.requiredLength}`,
    // custom: () => `${this.messageCustom}`,
    pattern: () => 'Solo se adminite alfanumerico',
  };



  fileData: File = null;
  imagen: string = ''

  CargaImagen(event) {

    if (event.target.files) {

      this.fileData = <File>event.target.files[0];


      // this.formParent.patchValue({
      //   imageLoad: this.fileData
      // })
      // this.formParent.get("imageLoad").updateValueAndValidity;

      var reader = new FileReader();
      reader.readAsDataURL(this.fileData);
      reader.onload = (event: any) => {
        this.imagen = reader.result as string;
        (this.nameFileLoad.nativeElement as HTMLElement).innerText = this.fileData.name
      }
      reader.readAsDataURL(this.fileData)
    }
  };


  CargarProduct() {
    this.isSummit = true
    if (this.formParent.valid) {
      if (!this.data) {
        this.insertar();
      } else {
        this.update();
      }
    }
  };

  insertar() {
    let request = new AddProductRequest()

    request.files = this.fileData;
    request.Name = this.formParent.get("name").value;
    request.Price = this.formParent.get("precio").value;
    request.Description = this.formParent.get("detalle").value;

    if (!request.files) {
      this.snackBar.open('No existe archivo cargado', 'close', { duration: 5000, panelClass: ['error-snackbar'] });
      return
    }

    this.productService.AddProduct(request).subscribe(
      response => {
        this.modalProduct.close()
      },
      error => { },
      () => { }

    );

  }


  update() {

    let request = new EditProductRequest()
    request.ProductId = this.data.productId;
    // request.files = this.fileData;
    request.files = this.formParent.get("imageLoad").value;
    request.Name = this.formParent.get("name").value;
    request.Price = this.formParent.get("precio").value;
    request.Description = this.formParent.get("detalle").value;

    this.productService.EditProduct(request).subscribe(
      response => {
        this.modalProduct.close()
      },
      error => { },
      () => { }

    );
  }


  closeModal() {
    this.modalProduct.close();
  }
}
